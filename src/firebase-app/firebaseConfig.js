import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApX9a27Mcbq4Vr2k-sxdKV2s2-IVuczZk",
  authDomain: "monkeyblogdb-69999.firebaseapp.com",
  projectId: "monkeyblogdb-69999",
  storageBucket: "monkeyblogdb-69999.firebasestorage.app",
  messagingSenderId: "120936182387",
  appId: "1:120936182387:web:4bcada5702561fca0c3006",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
