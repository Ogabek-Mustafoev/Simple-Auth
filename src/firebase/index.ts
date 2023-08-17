import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAH6PG_YgN2ZQHY2WdHZ0lfI8ALAsgXxo0",
  authDomain: "zustand-project.firebaseapp.com",
  projectId: "zustand-project",
  storageBucket: "zustand-project.appspot.com",
  messagingSenderId: "115155218950",
  appId: "1:115155218950:web:bd0df7f06de799e7258987",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export { db, auth };
export default app;
