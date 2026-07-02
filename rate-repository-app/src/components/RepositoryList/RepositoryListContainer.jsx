import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Button, Menu } from 'react-native-paper';
import { useState } from 'react';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 0,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
});

const SortMenu = ({ selectedSort, setSelectedSort }) => {
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
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
      <Button
        mode="contained"
        onPress={openMenu}
        contentStyle={{ flexDirection: 'row-reverse', height: 55 }}
            style={[styles.button, {display: 'flex'}]}
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

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoriesListContainer = ({
  repositories,
  loading,
  refetch,
  selectedSort,
  setSelectedSort,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => <RepositoryItem repo={item} />;

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={renderItem}
      keyExtractor={(repo) => repo.id}
      ItemSeparatorComponent={ItemSeparator}
      onRefresh={refetch}
      refreshing={loading}
      ListHeaderComponent={
        <>
        
        <SortMenu
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />
        </>
      }
    />
  );
};

export default RepositoriesListContainer;
