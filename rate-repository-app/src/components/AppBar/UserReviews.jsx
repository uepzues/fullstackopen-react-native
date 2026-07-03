import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import theme from '../../theme';
import { format } from 'date-fns';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_USER } from '../../graphql/queries';
import { DELETE_REVIEW } from '../../graphql/mutations';
import ItemSeparator from '../ItemSeparator';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    paddingVertical: theme.padding.PaddingY,
    marginBottom: 10,
  },
  reviewDetailsRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.padding.PaddingX,
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
  goToButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
    marginRight: 10,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#c43333ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  buttonFont: {
    color: 'white',
    fontWeight: '600',
  },
  displayButton: {
    flexDirection: 'row',
    paddingHorizontal: theme.padding.PaddingX,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ReviewInfo = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const formatDate = (date) => {
    return format(new Date(date), 'dd MMM yyyy');
  };

  const handleOnPressLink = () => {
    navigate(`/repositories/${review.node.repository.id}`);
  };

  const handleOnPressDelete = () => {
    console.log('BUTTON PRESSED');
    const performDelete = async () => {
      try {
        await deleteReview({ variables: { id: review.node.id } });
        refetch();
      } catch (e) {
        console.log(e);
      }
    };

    if (Platform.OS === 'web') {
      const confirmDelete = window.confirm(
        `Delete review\n\nAre you sure you want to delete this review?`,
      );
      if (confirmDelete) {
        performDelete();
      }
    } else {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: performDelete,
          },
        ],
        { cancelable: true },
      );
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.reviewDetailsRow}>
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
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.nameFont}>
            {review?.node.repository?.fullName}
          </Text>
          <Text>{formatDate(review?.node?.createdAt)}</Text>
          <Text style={[styles.textFlow, { paddingTop: 5 }]}>
            {review?.node?.text}
          </Text>
        </View>
      </View>
      <View style={styles.displayButton}>
        <Pressable
          onPress={handleOnPressLink}
          style={({ pressed }) => [
            styles.goToButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.buttonFont}>View Repository</Text>
        </Pressable>
        <Pressable
          onPress={handleOnPressDelete}
          style={({ pressed }) => [
            styles.deleteButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.buttonFont}>Delete Review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) {
    return <Text style={styles.center}>Loading...</Text>;
  }
  if (error) {
    return <Text style={styles.center}>{error.message}</Text>;
  }

  const nodes = data?.me?.reviews?.edges;
  return (
    <>
      <FlatList
        data={nodes}
        renderItem={({ item }) => (
          <ReviewInfo
            review={item}
            refetch={refetch}
          />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </>
  );
};

export default UserReviews;
