import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import Repository from './Repository';


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
            <Route path="/" element={<RepositoryList/>}></Route>
            <Route path="/repository/:id" element={<Repository/>}></Route>
            <Route path="/signin" element={<SignIn/>}></Route>
            <Route path="*" element={<Navigate to="/" replace/>}></Route>
        </Routes>
    </View>
  );
};

export default Main;