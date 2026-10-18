import { useParams } from "react-router-native";
import RepositoryItem from "./RepositoryList/RepositoryItem";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";
import Text from "./Text";
import theme from "../theme";


const Repository = () => {
    const {id} = useParams();

    const {data, loading, error} = useQuery(GET_REPOSITORY, {
        variables: {repositoryId: id},
        fetchPolicy: 'cache-and-network',
    });

    if(loading) return <Text>Loading...</Text>;
    if(error) return <Text color={theme.colors.error}>{error.message}</Text>

    return (<RepositoryItem item={data.repository} showUrl={true}/>)
}

export default Repository;