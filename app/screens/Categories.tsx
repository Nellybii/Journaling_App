import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL, useAuth } from '../../context/authContext';

interface Category {
    id: number;
    name: string;
  }

const CategoryScreen: React.FC = () => {
  const { authState } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!authState?.token) {
          console.error('Token not found');
          return;
        }

        const response = await axios.get<Category[]>(`${API_URL}api/category/`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });

        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, [authState]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={<Text>No categories found.</Text>}
      />
    </View>
  );
};

export default CategoryScreen;
