import { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const WorkspaceContext = createContext();

const initialWorkspaces = [
    {
        id: 'ws-1',
        name: 'SyncSpace HQ',
        description: 'Main workspace for the product team',
        members: 12,
        role: 'Admin',
        active: true,
        lastActive: 'Just now'
    },
    {
        id: 'ws-2',
        name: 'Marketing Campaign',
        description: 'Q4 Marketing initiatives and assets',
        members: 5,
        role: 'Member',
        active: false,
        lastActive: '2 hours ago'
    }
];

export const WorkspaceProvider = ({ children }) => {
    const [workspaces, setWorkspaces] = useState(initialWorkspaces);
    const [currentWorkspace, setCurrentWorkspace] = useState(initialWorkspaces[0]);
    const { showToast } = useNotification();

    const createWorkspace = (data) => {
        const newWorkspace = {
            id: `ws-${Date.now()}`,
            name: data.name,
            description: data.description,
            members: 1, // Creator
            role: 'Admin',
            active: true,
            lastActive: 'Just now',
            teamSize: data.teamSize
        };

        setWorkspaces(prev => [newWorkspace, ...prev]);
        setCurrentWorkspace(newWorkspace);
        showToast('success', 'Workspace Created', `${newWorkspace.name} is ready!`);
    };

    const switchWorkspace = (workspaceId) => {
        const workspace = workspaces.find(w => w.id === workspaceId);
        if (workspace) {
            setCurrentWorkspace(workspace);
            // In a real app, we would fetch workspace data here
            showToast('info', 'Workspace Switched', `Now working in ${workspace.name}`);
        }
    };

    const inviteMember = (workspaceId, email, role) => {
        // Mock invitation
        showToast('success', 'Invite Sent', `Invitation sent to ${email} as ${role}`);
    };

    return (
        <WorkspaceContext.Provider value={{
            workspaces,
            currentWorkspace,
            createWorkspace,
            switchWorkspace,
            inviteMember
        }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspace = () => {
    const context = useContext(WorkspaceContext);
    if (!context) {
        throw new Error('useWorkspace must be used within a WorkspaceProvider');
    }
    return context;
};
