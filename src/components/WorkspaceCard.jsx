import { UserGroupIcon, ClockIcon, Cog6ToothIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const WorkspaceCard = ({ workspace, onInvite, onSwitch, onSettings }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {workspace.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                        {workspace.description}
                    </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${workspace.role === 'Admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                    {workspace.role}
                </span>
            </div>

            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {workspace.members} members
                </div>
                <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {workspace.lastActive}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <button
                    onClick={() => onSwitch(workspace.id)}
                    className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                    Open
                </button>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onInvite(workspace.id)}
                        className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-full transition-colors"
                        title="Invite Members"
                    >
                        <UserPlusIcon className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onSettings(workspace.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-full transition-colors"
                        title="Settings"
                    >
                        <Cog6ToothIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceCard;
