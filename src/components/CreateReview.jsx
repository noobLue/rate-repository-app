import { useMutation } from '@apollo/client/react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import { useFormik } from 'formik';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    errorInput: {
        borderColor: theme.colors.error,
    },
    errorText: {
        marginLeft: 14,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.appBar,
        padding: 14,
        margin: 7,
        backgroundColor: theme.colors.white,
        fontFamily: theme.fonts.main,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        padding: 14,
        margin: 7,
        alignItems: 'center',
    },
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup.string().required('Repository owner name is required'),
    repositoryName: yup.string().required('Repository name is required'),
    rating: yup.number()
        .typeError('Rating must be a number')
        .required('Rating is required')
        .min(0, 'Minimum rating is 0')
        .max(100, 'Maximum rating is 100'),
    text: yup.string(),
});

const ReviewForm = ({onSubmit}) => {
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const hasError = (name) => {return formik.touched[name] && formik.errors[name]};

    return (<View>
        <TextInput 
            testID="ownerName" 
            style={[styles.input, hasError('ownerName') && styles.errorInput]} 
            placeholder='Repository owner name' 
            value={formik.values.ownerName} 
            onChangeText={formik.handleChange('ownerName')} 
            onBlur={formik.handleBlur('ownerName')}
        />
        {hasError('ownerName') && <Text color ="error" style={styles.errorText}>{formik.errors.ownerName}</Text>}
        
        <TextInput 
            testID="repositoryName" 
            style={[styles.input, hasError('repositoryName') && styles.errorInput]} 
            placeholder='Repository name' 
            value={formik.values.repositoryName} 
            onChangeText={formik.handleChange('repositoryName')} 
            onBlur={formik.handleBlur('repositoryName')}
        />
        {hasError('repositoryName') && <Text color ="error" style={styles.errorText}>{formik.errors.repositoryName}</Text>}
        

        <TextInput 
            testID="rating" 
            style={[styles.input, hasError('rating') && styles.errorInput]} 
            placeholder='Rating between 0 and 100' 
            value={formik.values.rating} 
            onChangeText={formik.handleChange('rating')} 
            onBlur={formik.handleBlur('rating')}
            keyboardType='numeric'
        />
        {hasError('rating') && <Text color ="error" style={styles.errorText}>{formik.errors.rating}</Text>}


        <TextInput 
            testID="text" 
            style={[styles.input, hasError('text') && styles.errorInput]} 
            placeholder='Description' 
            value={formik.values.text} 
            onChangeText={formik.handleChange('text')} 
            onBlur={formik.handleBlur('text')}
            multiline
        />
        {hasError('text') && <Text color ="error" style={styles.errorText}>{formik.errors.text}</Text>}

        <Pressable testID="reviewButton" style={styles.button} onPress={formik.handleSubmit}><Text color="white" fontWeight="bold">Create a review!</Text></Pressable>
    </View>);
}

const CreateReview = () => {
    const [createReview] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();

    const onSubmit = async ({ownerName, repositoryName, rating, text}) => {
        try {
            const {data} = await createReview({
                variables: {
                    review: { ownerName, repositoryName, rating: Number(rating), text },
                }
            });
            navigate(`/repository/${data.createReview.repositoryId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return <View>
        <ReviewForm onSubmit={onSubmit}></ReviewForm>
    </View>
};

export default CreateReview