import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import {
  ANDROID_CLIENT_ID,
} from '@env';

import { googleSignInStart, signUpStart } from '../redux/user/user.actions';


export const isAndroid = () => Platform.OS === 'android';

WebBrowser.maybeCompleteAuthSession();

const SignUpScreen = () => {
  const androidClientId = ANDROID_CLIENT_ID;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 
  async function signInWithEmail() {
    dispatch(signUpStart({email, password, displayName}));
  }

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: androidClientId,
    },
  );
  

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(googleSignInStart(response));
    }
  }, [response]);



  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Text style={{ fontSize: 32, fontWeight: '700', color: 'gray' }}>
            App Name
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              textContentType="name"
              value={displayName}
              onChangeText={value => setDisplayName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B1B1B1"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#B1B1B1"
              returnKeyType="done"
              textContentType="newPassword"
              secureTextEntry={true}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <TouchableOpacity
            style={{ width: '86%', marginTop: 10 }}
            onPress={signInWithEmail}
          >
              <Text>Sign Up</Text>
          </TouchableOpacity>
      
          <TouchableOpacity 
            style={{ width: '86%', marginTop: 10 }}
            onPress={() => {
              promptAsync();
            }} 
            disabled={!request} 
          >
            <View style={styles.googleButton}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  fontSize: 16,
                  color: '#707070'
                }}
              >
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontWeight: '200', fontSize: 17, textAlign: 'center' }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            >
              Already have an account?
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '86%',
    marginTop: 15
  },
  logo: {
    marginTop: 20
  },
  input: {
    fontSize: 20,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },
  button: {
    backgroundColor: '#3A559F',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#707070'
  }
});

export default SignUpScreen;
