import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYIsSGO9bxtAF74DzQSJAsuQ28uEvVO8I",
    authDomain: "maisha-app-84afa.firebaseapp.com",
    projectId: "maisha-app-84afa",
    storageBucket: "maisha-app-84afa.firebasestorage.app",
    messagingSenderId: "810211987604",
    appId: "1:810211987604:web:5906b6be0b90e10aa0e481",
    measurementId: "G-903DK14GC0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };