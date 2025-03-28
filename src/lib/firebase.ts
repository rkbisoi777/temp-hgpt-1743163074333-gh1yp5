import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnIst8BlbhhxVKr4sRmxVuiSlRPEpR1aA",
    authDomain: "housegpt-f64d3.firebaseapp.com",
    projectId: "housegpt-f64d3",
    storageBucket: "housegpt-f64d3.firebasestorage.app",
    messagingSenderId: "161563611140",
    appId: "1:161563611140:web:92b68b2d6affc99d72a551",
    measurementId: "G-S8VNCC9YPQ"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
