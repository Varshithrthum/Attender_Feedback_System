//import firebase from "firebase/compat";
//import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
require("firebase/auth");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBTrA_J9B9B6mBbJ4NR8ET7QiuuhSG3M",
  authDomain: "attender-feedback-80475.firebaseapp.com",
  projectId: "attender-feedback-80475",
  storageBucket: "attender-feedback-80475.appspot.com",
  messagingSenderId: "625416719120",
  appId: "1:625416719120:web:cf14e28962fae35a5f3395",
  measurementId: "G-8Z6PN9TKD6",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const firestore = getFirestore(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
export const db = getFirestore(app);