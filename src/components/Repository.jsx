import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import { View, FlatList, StyleSheet } from "react-native";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 14,
    },
});

const Separator = () => {
    return <View style={styles.separator} />;
}


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
        ItemSeparatorComponent={<Separator/>}
        ListHeaderComponent={()=><><RepositoryItem item={data.repository} showUrl={true}/><Separator/></>}
    />)
}

export default Repository;