import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../context/authContext';
import { useAuth } from '../../context/authContext';

interface Entry {
  id: number;
  title: string;
  date: string;
  content: string;
}

const Summary = () => {
  const { authState } = useAuth();
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('daily'); // Default to daily

  useEffect(() => {
    fetchEntries(selectedPeriod);
  }, [authState, selectedPeriod]);

  const fetchEntries = async (period: string) => {
    try {
      setLoading(true);
      if (!authState?.token) {
        console.error('Token not found');
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}api/journals/`, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });

      setEntries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Entry }) => (
    <TouchableOpacity onPress={() => console.log('Entry details:', item)}>
      <View style={styles.entryContainer}>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryDate}>{item.date}</Text>
        <Text style={styles.entryContent} numberOfLines={2}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Summary</Text>

      <View style={styles.periodSelector}>
        <TouchableOpacity onPress={() => handlePeriodChange('daily')}>
          <Text style={[styles.periodText, selectedPeriod === 'daily' && styles.selectedPeriod]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePeriodChange('weekly')}>
          <Text style={[styles.periodText, selectedPeriod === 'weekly' && styles.selectedPeriod]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePeriodChange('monthly')}>
          <Text style={[styles.periodText, selectedPeriod === 'monthly' && styles.selectedPeriod]}>Monthly</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No entries found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  periodText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPeriod: {
    fontWeight: 'bold',
    color: '#f4511e',
  },
  entryContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  entryDate: {
    fontSize: 14,
    color: 'gray',
  },
  entryContent: {
    fontSize: 16,
  },
});

export default Summary;
