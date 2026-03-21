import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBqhpQ94FF-wm-I6exmIBokToDWMf6lISY",
  authDomain: "healthgenix-fed23.firebaseapp.com",
  projectId: "healthgenix-fed23",
  storageBucket: "healthgenix-fed23.firebasestorage.app",
  messagingSenderId: "614398380743",
  appId: "1:614398380743:web:7e9224cc60a5a4b85c0ce2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };