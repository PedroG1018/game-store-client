// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

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
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
export const functions = getFunctions(app);
