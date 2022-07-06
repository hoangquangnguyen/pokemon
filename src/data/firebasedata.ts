// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxzP_MV9whBjFDsBfVRzj1t5TEK3pVBAk",
  authDomain: "pokemonmem-55627.firebaseapp.com",
  projectId: "pokemonmem-55627",
  storageBucket: "pokemonmem-55627.appspot.com",
  messagingSenderId: "714661851141",
  appId: "1:714661851141:web:4c9862d7c79eaf12fc6c6c",
  measurementId: "G-R1TK499C3Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//to get data from Collection
const projectFirestore = getFirestore(app);

//to get data from Auth
const projectAuth = firebase.auth();
const timeServer = serverTimestamp();

export { projectFirestore, projectAuth, timeServer };
