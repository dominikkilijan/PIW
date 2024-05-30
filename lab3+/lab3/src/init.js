// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCix3q8pGUUKxNblib38XDj7Et_6vwsWmg",
  authDomain: "hotel-piw.firebaseapp.com",
  projectId: "hotel-piw",
  storageBucket: "hotel-piw.appspot.com",
  messagingSenderId: "190475471847",
  appId: "1:190475471847:web:3d61ccfbba2639766f4b42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db };