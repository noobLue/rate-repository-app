import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";


const styles = StyleSheet.create({
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

const ReviewItem = ({review}) => {
    return (<View style={styles.container}>
        <View style={styles.review}>
            <Text fontWeight="bold" color="primary">{review.rating}</Text>
        </View>
        <View style={styles.textContainer}>
            {review.user && <Text fontWeight="bold">{ review.user.username }</Text> }
            {review.repository && <Text fontWeight="bold">{ review.repository.fullName }</Text> }
            <Text>{format(new Date(review.createdAt), 'dd MMM yyyy')}</Text>
            <Text>{review.text}</Text>
        </View>
    </View>);
};

export default ReviewItem;