// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX-b7tiGWYP2ueL83nd7-9PlpMe6zwfyk",
  authDomain: "skilotech-64e2a.firebaseapp.com",
  projectId: "skilotech-64e2a",
  storageBucket: "skilotech-64e2a.appspot.com",
  messagingSenderId: "335899738976",
  appId: "1:335899738976:web:3c77bbfb9bf96118131405",
  measurementId: "G-X9NJC5BSRB"
};
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const auth = getAuth(app)
// export default app