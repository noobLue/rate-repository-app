import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: theme.colors.white,
    marginTop: 7,
    marginBottom: 7,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;


const Order = ({ order, setOrder}) => {
  return <View style={styles.picker} >
    <Picker selectedValue={order} onValueChange={(o)=>setOrder(o)}>
      <Picker.Item label="Latest repositories" value="latest"></Picker.Item>
      <Picker.Item label="Highest rated repositories" value="highestRated"></Picker.Item>
      <Picker.Item label="Lowest rated repositories" value="lowestRated"></Picker.Item>
    </Picker>
  </View>
}

export const RepositoryListContainer = ({repositories, order, setOrder}) => {
  const navigate = useNavigate();

  const repoNodes = (repositories && repositories.edges)
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={<Order order={order} setOrder={setOrder} />}
      renderItem={({item})=><Pressable onPress={()=>navigate(`/repository/${item.id}`)}><RepositoryItem item={item}/></Pressable>}
    />
  );
};


const ORDER = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highestRated: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowestRated: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
};

const RepositoryList = () => {
    const [order, setOrder] = useState('latest');
    const {repositories} = useRepositories(ORDER[order]);

    return (<RepositoryListContainer order={order} setOrder={setOrder} repositories={repositories}/>)
};

export default RepositoryList;