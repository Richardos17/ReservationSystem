import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyB1ZrnL8jXrYm4zF9EHoUCzVV7gfFGnCe8",
    authDomain: "hackathon-247d4.firebaseapp.com",
    projectId: "hackathon-247d4",
    storageBucket: "hackathon-247d4.firebasestorage.app",
    messagingSenderId: "98954980071",
    appId: "1:98954980071:web:8896b5d558aa51d6679042",
    measurementId: "G-MH7DN7BCRF"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(firebaseApp);

export { db, collection, getDocs };
