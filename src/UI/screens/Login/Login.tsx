import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';

interface StyledTouchableOpacityTypes {
  onPress?: () => void;
  style?: any;
  text?: string;
}
const StyledTouchableOpacity = ({
  onPress,
  style,
  text,
}: StyledTouchableOpacityTypes) => (
  <TouchableOpacity onPress={() => onPress} style={[styles.button, style]}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('User logged in successfully!', userCredential.user);
      // Navigate to the signup page or any other page as needed
      navigation.navigate('signup');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleGoogleLogin = async () => {
    // Implement Google login using Firebase
    // Ensure you have set up Google sign-in in your Firebase project
    // See Firebase documentation: https://rnfirebase.io/auth/social-auth
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <StyledTouchableOpacity text="Login" onPress={handleLogin} />
      <StyledTouchableOpacity
        text="Login with Google"
        onPress={handleGoogleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default LoginScreen;
