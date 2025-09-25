import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf236I9DhPUlvdXgnDSp95kUC8si4b6Z0",
  authDomain: "chat-13065.firebaseapp.com",
  projectId: "chat-13065",
  storageBucket: "chat-13065.firebasestorage.app",
  messagingSenderId: "721170188540",
  appId: "1:721170188540:web:b205c913f0e7be98d1ef79",
  measurementId: "G-XBTPR06614"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvide = new GoogleAuthProvider()