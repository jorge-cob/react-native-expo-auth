import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthNavigator from './src/navigation/AuthNavigator';

import HomeScreen from './src/screens/HomeScreen.js';

import { selectCurrentUser } from './src/redux/user/user.selectors';
import { checkUserSession } from './src/redux/user/user.actions';

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
