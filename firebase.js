import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA02qQLG8KEayuFUaoRh-srkSYX8GBtqkg",
  authDomain: "angkasv2.firebaseapp.com",
  projectId: "angkasv2",
  storageBucket: "angkasv2.appspot.com",
  messagingSenderId: "167136779991",
  appId: "1:167136779991:web:f6e327297eac3cc9bd1a92",
  measurementId: "G-0GJ2DSRDPN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
