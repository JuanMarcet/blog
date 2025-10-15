// src/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBhUJC9ZAHbnmy0nCFsbbzi6qFsJfzGalM",
    authDomain: "blog-agil.firebaseapp.com",
    projectId: "blog-agil",
    storageBucket: "blog-agil.firebasestorage.app",
    messagingSenderId: "249126060509",
    appId: "1:249126060509:web:f76e61a0ab25c0862cb634",
    measurementId: "G-FPW8VCR7QK"
};

// Inicializa Firebase y los servicios que usarás
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Exporta lo que sí existe
export { app, db, analytics };
