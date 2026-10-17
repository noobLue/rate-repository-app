import { View, StyleSheet, Image } from "react-native";
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
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    description: {
        marginVertical: 5,
    }
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

const RepositoryItem = ({item}) => {
    return <View style={styles.container}>
        <RepositoryItemHeader item={item}/>

        <View style={styles.countsContainer}>
            <LabelCount label="Stars" count={item.stargazersCount}></LabelCount>
            <LabelCount label="Forks" count={item.forksCount}></LabelCount>
            <LabelCount label="Reviews" count={item.reviewCount}></LabelCount>
            <LabelCount label="Rating" count={item.ratingAverage}></LabelCount>
        </View>
    </View>
}

export default RepositoryItem