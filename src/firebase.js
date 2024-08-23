import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAUXJvVx5OPs0KPtG8z7t7vF8ts9hF3Jls",
  authDomain: "jakin-flowboardapp.firebaseapp.com",
  projectId: "jakin-flowboardapp",
  storageBucket: "jakin-flowboardapp.appspot.com",
  messagingSenderId: "162479264844",
  appId: "1:162479264844:web:ba6260d4ca6d9041f350e9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
}

export { auth, db, fbFunctions };
