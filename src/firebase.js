import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAzMdzKcrBIpBnLvQq7RSX3X4n4cQb_c1c",
    authDomain: "syncspace-9666b.firebaseapp.com",
    projectId: "syncspace-9666b",
    storageBucket: "syncspace-9666b.firebasestorage.app",
    messagingSenderId: "772729027070",
    appId: "1:772729027070:web:ba9a0bfd1b2cd2253528af",
    measurementId: "G-ZY6DHRF11N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;
