// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQHTkKXT1QOf_Xg50xiUUpwOsuYf7hYuI",
  authDomain: "mysports-store.firebaseapp.com",
  projectId: "mysports-store",
  storageBucket: "mysports-store.appspot.com",
  messagingSenderId: "380865734500",
  appId: "1:380865734500:web:7335f529914ee8d56cfc71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);