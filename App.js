import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeScreen from './src/screens/HomeScreen.js';
import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASE_URL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from '@env';

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ title: 'My app' }}
        />
        <Stack.Screen
          name="App"
          component={HomeScreen}
          initialParams={{ user: 'me' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
