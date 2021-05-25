import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
const LoadingScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          navigation.navigate('App');
        } else {
          navigation.navigate('SignUp');
        }
      });
    }, [])
    
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
