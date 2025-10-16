// src/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhUJC9ZAHbnmy0nCFsbbzi6qFsJfzGalM",
    authDomain: "blog-agil.firebaseapp.com",
    projectId: "blog-agil",
    storageBucket: "blog-agil.appspot.com", 
    messagingSenderId: "249126060509",
    appId: "1:249126060509:web:f76e61a0ab25c0862cb634",
    measurementId: "G-FPW8VCR7QK"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, storage, analytics };
