import { StatusBar } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client/react';

import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (<>
    <StatusBar style='light'/>
    <NativeRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  </>);
};

export default App;