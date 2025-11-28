import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();

    // If there's no current user, redirect to login
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // If user is authenticated, render the children (protected component)
    return children;
};

export default ProtectedRoute;
