// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


import {
  initializeAuth, getReactNativePersistence, browserLocalPersistence,
  browserSessionPersistence,
  indexedDBLocalPersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';


// Configurações do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWq4r1qCc_KbXZfaSA17hD7c5MzYG6nLo",
  authDomain: "ascendya-d57e7.firebaseapp.com",
  projectId: "ascendya-d57e7",
  storageBucket: "ascendya-d57e7.appspot.com",
  messagingSenderId: "319242394939",
  appId: "1:319242394939:web:e1513496e00a366f8eab1e",
  measurementId: "G-VJY5NV5J60"
};

// Inicializa o Firebase App

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


let auth;

if (Platform.OS === 'web') {
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence
  });
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
}

export const db = getFirestore(app);

export { auth, getFirestore, app };

