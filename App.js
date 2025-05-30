import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Dashboard from './src/screens/Dashboard';
import NoteView from './src/screens/NoteView';
import NoteForm from './src/screens/NoteForm';
import { COLORS } from './src/constants/theme';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ title: 'My Notes' }}
        />
        <Stack.Screen 
          name="NoteView" 
          component={NoteView} 
          options={{ title: 'Note Details' }}
        />
        <Stack.Screen 
          name="NoteForm" 
          component={NoteForm} 
          options={({ route }) => ({ 
            title: route.params?.note ? 'Edit Note' : 'New Note' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}