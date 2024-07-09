import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const Register: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onRegister } = useAuth();

    const register = async () => {
        const res = await onRegister!(username, email, password);
        if (res) {
            alert("Registered successfully");
            navigation.navigate('Login');
        } else {
            alert("Registration failed"); 
        }
    };

    return (
        <View style={styles.container}>
            <Text>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Register" onPress={register} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    link: {
        marginTop: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default Register;
