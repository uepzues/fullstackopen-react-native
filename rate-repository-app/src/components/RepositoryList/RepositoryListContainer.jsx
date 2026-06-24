import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoriesListContainer = ({ repositories, loading, refetch }) => {
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
    />
  );
};

export default RepositoriesListContainer;
