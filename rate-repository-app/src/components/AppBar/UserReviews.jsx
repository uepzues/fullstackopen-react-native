import { StyleSheet, FlatList, View, Text } from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client/react';
import { GET_USER } from '../../graphql/queries';
import ItemSeparator from '../ItemSeparator';

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

const ReviewInfo = ({ review }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'dd MMM yyyy');
  };

  return (
    <View style={[styles.displayRow, styles.paddingX, styles.paddingY, {}]}>
      <View style={styles.rating}>
        <Text
          style={[
            styles.ratingFont,
            { fontSize: review?.node?.rating === 100 ? 14 : 20 },
          ]}
        >
          {review?.node?.rating}
        </Text>
      </View>
      <View style={[styles.paddingX, { width: '100%', paddingVertical: 10 }]}>
        <Text style={styles.nameFont}>{review?.node.repository?.fullName}</Text>
        <Text>{formatDate(review?.node?.createdAt)}</Text>
        <Text style={[styles.textFlow, { paddingTop: 5 }]}>
          {review?.node?.text}
        </Text>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  const nodes = data?.me?.reviews?.edges;
  return (
    <>
      <FlatList
        data={nodes}
        renderItem={({ item }) => <ReviewInfo review={item} />}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default UserReviews;
