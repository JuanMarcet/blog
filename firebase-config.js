// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhUJC9ZAHbnmy0nCFsbbzi6qFsJfzGalM",
    authDomain: "blog-agil.firebaseapp.com",
    projectId: "blog-agil",
    storageBucket: "blog-agil.firebasestorage.app",
    messagingSenderId: "249126060509",
    appId: "1:249126060509:web:f76e61a0ab25c0862cb634",
    measurementId: "G-FPW8VCR7QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);