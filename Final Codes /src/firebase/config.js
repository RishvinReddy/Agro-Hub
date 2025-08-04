import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7-a9ewZu-HWBJjLV_Hx9dyxekG0W1R2w",
  authDomain: "agrohub-fc122.firebaseapp.com",
  projectId: "agrohub-fc122",
  storageBucket: "agrohub-fc122.appspot.com",
  messagingSenderId: "710814375486",
  appId: "1:710814375486:web:5fcb98d8dd4326d487b6f",
  measurementId: "G-DNLZG675YS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };