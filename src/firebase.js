import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Initial Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA5nau6D8wr3xPKautjg9q24CIUYMtHvHU",
    authDomain: "clone-de484.firebaseapp.com",
    projectId: "clone-de484",
    storageBucket: "clone-de484.appspot.com",
    messagingSenderId: "361356649919",
    appId: "1:361356649919:web:8ace907b42fa8c27172d0a",
    measurementId: "G-NE7NKQ1HJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export
export { db, storage, auth };
