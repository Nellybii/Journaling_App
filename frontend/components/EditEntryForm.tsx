import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { API_URL, useAuth } from '../context/authContext';

type RootStackParamList = {
  EditEntryForm: { entryId: number };
};

type EditEntryFormRouteProp = RouteProp<RootStackParamList, 'EditEntryForm'>;

const EditEntryForm: React.FC = () => {
  const { authState } = useAuth();
  const navigation = useNavigation();
  const route = useRoute<EditEntryFormRouteProp>();
  const { entryId } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        if (!authState?.token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.get(`${API_URL}api/journals/${entryId}/`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        const entry = response.data;
        setTitle(entry.title || '');
        setContent(entry.content || '');
        setCategory(entry.category || '');
        setSelectedDate(new Date(entry.date)); 
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchEntry();
  }, [authState, entryId]);

  const handleEditEntry = async () => {
    try {
      if (!authState?.token) {
        console.error('Token not found');
        return;
      }

      const updatedEntry = {
        title,
        content,
        category,
        date: selectedDate.toISOString().split('T')[0],
      };

      const response = await axios.put(`${API_URL}api/journals/${entryId}/`, updatedEntry, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
          'Content-Type': 'application/json',
        },
      });

      Alert.alert('Success', 'Journal entry updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update entry. Please try again later.');
      console.error('Error updating entry:', error);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close calendar picker after selection
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Journal Entry</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.contentInput]}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity onPress={() => setShowCalendar(true)} style={styles.input}>
        <Text style={styles.dateText}>{moment(selectedDate).format('MMMM D, YYYY')}</Text>
      </TouchableOpacity>
      {showCalendar && (
        <CalendarPicker
          onDateChange={handleDateChange}
          selectedStartDate={selectedDate}
          initialDate={selectedDate}
          screenWidth={360}
          minDate={new Date()} // Optionally set minimum date
          allowRangeSelection={false} // Disable range selection
          todayBackgroundColor="#f2e6ff" // Customize calendar appearance
          selectedDayColor="#7300e6"
          selectedDayTextColor="#FFFFFF"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TouchableOpacity onPress={handleEditEntry} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  contentInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

export default EditEntryForm;
