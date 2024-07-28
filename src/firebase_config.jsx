//import firebase from "firebase/compat";
//import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
require("firebase/auth");

// Firebase configuration
const firebaseConfig = {
  apiKey: "REDACTED_API_KEY",  // removed sensitive info
  authDomain: "REDACTED_AUTH_DOMAIN",  // removed sensitive info
  projectId: "REDACTED_PROJECT_ID",  // removed sensitive info
  storageBucket: "REDACTED_STORAGE_BUCKET",  // removed sensitive info
  messagingSenderId: "REDACTED_MESSAGING_SENDER_ID",  // removed sensitive info
  appId: "REDACTED_APP_ID",  // removed sensitive info
  measurementId: "REDACTED_MEASUREMENT_ID",  // removed sensitive info
}


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
