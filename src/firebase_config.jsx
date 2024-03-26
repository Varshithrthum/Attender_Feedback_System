//import firebase from "firebase/compat";
// import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyAcBTrA_J9B9B6mBbJ4NR8ET7QiuuhSG3M",
  authDomain: "attender-feedback-80475.firebaseapp.com",
  projectId: "attender-feedback-80475",
  storageBucket: "attender-feedback-80475.appspot.com",
  messagingSenderId: "625416719120",
  appId: "1:625416719120:web:cf14e28962fae35a5f3395",
  measurementId: "G-8Z6PN9TKD6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//initialize store
export const db = getFirestore(app);

export const auth = getAuth();
export default app;
