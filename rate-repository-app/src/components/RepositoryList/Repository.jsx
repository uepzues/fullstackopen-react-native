import { View, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../../theme';
import ItemText from '../Text';
import { useQuery } from '@apollo/client/react';
import { REPOSITORY } from '../../graphql/queries';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native';

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
});

const Repository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (loading) return <ItemText>Loading...</ItemText>;
  if (error) return <ItemText>{error.message}</ItemText>;

  const repo = data?.repository;

  const handleOnPress = () => {
    Linking.openURL(repo?.url);
  };

  return (
    <View
      style={[styles.container, styles.paddingX, styles.paddingY]}
      testID="repositoryItem"
    >
      <View style={[{ marginBottom: 10 }]}>
        <View style={styles.displayRow}>
          <View>
            <Image
              style={styles.avatarSize}
              source={{ uri: repo.ownerAvatarUrl }}
            ></Image>
          </View>
          <View style={styles.paddingX}>
            <ItemText style={[styles.text, { fontWeight: 'bold' }]}>
              {repo.fullName}
            </ItemText>
            <ItemText style={[styles.lineHeight, { marginTop: 5 }]}>
              {repo.description}
            </ItemText>
          </View>
        </View>
        <View style={[styles.language]}>
          <ItemText style={styles.textColor}>{repo.language}</ItemText>
        </View>
      </View>

      <View style={[styles.displayRow, styles.content]}>
        <ItemCount
          label="Forks"
          count={repo.forksCount}
        />
        <ItemCount
          label="Stars"
          count={repo.stargazersCount}
        />
        <ItemCount
          label="Rating"
          count={repo.ratingAverage}
        />
        <ItemCount
          label="Review"
          count={repo.reviewCount}
        />
      </View>
      <Pressable
        onPress={handleOnPress}
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.8 : 1 }]}
      >
        <ItemText style={[styles.text, styles.textColor]}>
          Open in Github
        </ItemText>
      </Pressable>
    </View>
  );
};

const ItemCount = ({ label, count }) => {
  const countInK = (item) => {
    let count = '0';

    if (item && item >= 1000) {
      count = (item / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
      return count;
    }
    return item;
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <ItemText style={{ fontWeight: 'bold' }}>{countInK(count)}</ItemText>
      <ItemText>{label}</ItemText>
    </View>
  );
};

export default Repository;
