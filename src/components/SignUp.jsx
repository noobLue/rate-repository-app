import { useMutation } from "@apollo/client/react";
import { Pressable, View, TextInput, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "../hooks/useSignIn";
import Text from "./Text";
import * as yup from 'yup';
import { useFormik } from "formik";
import theme from "../theme";


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
    username: '',
    password: '',
    password2: '',
}

const validationSchema = yup.object({
    username: yup.string().required('Username is required').min(5, "Minimum length is 5").max(30, "Maximum length is 30"),
    password: yup.string().required('Password is required').min(5, "Minimum length is 5").max(50, "Maximum length is 50"),
    password2: yup.string().required("Password confimation is required").oneOf([yup.ref('password')], 'Passwords must match'),
});

const SignUpForm = ({onSubmit}) => {
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const hasError = (name) => { return formik.touched[name] && formik.errors[name] };

    return (<View>
        <TextInput 
            testID="username" 
            style={[styles.input, hasError('username') && styles.errorInput]} 
            placeholder='Username' 
            value={formik.values.username} 
            onChangeText={formik.handleChange('username')} 
            onBlur={formik.handleBlur('username')}
        />
        {hasError('username') && <Text color ="error" style={styles.errorText}>{formik.errors.username}</Text>}
        
        <TextInput 
            testID="password" 
            style={[styles.input, hasError('password') && styles.errorInput]} 
            placeholder='Password' 
            value={formik.values.password} 
            onChangeText={formik.handleChange('password')} 
            onBlur={formik.handleBlur('password')}
            secureTextEntry
        />
        {hasError('password') && <Text color ="error" style={styles.errorText}>{formik.errors.password}</Text>}

        <TextInput 
            testID="password2" 
            style={[styles.input, hasError('password2') && styles.errorInput]} 
            placeholder='Password confirmation' 
            value={formik.values.password2} 
            onChangeText={formik.handleChange('password2')} 
            onBlur={formik.handleBlur('password2')}
            secureTextEntry
        />
        {hasError('password2') && <Text color ="error" style={styles.errorText}>{formik.errors.password2}</Text>}
        


        <Pressable testID="signupButton" style={styles.button} onPress={formik.handleSubmit}><Text color="white" fontWeight="bold">Sign up!</Text></Pressable>
    </View>);
}


const SignUp = () => {
    const [createUser] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async ({username, password}) => {
        try {
            await createUser({
                variables: {
                    user: { username, password },
                }
            });
            await signIn({username, password});
            navigate(`/`);
        } catch (error) {
            console.log(error);
        }
    };

    return <View>
        <SignUpForm onSubmit={onSubmit}></SignUpForm>
    </View>
}

export default SignUp;