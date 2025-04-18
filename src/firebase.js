import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiJKesKloA84twzd2AlwNz5xN38jdYH-k",
  authDomain: "local-lense.firebaseapp.com",
  projectId: "local-lense",
  storageBucket: "local-lense.appspot.com",
  messagingSenderId: "658167720640",
  appId: "1:658167720640:web:318c77a279d5f930cfdb25"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence); 
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
