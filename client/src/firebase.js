// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estate-14cbf.firebaseapp.com",
  projectId: "mern-real-estate-14cbf",
  storageBucket: "mern-real-estate-14cbf.appspot.com",
  messagingSenderId: "685338773862",
  appId: "1:685338773862:web:4252249a61e7896ec720a7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);