import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { GET_USER } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';
import AppBarTab from './AppBarTab';
import Constants from 'expo-constants';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBackground,
    display: theme.rowDisplay.flexDisplay,
    flexDirection: theme.rowDisplay.flexRow,
    justifyContent: theme.rowDisplay.flexStart,
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  const isUserSignedIn = data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          to="/"
          label="Repositories"
        />
        {isUserSignedIn ? (
          <AppBarTab
            label="Sign out"
            onPress={signOut}
          />
        ) : (
          <AppBarTab
            to="/signin"
            label="Sign In"
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
