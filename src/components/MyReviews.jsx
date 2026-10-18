import { useMutation, useQuery } from "@apollo/client/react"
import { View, FlatList, StyleSheet, Pressable, Alert} from "react-native"
import { ME } from "../graphql/queries"
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import theme from "../theme";
import { DELETE_REVIEW } from "../graphql/mutations";


const styles = StyleSheet.create({
    separator: {
        height: 7,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
    },  
    button: {
        flex: 1,
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        padding: 14,
        margin: 14,
    },
    buttonDelete: {
        backgroundColor: theme.colors.error,
    }
});


const ReviewButtons = ({deleteReview, gotoRepo}) => {
    return <View style={styles.container}>
        <Pressable style={styles.button} onPress={gotoRepo}><Text color="white" fontWeight="bold">View Repository</Text></Pressable>
        <Pressable style={[styles.button, styles.buttonDelete]} onPress={deleteReview}><Text color="white" fontWeight="bold">Delete review</Text></Pressable>
    </View>;
};

const MyReviews = () => {
    const navigate = useNavigate();
    const {data, loading, error, refetch} = useQuery(ME, {
        variables: {includeReviews: true},
        fetchPolicy: 'cache-and-network',
    })
    const [deleteReview] = useMutation(DELETE_REVIEW);

    if(loading && !data) return <Text>loading</Text>;
    if(error) return <Text color="error">{error.message}</Text>;


    const reviews = data?.me?.reviews?.edges.map(e=>e.node) ?? [];

    const tryDelete = async (id) => {
        try {
            await deleteReview({variables: {id}});
            refetch();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAlarm = (id) => {
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            { text: 'Delete', onPress: ()=>tryDelete(id)},
            { text: 'Cancel' },
        ]);
    };

    return <FlatList
        data={reviews}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({item})=><>
            <ReviewItem review={item}/>
            <ReviewButtons 
                gotoRepo={()=>{navigate(`/repository/${item.repositoryId}`)}} 
                deleteReview={()=>deleteAlarm(item.id)}
            />
        </>}
    />
}

export default MyReviews