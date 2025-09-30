
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  "projectId": "studio-5346171073-95c1f",
  "appId": "1:967902484921:web:1bb3b7898ae0743e36fe68",
  "apiKey": "AIzaSyAuwTt7h0xqYxpEIPeDDrCYYBrJg-EJRpc",
  "authDomain": "studio-5346171073-95c1f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "967902484921"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
