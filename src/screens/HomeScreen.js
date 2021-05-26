import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

import { useDispatch } from 'react-redux';
import { signOutStart } from '../redux/user/user.actions';


const HomeScreen = user => {
  const dispatch = useDispatch();
 
  const handleLogout = () => {
    dispatch(signOutStart());
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>{user.user.email}</Text>
        <Button title='Log Off' onPress={handleLogout}/>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
