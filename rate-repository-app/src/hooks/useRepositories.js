import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (variables) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    onCompleted: () => console.log('Repositories fetched successfully'),
    onError: (err) => console.error(err),
  });

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, error, refetch };
};

export default useRepositories;
