// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics"; // Import Analytics

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_tNzGa4mOKuVysbFQATj-xVY9t94iHvA",
    authDomain: "maisha-pesa-efc4c.firebaseapp.com",
    projectId: "maisha-pesa-efc4c",
    storageBucket: "maisha-pesa-efc4c.appspot.com",
    messagingSenderId: "401577705770",
    appId: "1:401577705770:web:0c43711537082af5b25e53",
    measurementId: "G-2JCZ23W55Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore
getAnalytics(app); // Initialize Analytics

// Export the auth and db objects
export { auth, db };