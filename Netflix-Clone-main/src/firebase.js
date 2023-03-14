import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyDAjBD4Ru9si6Y7vDqRQpebAmgxPZHj1pY",
    authDomain: "netflix-clone-yt-2fb71.firebaseapp.com",
    projectId: "netflix-clone-yt-2fb71",
    storageBucket: "netflix-clone-yt-2fb71.appspot.com",
    messagingSenderId: "547964548123",
    appId: "1:547964548123:web:a2bb40764ca067625a34be"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { app, db, auth };