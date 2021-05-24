import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyD21_Ld93yO70mb8p3wV7vZacp9vqUce2w",
  authDomain: "wholist-db.firebaseapp.com",
  projectId: "wholist-db",
  storageBucket: "wholist-db.appspot.com",
  messagingSenderId: "149014277771",
  appId: "1:149014277771:web:1ad9400fc15b803caaae8e"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const userName = displayName ? displayName : additionalData.displayName;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName: userName,
        email,
        createdAt
      })
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }

  return userRef;
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export async function authSignInWithGoogle (id_token) {
  const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
  return await firebase.auth().signInWithCredential(credential);
 
}

export default firebase;
