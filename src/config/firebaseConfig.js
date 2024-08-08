// Import the functions you need from the SDKs you need
import { data } from "autoprefixer";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN_OD0WAbb678jJb6dOLmx4FLMW-CzIRk",
  authDomain: "swiftship-8528f.firebaseapp.com",
  projectId: "swiftship-8528f",
  storageBucket: "swiftship-8528f.appspot.com",
  messagingSenderId: "156833475784",
  appId: "1:156833475784:web:2b201ac132c1de2f12c9fd",
  measurementId: "G-8FKBG913WV",
  databaseURL: "https://swiftship-8528f-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;