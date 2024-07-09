import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import { useAuth } from '../../context/authContext';

const Settings = () => {
  const { onUpdateUser } = useAuth();
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateUser = async () => {
    try {
      if (!newUsername.trim() && !newPassword.trim()) {
        throw new Error('Username and password cannot be empty');
      }

      const result = await onUpdateUser?.(newUsername.trim(), newPassword.trim());
      if ((result as any)?.error) { // Type assertion to any
        throw new Error((result as any)?.msg || 'Failed to update user');
      }

      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating user:', error.message);
        Alert.alert('Error', error.message);
      } else {
        console.error('Unknown error:', error);
        Alert.alert('Error', 'Unknown error occurred');
      }
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="New Username"
        value={newUsername}
        onChangeText={setNewUsername}
        style={{ marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 5 }}
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ marginTop: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingBottom: 5 }}
      />
      <Button title="Update User" onPress={handleUpdateUser} />
    </View>
  );
};

export default Settings;
