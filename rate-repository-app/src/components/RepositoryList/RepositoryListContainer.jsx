import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import theme from '../../theme';
import ItemSeparator from '../ItemSeparator';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    margin: 10,
  },
  button: {
    borderRadius: 0,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  search: {
    backgroundColor: 'lightgray',
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
  },
});

const FilterMenu = ({ selectedSort, setSelectedSort, search, setSearch }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value) => {
    setSelectedSort(value);
    closeMenu();
  };

  const getLabel = () => {
    switch (selectedSort) {
      case 'HIGHEST_RATED':
        return 'Highest rated repositories';
      case 'LOWEST_RATED':
        return 'Lowest rated repositories';
      case 'LATEST':
      default:
        return 'Latest repositories';
    }
  };

  return (
    <View>
      <Searchbar
        style={[styles.container, styles.search]}
        inputStyle={{ color: 'gray' }}
        placeholder="Search"
        onChangeText={setSearch}
        value={search}
        placeholderTextColor="gray"
        iconColor={'gray'}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="contained"
            onPress={openMenu}
            contentStyle={{ flexDirection: 'row-reverse', height: 55 }}
            style={[styles.button]}
            textColor="white"
            labelStyle={{ color: 'white', fontSize: 16 }}
            icon="filter"
          >
            {getLabel()}
          </Button>
        }
      >
        <Menu.Item
          onPress={() => handleSelect('LATEST')}
          title="Latest repositories"
        />
        <Menu.Item
          onPress={() => handleSelect('HIGHEST_RATED')}
          title="Highest rated repositories"
        />
        <Menu.Item
          onPress={() => handleSelect('LOWEST_RATED')}
          title="Lowest rated repositories"
        />
      </Menu>
    </View>
  );
};

const RepositoriesListContainer = ({
  repositories,
  loading,
  refetch,
  selectedSort,
  setSelectedSort,
  search,
  setSearch,
  onEndReached,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  // console.log('REPOSITORYNODES', repositoryNodes)

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem repo={item} />}
      keyExtractor={(repo) => repo.id}
      ItemSeparatorComponent={ItemSeparator}
      onRefresh={refetch}
      refreshing={loading}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <FilterMenu
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          search={search}
          setSearch={setSearch}
        />
      }
    />
  );
};

export default RepositoriesListContainer;
