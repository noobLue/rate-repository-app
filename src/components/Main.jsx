import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import Repository from './Repository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar/>
        <Routes>
            <Route path="/" element={<RepositoryList/>}/>
            <Route path="/repository/:id" element={<Repository/>}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/createreview" element={<CreateReview />} />
            <Route path="myreviews" element={<MyReviews/>} />
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    </View>
  );
};

export default Main;