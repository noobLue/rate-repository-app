import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme'
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
  },
});


const AppBar = () => {
  return <View style={styles.container}>
    <AppBarTab to="/">Repositories</AppBarTab>
    <AppBarTab to="/signin">Sign in!</AppBarTab>
  </View>;
};

export default AppBar;