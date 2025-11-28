import { createContext, useContext, useEffect, useState } from 'react';

// Real Firebase Imports
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Signup function
    const signup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
