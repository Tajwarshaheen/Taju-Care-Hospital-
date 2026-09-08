import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "diesel-tempo-wn96h",
  appId: "1:850723249909:web:157868bf974b2fc1ebefbc",
  apiKey: "AIzaSyAIBJVJQAwJ-ckTef5QoLyYHkZPnMQ1deg",
  authDomain: "diesel-tempo-wn96h.firebaseapp.com",
  storageBucket: "diesel-tempo-wn96h.firebasestorage.app",
  messagingSenderId: "850723249909"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
