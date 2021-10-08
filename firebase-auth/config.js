// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import {API_KEY} from '../secrets'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "mole-tracks.firebaseapp.com",
  projectId: "mole-tracks",
  storageBucket: "mole-tracks.appspot.com",
  messagingSenderId: "644137951927",
  appId: "1:644137951927:web:51f1736da4f9595e1f6332",
  measurementId: "G-VKC9MBBDZ4",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = app.auth();
