import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';

const AddCategory: React.FC = () => {
    const { authState = { token: null, authenticated: false } } = useAuth();
    const [newCategoryName, setNewCategoryName] = useState('');
    const navigation = useNavigation();

    const handleAddCategory = async () => {
        try {
            const response = await axios.post(
                `${API_URL}api/category/`,
                { name: newCategoryName },
                {
                    headers: {
                        Authorization: `Bearer ${authState.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            //console.log('Category added:', response.data);
            alert('Category added successfully');
            navigation.goBack(); 
            setNewCategoryName('');
            
        } catch (error) {
           // console.error('Error adding category:', error);
           alert('Error adding category:')
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Category Name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
            />
            <TouchableOpacity onPress={handleAddCategory} style={styles.addButton}>
                <Text style={styles.buttonText}>Add Category</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
   
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#007AFF',
        alignItems: 'center',
        borderRadius: 10,
        height: 40
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddCategory;
