import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';


const HomeScreen = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((aUser) => {
      if (aUser != null) {
        setUser(aUser);
      }
    })
  }, [])
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>{user.email}</Text>
        <Button title='Log Off' onPress={() => {
          firebase.auth().signOut();
        }}/>
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
