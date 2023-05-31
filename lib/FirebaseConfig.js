import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  Auth,
} from "firebase/auth";

// Make sure .env is made
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};

let firebaseApp = initializeApp(firebaseConfig);
let auth = getAuth(firebaseApp);
let firestore = getFirestore();
let storage = getStorage(firebaseApp);
let provider = new GoogleAuthProvider().setCustomParameters({
  hd: "ucdavis.edu"
});

// Avoid errors that may occur for SSR
if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
  provider = new GoogleAuthProvider();
  let storage = getStorage(firebaseApp);
}
export { firebaseApp, auth, firestore, provider, storage };