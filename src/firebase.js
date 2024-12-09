// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc6X6JiAbBdS_-8kTV39MAHfX8C7xG3tY",
  authDomain: "events-platform-9a7d6.firebaseapp.com",
  projectId: "events-platform-9a7d6",
  storageBucket: "events-platform-9a7d6.firebasestorage.app",
  messagingSenderId: "354123669066",
  appId: "1:354123669066:web:d2b270ccf1dfee91f590b3",
  measurementId: "G-T45KF4Z3XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, firebaseConfig };
