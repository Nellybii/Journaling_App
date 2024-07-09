import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import axios, { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL, useAuth } from '../../context/authContext';

interface JournalEntry {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
}



const Dashboard = () => {
  const { authState } = useAuth();
  const navigation = useNavigation();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchEntries = async () => {
    try {
      if (!authState?.token) {
        console.error('Token not found');
        return;
      }

      const response = await axios.get<JournalEntry[]>(`${API_URL}api/journals/`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [authState]);

  const handleDeleteEntry = async (entryId: number) => {
    try {
      if (!authState?.token) {
        console.error('Token not found');
        return;
      }

      await axios.delete(`${API_URL}api/journals/${entryId}/`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Server Response:', axiosError.response?.data);
      }
    }
  };

  const handleEditEntry = (entryId: number) => {
    navigation.navigate('EditEntryForm', { entryId });
  };

  const renderItem = ({ item }: { item: JournalEntry }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20,  }}>{item.title}</Text>
      </View>
      <View style={{ flex: 3, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16 }}>{item.content}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 14, color: 'gray' }}>{item.date}</Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <Text style={{ fontStyle: 'italic' }}>{item.category}</Text>
      </View>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => handleEditEntry(item.id)} style={{ padding: 8, borderRadius: 5, backgroundColor: '#007AFF', marginRight: 10 }}>
          <Text style={{ color: 'white' }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteEntry(item.id)} style={{ padding: 8, borderRadius: 5, backgroundColor: 'red' }}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', flex: 1 }}>All Journal Entries</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEntryForm')}
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Add Journal</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Search by category name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor: '#f0f0f0' }}>
        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 16 }}>Title</Text>
        <Text style={{ flex: 3, fontWeight: 'bold', fontSize: 16 }}>Content</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 16 }}>Date</Text>
        <Text style={{ flex: 2, fontWeight: 'bold', fontSize: 16 }}>Category</Text>
        <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 16, textAlign: 'right' }}>Actions</Text>
      </View>

      <FlatList
        data={entries.filter(entry => entry.category.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No entries found.</Text>}
      />
    </View>
  );
};

export default Dashboard;
