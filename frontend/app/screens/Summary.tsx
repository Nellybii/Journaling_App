import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../../context/authContext';

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

type Period = 'daily' | 'weekly' | 'monthly';

const SummaryScreen: React.FC = () => {
  const { authState } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [period, setPeriod] = useState<Period>('daily');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchEntries = async () => {
    try {
      if (!authState?.token) {
        console.error('Token not found');
        return;
      }

      let url = `${API_URL}api/journals-summary/?period=${period}`;

      if (period === 'daily' && startDate) {
        url += `&start_date=${startDate}`;
      } else if (period === 'weekly' && startDate && endDate) {
        url += `&start_date=${startDate}&end_date=${endDate}`;
      } else if (period === 'monthly' && startDate) {
        url += `&start_date=${startDate}`;
      }

      const response = await axios.get<JournalEntry[]>(url, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      Alert.alert('Error', 'Failed to fetch entries. Please try again later.');
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [period, startDate, endDate]);

  const renderEntryItem = ({ item }: { item: JournalEntry }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.title}</Text>
      <Text style={styles.tableCell}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setPeriod('daily')}>
          <Text style={period === 'daily' ? styles.activeButtonText : styles.buttonText}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPeriod('weekly')}>
          <Text style={period === 'weekly' ? styles.activeButtonText : styles.buttonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPeriod('monthly')}>
          <Text style={period === 'monthly' ? styles.activeButtonText : styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      {period !== 'monthly' && (
        <View style={styles.datePickerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter start date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />
          {period === 'weekly' && (
            <TextInput
              style={styles.input}
              placeholder="Enter end date (YYYY-MM-DD)"
              value={endDate}
              onChangeText={setEndDate}
            />
          )}
        </View>
      )}

      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderCell}>Date</Text>
        <Text style={styles.tableHeaderCell}>Title</Text>
        <Text style={styles.tableHeaderCell}>Content</Text>
      </View>

      <FlatList
        data={entries}
        renderItem={renderEntryItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text>No entries found</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  activeButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default SummaryScreen;
