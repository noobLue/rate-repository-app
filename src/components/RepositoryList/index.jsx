import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: theme.colors.white,
    marginTop: 7,
    marginBottom: 7,
  },
  filter: {
    backgroundColor: theme.colors.white,
    marginTop: 7,
    padding: 7,
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

const Filter = ({filter, setFilter}) => {
  return (<TextInput style={styles.filter} value={filter} onChangeText={setFilter} placeholder="Search"/>);
}

export const RepositoryListContainer = ({repositories, order, setOrder, filter, setFilter}) => {
  const navigate = useNavigate();

  const repoNodes = (repositories && repositories.edges)
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repoNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={(<View><Filter filter={filter} setFilter={setFilter}/><Order order={order} setOrder={setOrder} /></View>)}
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
    const [filter, setFilter] = useState('');
    const [debounceFilter] = useDebounce(filter, 500);

    const {repositories} = useRepositories({
      orderBy: ORDER[order].orderBy, 
      orderDirection: ORDER[order].orderDirection,
      searchKeyword: debounceFilter,
    });

    return (<RepositoryListContainer order={order} setOrder={setOrder} filter={filter} setFilter={setFilter} repositories={repositories}/>)
};

export default RepositoryList;