import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE8VWoSVD5cK1oxhGwrxAdCMESAAW7o50",
  authDomain: "restaurant-app-72eca.firebaseapp.com",
  databaseURL: "https://restaurant-app-72eca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "restaurant-app-72eca",
  storageBucket: "restaurant-app-72eca.appspot.com",
  messagingSenderId: "859776893045",
  appId: "1:859776893045:web:6d147175e752bedb08783c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };

