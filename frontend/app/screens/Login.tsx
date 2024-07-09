import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const Login: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin } = useAuth();

  const login = async () => {
    try {
      if (!username || !password) {
        alert('Please enter username and password.');
        return;
      }
  
      if (onLogin) {
        const res = await onLogin(username, password);
  
          alert('Login successful!');
          navigation.navigate('Dashboard');
        
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };
  
return (
  <View style={styles.container}>
    <Image
      source={{
        uri: 'https://media.istockphoto.com/id/938323142/vector/laptop-with-login-and-password-form-page-on-screen-sign-in-to-account-user-authorization.jpg?s=612x612&w=0&k=20&c=PtH460FHM4saHlLUTyLsYpNWF4eEDC9kaOcvXYtsF2o=',
      }}
      style={styles.image}
      resizeMode="contain"
    />
    <Text style={styles.title}>Login</Text>
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    height: 300,
    width: 300,
    marginBottom: 20,
  },
  formContainer: {
    width: '70%',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  link: {
    marginTop: 10,
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
