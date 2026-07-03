import { Pressable, StyleSheet, TextInput, View, Platform } from 'react-native';
import Text from '../Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignin';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

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
      web: { paddingVertical: 10 },
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
  },
  font: {
    fontFamily: theme.fonts.main,
  },
  border: {
    borderColor: '#d73a4a99',
  },
});

// const passwordRules =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .max(30, 'Username too long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Minimum password length is 6.')
    // .matches(passwordRules, {
    //   message:
    //     'Password must contain at least one uppercase, one lowercase, one number, and one special character',
    // })
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit, error }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
        values,
      }) => (
        <View style={styles.container}>
          {!!error && <Text style={[styles.inputError]}>{error.message}</Text>}
          {touched.username && errors.username && (
            <Text style={[styles.inputError]}>{errors.username}</Text>
          )}
          <TextInput
            placeholder="Username"
            style={[
              styles.input,
              styles.font,
              touched.username && errors.username ? styles.border : null,
            ]}
            onChangeText={handleChange('username')}
            value={values.username}
            onBlur={handleBlur('username')}
          />
          {touched.password && errors.password && (
            <Text style={[styles.inputError]}>{errors.password}</Text>
          )}
          <TextInput
            style={[
              styles.input,
              styles.font,
              touched.password && errors.password ? styles.border : null,
            ]}
            placeholder="Password"
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.text}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const [error, setError] = useState('');
  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <SignInContainer
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default SignIn;
