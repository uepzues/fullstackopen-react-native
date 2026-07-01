import { useMutation, useApolloClient } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();

  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { credentials: { username, password } },
      fetchPolicy: 'no-cache',
    });

    const token = response.data?.authenticate?.accessToken;

    if (token) {
      await authStorage.setAccessToken(token);
    }
    apolloClient.resetStore();
    return response;
  };
  return [signIn, result];
};

export default useSignIn;
