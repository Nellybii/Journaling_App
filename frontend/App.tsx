import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Dashboard from './app/screens/Dashboard';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import AddEntryForm from './components/AddEntryForm';
import { AuthProvider, useAuth } from './context/authContext';
import DropdownMenu from './components/DropDownMenu';
import Setting from './app/screens/Setting';
import Summary from './app/screens/Summary';
import EditEntryForm from './components/EditEntryForm';
import AddCategory from './components/AddCategoryForm';
import CategoryScreen from './app/screens/Categories';
import LandingPage from './app/screens/LandingPage';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Layout />
      </NavigationContainer>
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: styles.headerContainer,
        headerTitleStyle: styles.headerTitle,
        headerBackTitleVisible: false,
        headerTitleAlign: 'center', 
      }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      

      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={() => ({
              headerTitle: 'Journaling App',
              headerLeft: () => (
                <View style={styles.headerLeft}>
                  <Ionicons name="person-circle" size={32} color="#fff" />
                </View>
              ),
              headerRight: () => (
                <View style={styles.headerRight}>
                  <DropdownMenu />
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="AddEntryForm"
            component={AddEntryForm}
            options={{ title: 'Add a New Journal Entry' }}
          />
          <Stack.Screen
            name="EditEntryForm"
            component={EditEntryForm}
            options={{ title: 'Edit Journal Entry' }}
          />
          <Stack.Screen
            name="AddCategory"
            component={AddCategory}
            options={{ title: 'Add a New Category' }}
          />
          <Stack.Screen
            name="Settings"
            component={Setting}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name="Summary"
            component={Summary}
            options={{ title: 'Summary' }}
          />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={{ title: 'All Categories' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f4511e',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerLeft: {
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default App;
