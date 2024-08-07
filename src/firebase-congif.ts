// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7mE4MudKLb9T41nC6kBevgwAzfjEKJ8g",
  authDomain: "fir-chatapp-89f6e.firebaseapp.com",
  projectId: "fir-chatapp-89f6e",
  storageBucket: "fir-chatapp-89f6e.appspot.com",
  messagingSenderId: "104087301187",
  appId: "1:104087301187:web:b5334b1a09b022bbedb8f6",
  measurementId: "G-PL2LEJF9Q1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider =new GoogleAuthProvider();
export const db=getFirestore(app);