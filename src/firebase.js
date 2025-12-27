// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// REMOVED: import { getAnalytics } ... (This was causing the crash)

// Your web app's Firebase configuration
const firebaseConfig = {
  // PASTED FROM YOUR SCREENSHOT
  apiKey: "AIzaSyAFubGGja6Py3tFlR2CdtSfGr8S0lZpYlA", 
  authDomain: "smartsell-d37db.firebaseapp.com",
  projectId: "smartsell-d37db",
  storageBucket: "smartsell-d37db.firebasestorage.app",
  messagingSenderId: "979910508934",
  appId: "1:979910508934:web:bc0b1fc516043c9deb2c07",
  measurementId: "G-XDF9C988EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// REMOVED: const analytics = getAnalytics(app);

// Export the services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;