import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../context/authContext';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import CalendarPicker from "react-native-calendar-picker";

interface Category {
  id: number;
  name: string;
}

const AddEntryForm: React.FC = () => {
  const { authState = { token: null, authenticated: false } } = useAuth();
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryCategory, setNewEntryCategory] = useState('');
  const [newEntryDate, setNewEntryDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigation = useNavigation();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}api/category/`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddEntry = async () => {
    try {
      const response = await axios.post(
        `${API_URL}api/journals/`,
        {
          title: newEntryTitle,
          content: newEntryContent,
          category: newEntryCategory,
          date: newEntryDate.toISOString().split('T')[0], 
        },
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        //console.log(response.data); 
        alert('Journal entry added successfully.');
        navigation.goBack(y);

      } else {
        //console.log(response.status); 
        alert('Failed to add entry. Please try again later.');
      }
      setNewEntryTitle('');
      setNewEntryContent('');
      setNewEntryCategory('');
      setNewEntryDate(new Date());
      
      navigation.navigate('Dashboard');
    } catch (error) {
      alert("You must provide all fields");
    }
  };

  const onDateChange = (date: any) => {
    setNewEntryDate(date);
    setShowCalendar(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newEntryTitle}
        onChangeText={setNewEntryTitle}
      />
      <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.dateInput}>
        <Text>{newEntryDate.toDateString()}</Text>
      </TouchableOpacity>
      {showCalendar && (
        <CalendarPicker
          onDateChange={onDateChange}
          selectedStartDate={newEntryDate}
        />
      )}
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Content"
        multiline
        value={newEntryContent}
        onChangeText={setNewEntryContent}
      />
      <Picker
        selectedValue={newEntryCategory}
        onValueChange={(itemValue) => setNewEntryCategory(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Category" value="" />
        {categories.map((category) => (
          <Picker.Item
            key={category.id.toString()}
            label={category.name}
            value={category.name}
          />
        ))}
      </Picker>

      <TouchableOpacity onPress={() => navigation.navigate('AddCategory')} style={styles.addButton}>
        <Text style={styles.buttonText}>Add New Category</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddEntry} style={styles.addButton}>
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '80%',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEntryForm;
