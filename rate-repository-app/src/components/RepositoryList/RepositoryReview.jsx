import { Text, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  displayRow: {
    display: theme.rowDisplay.flexDisplay,
    flexDirection: theme.rowDisplay.flexRow,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  paddingX: {
    paddingHorizontal: theme.padding.PaddingX,
  },
  paddingY: {
    paddingVertical: theme.padding.PaddingY,
  },
  container: {
    backgroundColor: 'white',
  },
  rating: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: theme.padding.PaddingX,
    alignSelf: 'flex-start',
    
  },
  ratingFont: {
    fontWeight: '600',
    fontSize: 20,
    color: theme.colors.primary,
  },
  nameFont: {
    fontWeight: 'bold',
  },
  textFlow: {
    flex: 1,
    paddingRight: 40,
  },
});

const RepositoryReview = ({ review }) => {

  const formatDate = (date) => {
    return format(new Date(date), 'dd MMM yyyy');
  };

  return (
    <View style={[styles.displayRow, styles.paddingX, styles.paddingY, {}]}>
      <View style={styles.rating}>
        <Text style={[styles.ratingFont, {fontSize: review?.rating === 100 ? 14 : 20}]}>{review?.rating}</Text>
      </View>
      <View style={[styles.paddingX, { width: '100%', paddingVertical: 10, }]}>
        <Text style={styles.nameFont}>{review?.user.username}</Text>
        <Text>{formatDate(review?.createdAt)}</Text>
        <Text style={[styles.textFlow, {paddingTop: 5}]}>{review?.text}</Text>
      </View>
    </View>
  );
};
export default RepositoryReview;
