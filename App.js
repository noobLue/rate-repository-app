import { StatusBar } from 'react-native';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import createApolloClient from './src/utils/apolloClient';
import { ApolloProvider } from '@apollo/client/react';



const apolloClient = createApolloClient();

const App = () => {
  return (<>
    <StatusBar style='light'/>
    <NativeRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  </>);
};

export default App;