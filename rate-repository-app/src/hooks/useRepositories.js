import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (variables) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
      onCompleted: () => console.log('Repositories fetched successfully'),
      onError: (err) => console.error(err),
    },
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data?.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { data, loading, error, refetch, fetchMore: handleFetchMore };
};

export default useRepositories;
