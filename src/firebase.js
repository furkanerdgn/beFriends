// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { userHandle } from "./utils";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKs_g1fM8I0TKKby4tvED5iozNCLkddPc",
  authDomain: "instagram-2409b.firebaseapp.com",
  projectId: "instagram-2409b",
  storageBucket: "instagram-2409b.appspot.com",
  messagingSenderId: "997576502113",
  appId: "1:997576502113:web:0e73b942b3eaab1ec1f320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    userHandle(user || false);
  }
);
export const login = async(email, password) => {
    try {
        const response =  await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        toast.error(error.code);
    }
}

;
