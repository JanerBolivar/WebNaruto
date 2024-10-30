import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDl_a9z03trgy_b8mk3BpOyix7lRsp62_s",
  authDomain: "empresa-isp.firebaseapp.com",
  databaseURL: "https://empresa-isp-default-rtdb.firebaseio.com",
  projectId: "empresa-isp",
  storageBucket: "empresa-isp.appspot.com",
  messagingSenderId: "727396976221",
  appId: "1:727396976221:web:30cc4d59164eaefba5afb4",
  measurementId: "G-RNTT5B7CTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);