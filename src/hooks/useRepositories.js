import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useRepositories = (variables) => {
    const {data, error, loading, refetch} = useQuery(GET_REPOSITORIES, {variables, fetchPolicy: 'cache-and-network'});

  
    return {repositories: data?.repositories, error, loading, refetch};
};

export default useRepositories;