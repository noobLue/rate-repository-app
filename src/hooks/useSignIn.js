import { useMutation } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations"
import useAuthStorage from '../hooks/useAuthStorage';
import useApolloClient from '../utils/apolloClient';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ({username, password}) => {
        const res = await mutate({
            variables: {credentials:  {username, password}},
        });

        await authStorage.setAccessToken(res.data.authenticate.accessToken);
        apolloClient.resetStore();

        return res;
    }

    return [signIn, result]
}

export default useSignIn;