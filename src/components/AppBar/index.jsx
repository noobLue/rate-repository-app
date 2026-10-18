import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme'
import AppBarTab, { PressableTab } from './AppBarTab';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient, useQuery } from '@apollo/client/react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
  }
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  const me = data?.me;

  return <View style={styles.container}>
    <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab style={styles.tab} to="/">Repositories</AppBarTab>
        {me && me.username && <AppBarTab to="/createreview">Create a review</AppBarTab> }
        {(me && me.username) ? <PressableTab callback={signOut}>Sign out!</PressableTab> : <AppBarTab to="/signin">Sign in!</AppBarTab>}
    </ScrollView>
  </View>;
};

export default AppBar;