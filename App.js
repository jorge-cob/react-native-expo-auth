import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';

import { store, persistor } from './src/redux/store';

import DashboardWithValidation from './DashboardWithValidation';


export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <DashboardWithValidation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
