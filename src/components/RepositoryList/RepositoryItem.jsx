import { View, StyleSheet, Image, Linking, Pressable } from "react-native";
import Text from '../Text';
import theme from "../../theme";

const styles = StyleSheet.create({
    labelCount: {
        alignItems: 'center',
    },
    countsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        backgroundColor: theme.colors.white,
    },
    container: {
        padding: 15,
        backgroundColor: theme.colors.repositoryItemBackground,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 4,
    },
    header: {
        flexDirection: 'row',
    },  
    headerTextContainer: {
        flex: 1,
        marginLeft: 15,
    },  
    languageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    description: {
        marginVertical: 5,
    },
    githubButton: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyItems: 'center',
        margin: 7,
        padding: 14,
        borderRadius: 4,
    },
});

const countAsString = (count) => {
    if(count < 1000) return `${count}`;

    return `${(count/1000).toFixed(1)}k`
}

const LabelCount = ({label, count}) => {
    return <View style={styles.labelCount}>
        <Text fontWeight="bold">{countAsString(count)}</Text>
        <Text color="textSecondary">{label}</Text>
    </View>;
}

const RepositoryItemHeader = ({item}) => {
    return <View style={styles.header}>
        <Image style={styles.avatar} source={{uri: item.ownerAvatarUrl}}></Image>
        <View style={styles.headerTextContainer}>
            <Text fontWeight="bold">{item.fullName}</Text>
            <Text color="textSecondary" style={styles.description}>{item.description}</Text>
            <View style={styles.languageContainer}><Text color="white">{item.language}</Text></View>
        </View>
    </View>
}

const GithubButton = ({url}) => {
    return (<Pressable style={styles.githubButton} onPress={()=>Linking.openURL(url)}><Text color="white" fontWeight="bold">Open in GitHub</Text></Pressable>);
}

const RepositoryItem = ({item, showUrl = false}) => {
    return <View testID="repositoryItem" style={styles.container}>
        <RepositoryItemHeader item={item}/>

        <View style={styles.countsContainer}>
            <LabelCount label="Stars" count={item.stargazersCount}></LabelCount>
            <LabelCount label="Forks" count={item.forksCount}></LabelCount>
            <LabelCount label="Reviews" count={item.reviewCount}></LabelCount>
            <LabelCount label="Rating" count={item.ratingAverage}></LabelCount>
        </View>

        {(item.url && showUrl) && (<GithubButton url={item.url}/>)}
    </View>
}

export default RepositoryItem