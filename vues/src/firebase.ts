// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY as string,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN as string,
  databaseURL: process.env.VUE_APP_DATABASE_URL as string,
  projectId: process.env.VUE_APP_PROJECT_ID as string,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET as string,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID as string,
  appId: process.env.VUE_APP_APP_ID as string,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
