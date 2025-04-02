// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHDzi4oJtjuk7bTKtLrKH_9aPAwCfqh8I",
    authDomain: "just-agriculture.firebaseapp.com",
    databaseURL: "https://just-agriculture-default-rtdb.firebaseio.com",
    projectId: "just-agriculture",
    storageBucket: "just-agriculture.firebasestorage.app",
    messagingSenderId: "860244581607",
    appId: "1:860244581607:web:fc708a47d357742af89642"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database }; 