// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA05MoFceE5gMNhJuJto1b7N8ZVs7DvKn8",
  authDomain: "netflix-clone01-8bf4d.firebaseapp.com",
  projectId: "netflix-clone01-8bf4d",
  storageBucket: "netflix-clone01-8bf4d.appspot.com",
  messagingSenderId: "372457851090",
  appId: "1:372457851090:web:496c868fb454ef37fe850b",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
