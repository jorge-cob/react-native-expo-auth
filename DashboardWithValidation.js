import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AuthNavigator from './src/navigation/AuthNavigator';

import HomeScreen from './src/screens/HomeScreen.js';

import { selectCurrentUser } from './src/redux/user/user.selectors';
import { checkUserSession } from './src/redux/user/user.actions';


const DashboardWithValidation = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(createStructuredSelector({
    user: selectCurrentUser,
  }));

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <>
      {
        user ? 
          <HomeScreen user={user} />
        : 
          <AuthNavigator />
      }
  </>
  );
};

export default DashboardWithValidation;
