// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBECZ0MkXb6MAQVgx6XP_jH542GEDpid_M",
  authDomain: "social-network-js.firebaseapp.com",
  databaseURL: "https://social-network-js.firebaseio.com",
  projectId: "social-network-js",
  storageBucket: "social-network-js.appspot.com",
  messagingSenderId: "640569497422",
  appId: "1:640569497422:web:ae448c5f633dae0e63f01f",
  measurementId: "G-K7CJ3C2D49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export {db};