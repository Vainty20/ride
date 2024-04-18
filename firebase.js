import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnx9Xal0ySxex6HqD5c0SaPqEpuftLTo0",
  authDomain: "ridemoto-5140d.firebaseapp.com",
  projectId: "ridemoto-5140d",
  storageBucket: "ridemoto-5140d.appspot.com",
  messagingSenderId: "811027902245",
  appId: "1:811027902245:web:52c8e3a5c3cd5feefff4cc",
  measurementId: "9H5ZS0MR10"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
