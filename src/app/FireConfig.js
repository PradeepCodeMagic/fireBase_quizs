// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyWN7oFSUr0Os4XrL-_inp4qWw1alqtqg",
  authDomain: "quiz-bdfb0.firebaseapp.com",
  projectId: "quiz-bdfb0",
  storageBucket: "quiz-bdfb0.appspot.com",
  messagingSenderId: "409620664197",
  appId: "1:409620664197:web:1ce4837629a6f4d3407eec",
  measurementId: "G-6FWN6P2X8V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);