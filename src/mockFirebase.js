// This file mocks the Firebase Auth API for development/demo purposes
// It allows the app to function without valid Firebase credentials

const MOCK_DELAY = 800; // Simulate network delay

// Helper to simulate async operations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const auth = {
    currentUser: null
};

export const createUserWithEmailAndPassword = async (authInstance, email, password) => {
    await delay(MOCK_DELAY);

    // Basic validation simulation
    if (email.includes('error')) {
        const error = new Error('Simulated error');
        error.code = 'auth/invalid-email';
        throw error;
    }

    const user = {
        uid: 'mock-user-' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: email.split('@')[0],
        emailVerified: false,
        isAnonymous: false,
        metadata: {
            creationTime: new Date().toISOString(),
            lastSignInTime: new Date().toISOString()
        }
    };

    authInstance.currentUser = user;
    localStorage.setItem('syncspace_user', JSON.stringify(user));

    // Trigger auth state change (simulated)
    if (window.mockAuthStateObserver) {
        window.mockAuthStateObserver(user);
    }

    return { user };
};

export const signInWithEmailAndPassword = async (authInstance, email, password) => {
    await delay(MOCK_DELAY);

    if (password === 'wrong') {
        const error = new Error('Wrong password');
        error.code = 'auth/wrong-password';
        throw error;
    }

    const user = {
        uid: 'mock-user-123',
        email: email,
        displayName: email.split('@')[0],
        emailVerified: true,
        metadata: {
            creationTime: new Date().toISOString(),
            lastSignInTime: new Date().toISOString()
        }
    };

    authInstance.currentUser = user;
    localStorage.setItem('syncspace_user', JSON.stringify(user));

    if (window.mockAuthStateObserver) {
        window.mockAuthStateObserver(user);
    }

    return { user };
};

export const signOut = async (authInstance) => {
    await delay(MOCK_DELAY / 2);
    authInstance.currentUser = null;
    localStorage.removeItem('syncspace_user');

    if (window.mockAuthStateObserver) {
        window.mockAuthStateObserver(null);
    }
};

export const onAuthStateChanged = (authInstance, callback) => {
    window.mockAuthStateObserver = callback;

    // Check for persisted session
    const savedUser = localStorage.getItem('syncspace_user');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            authInstance.currentUser = user;
            callback(user);
        } catch (e) {
            callback(null);
        }
    } else {
        callback(null);
    }

    // Return unsubscribe function
    return () => {
        window.mockAuthStateObserver = null;
    };
};
