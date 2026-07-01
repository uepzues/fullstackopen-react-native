import { useState } from 'react';
import {
  Platform,
  Pressable,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import useCreateReview from '../../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 18,
    paddingHorizontal: 15,
    color: theme.colors.textSecondary,
    fontFamily: theme.fonts.font,
    ...Platform.select({
      web: {
        paddingVertical: 5,
      },
      default: {
        paddingVertical: 10,
      },
    }),
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  text: {
    fontFamily: theme.fonts.main,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  inputError: {
    fontFamily: theme.fonts.main,
    color: '#d73a4a',
    fontSize: 14,
    paddingLeft: 15,
  },
  font: {
    fontFamily: theme.fonts.main,
  },
  border: {
    borderColor: '#d73a4a99',
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  reviewText: yup.string(),
});

const ReviewFormContainer = ({ onSubmit, error }) => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        reviewText: '',
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleBlur,
        handleSubmit,
        handleChange,
        touched,
        values,
        errors,
        initialErrors,
      }) => {
        return (
          <View style={styles.container}>
            {error && (
              <Text style={[styles.inputError, { marginBottom: 10 }]}>
                {error}
              </Text>
            )}

            <TextInput
              placeholder="Repository owner name"
              onBlur={handleBlur('ownerName')}
              onChangeText={handleChange('ownerName')}
              value={values.ownerName}
              style={[
                styles.input,
                styles.font,
                touched.ownerName && errors.ownerName ? styles.border : null,
              ]}
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={[styles.inputError]}>{errors.ownerName}</Text>
            )}
            <TextInput
              placeholder="Repository name"
              onBlur={handleBlur('repositoryName')}
              onChangeText={handleChange('repositoryName')}
              value={values.repositoryName}
              style={[
                styles.input,
                styles.font,
                touched.repositoryName && errors.repositoryName
                  ? styles.border
                  : null,
              ]}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={[styles.inputError]}>{errors.repositoryName}</Text>
            )}
            <TextInput
              placeholder="Rating between 0 and 100"
              onBlur={handleBlur('rating')}
              onChangeText={handleChange('rating')}
              value={values.rating}
              style={[
                styles.input,
                styles.font,
                touched.rating && errors.rating ? styles.border : null,
              ]}
            />
            {touched.rating && errors.rating && (
              <Text style={[styles.inputError]}>{errors.rating}</Text>
            )}
            <TextInput
              placeholder="Review"
              onBlur={handleBlur('reviewText')}
              onChangeText={handleChange('reviewText')}
              value={values.reviewText}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={5}
              style={[
                styles.input,
                styles.font,
                touched.reviewText && errors.reviewText ? styles.border : null,
              ]}
            />
            {touched.reviewText && errors.reviewText && (
              <Text style={[styles.inputError]}>{errors.reviewText}</Text>
            )}
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.button,
                pressed ? { opacity: 0.8 } : 1,
              ]}
            >
              <Text style={styles.text}>Submit</Text>
            </Pressable>
          </View>
        );
      }}
    </Formik>
  );
};

const ReviewForm = ({ id }) => {
  const [createReview] = useCreateReview();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, reviewText } = values;

    try {
      setError(null);
      const result = await createReview({
        ownerName,
        repositoryName,
        rating: parseInt(rating, 10),
        text: reviewText,
      });

      console.log('Mutation result:', result);

      if (result && result.data && result.data.createReview) {
        const { repositoryId } = result.data.createReview;
        navigate(`/repositories/${repositoryId}`);
      }
    } catch (e) {
      console.log('Mutation error:', e);
      setError(e.message);
    }
  };

  return (
    <ReviewFormContainer
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default ReviewForm;
