import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  pressed: {
    backgroundColor: 'green',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  inputError: {
    borderColor: '#d73a4a99',
  },
});

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username too long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Minimum password length is 6.').matches(passwordRules, {
      message: 'Password must contain at least one uppercase, one lowercase, one number, and one special character' })
    .required('Password is required'),
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
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
          {touched.username && errors.username && (
            <Text style={{ color: '#d73a4a', fontSize: 14 }}>
              {errors.username}
            </Text>
          )}
          <TextInput
            placeholder="Username"
            style={[
              styles.input,
              touched.username && errors.username ? styles.inputError : null,
            ]}
            onChangeText={handleChange('username')}
            value={values.username}
            onBlur={handleBlur('username')}
          />
          {touched.password && errors.password && (
            <Text style={{ color: '#d73a4a', fontSize: 14 }}>
              {errors.password}
            </Text>
          )}
          <TextInput
            style={[
              styles.input,
              touched.password && errors.password ? styles.inputError : null,
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
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
