import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";
import { View, FlatList, StyleSheet } from "react-native";
import { format } from "date-fns";

const styles = StyleSheet.create({
    separator: {
        height: 14,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
    },
    review: {
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        width: 56,
        height: 56,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignSelf: 'flex-start',
        margin: 14,
    },

    textContainer: {
        marginTop: 14,
        marginRight: 14,
        marginBottom: 14,
        flex: 1,
    }
});

const Separator = () => {
    return <View style={styles.separator} />;
}

const ReviewItem = ({review}) => {
    return (<View style={styles.container}>
        <View style={styles.review}>
            <Text fontWeight="bold" color="primary">{review.rating}</Text>
        </View>
        <View style={styles.textContainer}>
            <Text fontWeight="bold">{review.user.username}</Text>
            <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
            <Text>{review.text}</Text>
        </View>
    </View>);
};

const Repository = () => {
    const {id} = useParams();

    const {data, loading, error} = useQuery(GET_REPOSITORY, {
        variables: {repositoryId: id},
        fetchPolicy: 'cache-and-network',
    });

    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text color="error">{error.message}</Text>

    const reviews = data.repository.reviews.edges.map(e=>e.node);

    return (<FlatList 
        data={reviews} 
        renderItem={({item})=><ReviewItem review={item}/>}
        keyExtractor={({id})=>id}
        ItemSeparatorComponent={<Separator/>}
        ListHeaderComponent={()=><><RepositoryItem item={data.repository} showUrl={true}/><Separator/></>}
        />)
}

export default Repository;