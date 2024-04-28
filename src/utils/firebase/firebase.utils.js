import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from "firebase/auth";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,

} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAX4Nmd4jgO8QNCHybHx5Ui9m7igf_6cdI",
    authDomain: "crwn-clothing-1a8ff.firebaseapp.com",
    projectId: "crwn-clothing-1a8ff",
    storageBucket: "crwn-clothing-1a8ff.appspot.com",
    messagingSenderId: "389140129111",
    appId: "1:389140129111:web:afe1fddc1253db2fdc0a12"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    // if user data doesn't exists in the database
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date(); 

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }
        catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}