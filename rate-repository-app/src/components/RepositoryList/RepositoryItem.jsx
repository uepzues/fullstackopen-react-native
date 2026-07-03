import { View, StyleSheet, Image } from 'react-native';
import theme from '../../theme';
import ItemText from '../Text';
import { Link } from 'react-router-native';
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
});

const RepositoryItem = ({ style, repo }) => {
  return (
    <Link to={`/repositories/${repo.id}`}>
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
              <ItemText
                fontWeight="bold"
                style={styles.text}
              >
                {repo.fullName}
              </ItemText>
              <ItemText style={[styles.lineHeight, { marginTop: 5 }]}>
                {repo.description}
              </ItemText>
            </View>
          </View>
          <View style={[styles.language]}>
            <ItemText style={[styles.textColor, { paddingBottom: 3 }]}>
              {repo.language}
            </ItemText>
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
      </View>
    </Link>
  );
};

export default RepositoryItem;
