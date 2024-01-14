import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdORoQOFANpSFxQlTMcwivg5KXLDyfZaA",
    authDomain: "menora-demo.firebaseapp.com",
    projectId: "menora-demo",
    storageBucket: "menora-demo.appspot.com",
    messagingSenderId: "443039988586",
    appId: "1:443039988586:web:30a45e0cd0136c03804313"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);