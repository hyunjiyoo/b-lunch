import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "b-lunch-43bee.firebaseapp.com",
  databaseURL: "https://b-lunch-43bee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "b-lunch-43bee",
  storageBucket: "b-lunch-43bee.appspot.com",
  messagingSenderId: "1071261150474",
  appId: "1:1071261150474:web:415ca518d9a80058a6def3",
  measurementId: "G-Y2EY2YWZ56"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const database = getDatabase(firebase);

export { auth, database };
