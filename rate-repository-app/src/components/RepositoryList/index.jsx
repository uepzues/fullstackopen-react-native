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
  const { repositories, loading, error, refetch } = useRepositories();

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
    <>
      <RepositoriesListContainer
        repositories={repositories}
        loading={loading}
        refetch={refetch}
      />
    </>
  );
};

export default RepositoryList;
