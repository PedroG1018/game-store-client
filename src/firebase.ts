// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "game-store-api.firebaseapp.com",
  projectId: "game-store-api",
  storageBucket: "game-store-api.appspot.com",
  messagingSenderId: "518060805757",
  appId: "1:518060805757:web:90ee2887d4801de86deb14",
  measurementId: "G-G62YRPQQQX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);