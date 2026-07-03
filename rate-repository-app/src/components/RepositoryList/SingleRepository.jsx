import { View, StyleSheet, Image, Pressable, FlatList } from 'react-native';
import theme from '../../theme';
import ItemText from '../Text';
import { useQuery } from '@apollo/client/react';
import { REPOSITORY } from '../../graphql/queries';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';
import useReview from '../../hooks/useReview';
import RepositoryReview from './RepositoryReview';
import ItemSeparator from '../ItemSeparator';
import ItemCount from '../ItemCount';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: theme.fonts.main,
  },
  textColor: {
    color: 'white',
  },
  avatarSize: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  displayRow: {
    display: theme.rowDisplay.flexDisplay,
    flexDirection: theme.rowDisplay.flexRow,
  },
  paddingX: {
    paddingHorizontal: theme.padding.PaddingX,
    flexShrink: 1,
  },
  content: {
    justifyContent: 'space-around',
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: theme.padding.PaddingX,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 80,
  },
  lineHeight: {
    lineHeight: 20,
  },
  container: {
    backgroundColor: 'white',
  },
  paddingY: {
    paddingVertical: theme.padding.PaddingY,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  separator: {
    height: 0,
  },
});

const RepositoryInfo = ({ repository }) => {
  const handleOnPress = () => {
    if (repository?.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <View
      style={[
        styles.container,
        styles.paddingX,
        styles.paddingY,
        { marginBottom: 10 },
      ]}
    >
      <View style={[{ marginBottom: 10 }]}>
        <View style={styles.displayRow}>
          <View>
            <Image
              style={styles.avatarSize}
              source={{ uri: repository.ownerAvatarUrl }}
            />
          </View>
          <View style={styles.paddingX}>
            <ItemText style={[styles.text, { fontWeight: 'bold' }]}>
              {repository.fullName}
            </ItemText>
            <ItemText style={[styles.lineHeight, { marginTop: 5 }]}>
              {repository.description}
            </ItemText>
          </View>
        </View>
        <View style={[styles.language]}>
          <ItemText style={styles.textColor}>{repository.language}</ItemText>
        </View>
      </View>

      <View style={[styles.displayRow, styles.content]}>
        <ItemCount
          label="Forks"
          count={repository.forksCount}
        />
        <ItemCount
          label="Stars"
          count={repository.stargazersCount}
        />
        <ItemCount
          label="Rating"
          count={repository.ratingAverage}
        />
        <ItemCount
          label="Review"
          count={repository.reviewCount}
        />
      </View>
      {repository.url && (
        <Pressable
          onPress={handleOnPress}
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <ItemText style={[styles.text, styles.textColor]}>
            Open in Github
          </ItemText>
        </Pressable>
      )}
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const {
    data,
    loading: repoLoading,
    error: repoError,
  } = useQuery(REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useReview(id);

  if (repoLoading || reviewsLoading) return <ItemText>Loading...</ItemText>;
  if (repoError) return <ItemText>{repoError.message}</ItemText>;
  if (reviewsError) return <ItemText>{reviewsError.message}</ItemText>;

  const repository = data?.repository;
  if (!repository) return null;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <RepositoryReview review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
