// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "testmain-d5e76.firebaseapp.com",
  projectId: "testmain-d5e76",
  storageBucket: "testmain-d5e76.appspot.com",
  messagingSenderId: "469509685145",
  appId: "1:469509685145:web:e13142ad7f3900eb79dd08",
  measurementId: "G-SD7QR1SG8P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)