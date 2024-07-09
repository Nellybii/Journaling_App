import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; 
import { useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';

const DropdownMenu = () => {
  const { onLogout } = useAuth();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdown}>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen' as never)} >
            <Text style={styles.dropdownItem}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Summary' as never)}>
            <Text style={styles.dropdownItem}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings' as never)}>
            <Text style={styles.dropdownItem}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onLogout}>
            <Text style={styles.dropdownItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#f4511e',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  dropdownItem: {
    padding: 10,
    color: '#fff',
  },
});

export default DropdownMenu;
