import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './AppBar/SignIn';
import SingleRepository from './RepositoryList/SingleRepository';
import ReviewForm from './AppBar/ReviewForm';
import SignUp from './AppBar/SignUp';
import UserReviews from './AppBar/UserReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route
          path="/"
          element={<RepositoryList />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/repositories/:id"
          element={<SingleRepository />}
        />
        <Route
          path="/review"
          element={<ReviewForm />}
        />
        <Route
          path="/user-reviews"
          element={<UserReviews />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </View>
  );
};

export default Main;
