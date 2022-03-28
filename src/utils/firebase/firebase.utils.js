// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4YSXq406NBAjnPEgUE5DObM4rwgBg1xE",
  authDomain: "ecommerce-20c31.firebaseapp.com",
  projectId: "ecommerce-20c31",
  storageBucket: "ecommerce-20c31.appspot.com",
  messagingSenderId: "885330413113",
  appId: "1:885330413113:web:53923efb4531a352692fe8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const SignInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumnetFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt  = new Date();

    try{
        await setDoc(userDocRef,{
            displayName,
            email,
            createdAt
        });
    }catch(error){
        console.log('error creating the user',error.message);
    }
  }
};
