import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
    container: {
        marginLeft: 7,
        marginRight: 7,
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
    errorInput: {
        borderColor: theme.colors.error,
    },
    errorText: {
        margin: 7,
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
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});


const SignIn = () => {
    const [signIn] = useSignIn();

    const onSubmit = async ({username, password}) => {
        try {
            const { data } = await signIn({username, password});
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    const isUsernameError = formik.touched.username && formik.errors.username;
    const isPassowrdError = formik.touched.password && formik.errors.password;

    return <View style={styles.container}>
        <TextInput style={[styles.input, isUsernameError && styles.errorInput]} placeholder='username' value={formik.values.username} onChangeText={formik.handleChange('username')} onBlur={formik.handleBlur('username')}/>
        {isUsernameError && <Text color="error" style={styles.errorText}>{formik.errors.username}</Text>}
        
        <TextInput style={[styles.input, isPassowrdError && styles.errorInput]} placeholder='password' value={formik.values.password} onChangeText={formik.handleChange('password')} onBlur={formik.handleBlur('password')} secureTextEntry/>
        {isPassowrdError && <Text color="error" style={styles.errorText}>{formik.errors.password}</Text>}
        
        <Pressable style={styles.button} onPress={formik.handleSubmit}><Text color="white" fontWeight="bold">Sign in!</Text></Pressable>
    </View>;
};

export default SignIn;