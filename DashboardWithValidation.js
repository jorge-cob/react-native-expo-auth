import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

import AuthNavigator from './src/navigation/AuthNavigator';

import HomeScreen from './src/screens/HomeScreen.js';

import { selectCurrentUser } from './src/redux/user/user.selectors';
import { checkUserSession } from './src/redux/user/user.actions';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
} from '@env';

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const DashboardWithValidation = () => {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  
  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'App' : 'Auth'}
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ title: 'My app', headerShown: false }}
        />
        <Stack.Screen
          name="App"
          component={HomeScreen}
          initialParams={{ user: 'me' }}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DashboardWithValidation;
