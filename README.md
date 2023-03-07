# react-native-expo-auth
## React native expo auth boilerplate (THIS PROJECT IS ABANDONED AND NEW VERSION IS BEING DEVELOPED IN A NEW REPOSITORY: https://github.com/jorge-cob/react-native-expo-auth-v2 )


Template for react-native projects in need of firebase related authentication.


## Features

- Sign in or sign up into your app using email and password or Google sign in (other firebase supported authentication methods may be implemented) and navigate between screens.

## Tech

Cloud Task Manager uses a number of open source projects to work properly:
- [React Native] (https://github.com/facebook/react-native)
- [Expo](https://expo.io/) 
- [Firebase](https://firebase.google.com/) - Storage and database management.
- [React Redux](https://react-redux.js.org/) - State container.
- [Redux Saga](https://redux-saga.js.org/) - Asynchronous flows management.


## Pre-requisites

- Node LTS version
- Yarn 1.10.1 or above
- Create your own .env file in the root directory with:
  ```sh
    ANDROID_CLIENT_ID:*YOUR ANDROID KEY*
  ```
  
  
## Important
  Go to /src/firebase/firebase.utils.js and update the firebase setup to point to your own DB. Current DB will be maintained until collapse of free tier.

## Scripts

```sh
yarn install
```
Install dependencies 

```sh
yarn start
```
Runs your app in development mode.

## License

MIT

**Free Software, Hell Yeah!**
