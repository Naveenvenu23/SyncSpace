import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import ToastContainer from './components/ToastContainer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Overview from './components/Overview';
import KanbanBoard from './components/KanbanBoard';
import TeamChat from './components/TeamChat';
import DocumentEditor from './components/DocumentEditor';
import Settings from './components/Settings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <ThemeProvider>
                <NotificationProvider>
                    <WorkspaceProvider>
                        <AuthProvider>
                            <ToastContainer />
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/dashboard/*"
                                    element={
                                        <ProtectedRoute>
                                            <Dashboard>
                                                <Routes>
                                                    <Route path="overview" element={<Overview />} />
                                                    <Route path="projects" element={<KanbanBoard />} />
                                                    <Route path="documents" element={<DocumentEditor />} />
                                                    <Route path="team" element={<TeamChat />} />
                                                    <Route path="settings" element={<Settings />} />
                                                    <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
                                                </Routes>
                                            </Dashboard>
                                        </ProtectedRoute>
                                    }
                                />

                                {/* Redirect root to dashboard or login */}
                                <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />

                                {/* Catch all - redirect to dashboard */}
                                <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
                            </Routes>
                        </AuthProvider>
                    </WorkspaceProvider>
                </NotificationProvider>
            </ThemeProvider>
        </Router>
    );
}

export default App;
