# Firebase Authentication Setup Guide for SyncSpace

## 🚧 Demo Mode (Mock Authentication)

**Currently, the app is running in Demo Mode.**
This means it uses a simulated authentication system so you can test the UI and flow without needing valid Firebase credentials.

### How to Switch to Real Firebase
1. Follow the "Firebase Setup Instructions" below to get your API keys.
2. Open `src/context/AuthContext.jsx`.
3. Comment out the "Mock Imports" section.
4. Uncomment the real Firebase imports section.

## 🔐 Firebase Setup Instructions

Follow these steps to set up Firebase Authentication for your SyncSpace app:

### Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard to create your project

### Step 2: Enable Email/Password Authentication

1. In the Firebase Console, navigate to **Authentication** from the left sidebar
2. Click on the **Sign-in method** tab
3. Find **Email/Password** in the list of providers
4. Click on it and toggle the **Enable** switch
5. Click **Save**

### Step 3: Register Your Web App

1. In the Firebase Console, go to **Project settings** (gear icon in the top left)
2. Scroll down to **Your apps** section
3. Click on the **Web** icon (`</>`) to add a web app
4. Give your app a nickname (e.g., "SyncSpace Web")
5. Click **Register app**

### Step 4: Get Your Firebase Configuration

1. After registering the app, you'll see a **Firebase SDK snippet**
2. Select **Config** (not npm)
3. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Step 5: Configure Your Environment Variables

1. Create a `.env` file in the root of your project (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your Firebase config values:
   ```
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Save the file

### Step 6: Run Your App

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown (usually `http://localhost:5173`)

## 🎯 Features Implemented

### ✅ Authentication Pages
- **Login Page** (`/login`) - Email/password login with validation
- **Signup Page** (`/signup`) - User registration with password confirmation

### ✅ Auth Context
- Centralized authentication state management
- Helper functions: `login()`, `signup()`, `logout()`
- Current user state tracking
- Automatic authentication state persistence

### ✅ Protected Routes
- Dashboard and all sub-routes require authentication
- Automatic redirect to login for unauthenticated users
- Redirect to dashboard after successful login/signup

### ✅ UI/UX Features
- Tailwind CSS styling with dark mode support
- Responsive design for all screen sizes
- Beautiful glassmorphism effects
- Smooth animations and transitions
- Clear error messages with Firebase error handling
- Success notifications
- Loading states during authentication

## 📱 App Routes

- `/login` - Login page (public)
- `/signup` - Signup page (public)
- `/dashboard/overview` - Dashboard overview (protected)
- `/dashboard/projects` - Projects page (protected)
- `/dashboard/documents` - Documents page (protected)
- `/dashboard/team` - Team page (protected)
- `/dashboard/settings` - Settings page (protected)

## 🔒 Security Notes

- The `.env` file is already in `.gitignore` to prevent exposing credentials
- Never commit your Firebase credentials to version control
- The app uses Firebase Authentication which handles password hashing and security
- All protected routes require authentication

## 🎨 Customization

The app includes:
- Dark mode toggle in the dashboard
- Theme persistence in localStorage
- Custom animations and transitions
- Responsive sidebar navigation
- User profile with email display

## 🐛 Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"
- Make sure you've created a `.env` file with your Firebase credentials
- Restart your dev server after creating/modifying the `.env` file

### "Firebase: Error (auth/invalid-api-key)"
- Double-check that your API key in `.env` matches the one from Firebase Console
- Make sure there are no extra spaces in your `.env` file

### "Email/password accounts are not enabled"
- Go to Firebase Console > Authentication > Sign-in method
- Enable Email/Password provider

## 📚 Learn More

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

Enjoy using SyncSpace! 🚀
