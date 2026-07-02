import { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoriesListContainer from './RepositoryListContainer';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('LATEST');

  const getVariables = (sort) => {
    switch (sort) {
      case 'HIGHEST_RATED':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'LOWEST_RATED':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'LATEST':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { repositories, loading, error, refetch } = useRepositories(
    getVariables(selectedSort)
  );

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );

  return (
    <RepositoriesListContainer
      repositories={repositories}
      loading={loading}
      refetch={refetch}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
    />
  );
};

export default RepositoryList;
