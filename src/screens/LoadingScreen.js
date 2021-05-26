import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/user/user.selectors';
const LoadingScreen = () => {
    const navigation = useNavigation();
    const {user} = useSelector(createStructuredSelector({
      user: selectCurrentUser,
    }));
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
      setCurrentUser(user);
    }, [])
  
    useEffect(() => {
      if (!currentUser) {
        navigation.navigate('SignIn');
      }
    }, [currentUser])
    
    return (
      <View style={styles.container}>
          <ActivityIndicator size='large' />
      </View>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default LoadingScreen;
