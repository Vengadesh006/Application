import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {doc} from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU0ls6zxbvglhyWxwnrItkU7-rbzfCDdk",
  authDomain: "product-e52a2.firebaseapp.com",
  projectId: "product-e52a2",
  storageBucket: "product-e52a2.firebasestorage.app",
  messagingSenderId: "1014443295218",
  appId: "1:1014443295218:web:0b0209aa50ebdb567f2b6b",
  measurementId: "G-1JTFX8XPHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

