import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
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
});

const SignIn = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            placeholder="Username"
            style={styles.input}
            onChangeText={handleChange('username')}
            value={values.username}
            onBlur={handleBlur('username')}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            secureTextEntry={true}
          />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 },
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
