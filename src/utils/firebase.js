// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: {Your Api key},
  authDomain: "webapp-7ee73.firebaseapp.com",
  projectId: "webapp-7ee73",
  storageBucket: "webapp-7ee73.appspot.com",
  messagingSenderId: "997174875242",
  appId: "1:997174875242:web:82fa7fa4597eec6be9a613",
  measurementId: "G-4HCW74S6M3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);
