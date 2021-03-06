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

import GoogleButton from '../components/google-button/google-button.component';


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
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder='Name'
              placeholderTextColor='#B1B1B1'
              returnKeyType='next'
              textContentType='name'
              value={displayName}
              onChangeText={value => setDisplayName(value)}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              placeholderTextColor='#B1B1B1'
              returnKeyType='next'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={email}
              onChangeText={value => setEmail(value)}
            />
            <TextInput
              style={styles.input}
              placeholder='Password'
              placeholderTextColor='#B1B1B1'
              returnKeyType='done'
              textContentType='newPassword'
              secureTextEntry={true}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>

          <TouchableOpacity
            style={styles.signButton}
            onPress={signInWithEmail}
          >
              <Text>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <GoogleButton 
              onPress={() => {
                promptAsync();
              }} 
              color='#707070'
            > 
              Continue with Google 
            </GoogleButton>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text
              style={styles.switchInAndUpText}
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
  input: {
    fontSize: 20,
    borderColor: '#707070',
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25.5
  },
  signButton: {
    width: 80, 
    height: 38,
    marginTop: 10,
    backgroundColor: '#24A0ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 25,
    alignSelf:'flex-start'
  },
  switchInAndUpText: {
    fontWeight: '200', 
    fontSize: 17, 
    textAlign: 'center', 
    textDecorationLine: 'underline'
  },
});

export default SignUpScreen;
