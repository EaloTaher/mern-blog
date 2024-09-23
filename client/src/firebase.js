// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e472c.firebaseapp.com",
  projectId: "mern-blog-e472c",
  storageBucket: "mern-blog-e472c.appspot.com",
  messagingSenderId: "655784475906",
  appId: "1:655784475906:web:0f6b6364818c6ccc86561b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
