import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = firebase.auth();
export const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth
        .signInWithPopup(googleProvider)
        .then(() => console.log(`Sucessfully logged in!`))
        .catch(err => console.error(err))
}

export const signOut = () => {
    auth
        .signOut()
        .then(() => console.log(`Sucessfully logged out!`))
        .catch(err => console.error(err));
}