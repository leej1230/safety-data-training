import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Firestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  Auth,
  setPersistence,
  browserSessionPersistence,
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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  hd: "ucdavis.edu",
  prompt: "select_account",
});

/*
// Avoid errors that may occur for SSR
if (typeof window !== "undefined" && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  setPersistence(auth, "none")
  firestore = getFirestore(firebaseApp);
  provider = new GoogleAuthProvider().setCustomParameters({
    hd: "ucdavis.edu"
  });
  storage = getStorage(firebaseApp);
}
*/

export { firebaseApp, auth, firestore, provider, storage };