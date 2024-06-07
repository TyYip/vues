
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkq7CHIDom6N61QGLhjEUHzvpe8rCOv3U",
  authDomain: "tynricknvin.firebaseapp.com",
  databaseURL: "https://tynricknvin-default-rtdb.firebaseio.com",
  projectId: "tynricknvin",
  storageBucket: "tynricknvin.appspot.com",
  messagingSenderId: "384631186929",
  appId: "1:384631186929:web:db7752f18e88ed963d9050",
  measurementId: "G-9DQ4DW2WSX"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };