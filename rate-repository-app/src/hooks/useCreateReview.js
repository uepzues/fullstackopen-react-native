import { CREATE_REVIEW } from '../graphql/mutations';
import { useMutation } from '@apollo/client/react';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, rating, text, repositoryName }) => {
    const result = await mutate({
      variables: {
        review: {
          ownerName,
          rating,
          text,
          repositoryName,
        },
      },
      fetchPolicy: 'no-cache',
    });

    return result;
  };
  return [createReview, result];
};

export default useCreateReview;
