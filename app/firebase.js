// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACV8k5DJMRw6uA_AJ8Hv2cpoJuslclxvU",
  authDomain: "ai-pantry-tracker-4b500.firebaseapp.com",
  projectId: "ai-pantry-tracker-4b500",
  storageBucket: "ai-pantry-tracker-4b500.appspot.com",
  messagingSenderId: "1031813308600",
  appId: "1:1031813308600:web:4afb785c3f88fe197b544d",
  measurementId: "G-T2KHQCJZK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);