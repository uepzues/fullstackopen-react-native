import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
  },
});

const CustomText = ({ children }) => {
  return <Text style={styles.text}>{children}</Text>;
};

const RepositoryItem = ({ repo }) => {
  return (
    <View>
      <CustomText>Full Name: {repo.fullName}</CustomText>
      <CustomText>Description: {repo.description}</CustomText>
      <CustomText>Language: {repo.language}</CustomText>
      <CustomText>Forks: {repo.forksCount}</CustomText>
      <CustomText>Stars: {repo.stargazersCount}</CustomText>
      <CustomText>Rating: {repo.ratingAverage}</CustomText>
      <CustomText>Review: {repo.reviewCount}</CustomText>
    </View>
  );
};

export default RepositoryItem;
