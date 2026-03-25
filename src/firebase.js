// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Twoja konfiguracja Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6pJ3MwdEz3fr2VQnC5V1iM5rJHbyYP1c",
  authDomain: "rajd-rowerowy.firebaseapp.com",
  databaseURL: "https://rajd-rowerowy-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "rajd-rowerowy",
  storageBucket: "rajd-rowerowy.appspot.com",
  messagingSenderId: "1082210518032",
  appId: "1:1082210518032:web:00592aa889feefd26c3695"
};

// Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);

// Eksporty: baza danych i auth
export const db = getDatabase(app);
export const auth = getAuth(app);