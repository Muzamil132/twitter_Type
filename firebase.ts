import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqWUETbIRQtGWFhVP7aVyfZC1ba9CqWhg",
    authDomain: "twitter-f1ffd.firebaseapp.com",
    projectId: "twitter-f1ffd",
    storageBucket: "twitter-f1ffd.appspot.com",
    messagingSenderId: "959825926246",
    appId: "1:959825926246:web:4d9c719c2d75a5043635a7",
    measurementId: "G-4VC5DZL6SX"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
export { app, db, storage };