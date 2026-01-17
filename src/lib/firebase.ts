import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cấu hình Firebase - Người dùng sẽ tự điền vào đây hoặc dùng env
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = async (email: string, pass: string, name: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(res.user, { displayName: name });
        return res.user;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const loginUser = async (email: string, pass: string) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, pass);
        return res.user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = () => signOut(auth);

