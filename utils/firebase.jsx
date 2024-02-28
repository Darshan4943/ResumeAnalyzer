// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMtPoWinQJjTDuwTwtI93PhrDVkpMr6co",
  authDomain: "skilotech-5b286.firebaseapp.com",
  projectId: "skilotech-5b286",
  storageBucket: "skilotech-5b286.appspot.com",
  messagingSenderId: "313153806986",
  appId: "1:313153806986:web:18f8c9a9baaa1082644373",
  measurementId: "G-YRSQVCKEL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export default app