import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAg5UA7MA0JbBCEoFSKwsX3dyiGcBy1HtM",
    authDomain: "fineweb-99acb.firebaseapp.com",
    projectId: "fineweb-99acb",
    storageBucket: "fineweb-99acb.appspot.com",
    messagingSenderId: "1098122257119",
    appId: "1:1098122257119:web:68517051ec101ef7d3bf6a",
    measurementId: "G-3E8QW2CRWS"
}

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage()

const provider = new firebase.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { photoURL, email, displayName } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};