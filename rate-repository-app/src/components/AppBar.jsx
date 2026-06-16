import { View, StyleSheet, ScrollView } from 'react-native';
import AppBarTab from './AppBarTab';
import Constants from 'expo-constants';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab
          to="/"
          label="Repositories"
        />
        <AppBarTab
          to="/signin"
          label="Sign In"
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;
