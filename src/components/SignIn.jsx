import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, View, TextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.appBar,
        padding: 14,
        marginBottom: 14,
        backgroundColor: theme.colors.white,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        padding: 14,
        alignItems: 'center',
    },
});

const initialValues = {
    username: '',
    password: '',
};

const onSubmit = (values) => {
    console.log(values);
}

const SignIn = () => {
    const formik = useFormik({
        initialValues,
        onSubmit
    });

  return <View style={styles.container}>
    <TextInput style={styles.input} placeholder='username' value={formik.values.username} onChangeText={formik.handleChange('username')}/>
    <TextInput style={styles.input} placeholder='password' value={formik.values.password} onChangeText={formik.handleChange('password')} secureTextEntry/>
    <Pressable style={styles.button} onPress={formik.handleSubmit}><Text color="white" fontWeight="bold">Sign in!</Text></Pressable>
  </View>;
};

export default SignIn;