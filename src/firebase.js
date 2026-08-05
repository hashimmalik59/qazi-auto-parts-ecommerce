import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-YMSfe2HT614bO5NleTm8Qz4PTsQZ_Ec",
  authDomain: "authentication-c478b.firebaseapp.com",
  projectId: "authentication-c478b",
  storageBucket: "authentication-c478b.firebasestorage.app",
  messagingSenderId: "5802551883",
  appId: "1:5802551883:web:df2730631b5d757e1ffbce",
};

// ✅ Yeh line add karna mat bhoolna!
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
