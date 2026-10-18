import { useQuery } from "@apollo/client/react"
import { View, FlatList, StyleSheet} from "react-native"
import { ME } from "../graphql/queries"
import ReviewItem from "./ReviewItem";
import Text from "./Text";


const styles = StyleSheet.create({
    separator: {
        height: 7,
    }
});

const MyReviews = () => {
    const {data, loading, error} = useQuery(ME, {
        variables: {includeReviews: true},
        fetchPolicy: 'cache-and-network',
    })

    if(loading || !data) return <Text>loading</Text>;
    if(error) return <Text color="error">{error.message}</Text>;

    const reviews = data.me.reviews.edges.map(e=>e.node);

    return <FlatList
        data={reviews}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({item})=><ReviewItem review={item}/>}
    />
}

export default MyReviews