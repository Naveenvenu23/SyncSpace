import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClockIcon,
  CheckCircleIcon,
  UserGroupIcon,
  FolderIcon,
  ArrowRightIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { ProjectProgressChart, TaskDistributionChart } from './DashboardCharts';
import { useWorkspace } from '../context/WorkspaceContext';
import WorkspaceCard from './WorkspaceCard';
import WorkspaceCreateModal from './WorkspaceCreateModal';
import InviteModal from './InviteModal';

const initialStats = [
  { name: 'Total Projects', value: 12, change: '+2', changeType: 'positive', icon: FolderIcon, color: 'bg-blue-500' },
  { name: 'Pending Tasks', value: 24, change: '-5', changeType: 'positive', icon: ClockIcon, color: 'bg-amber-500' },
  { name: 'Completed Tasks', value: 148, change: '+18', changeType: 'positive', icon: CheckCircleIcon, color: 'bg-emerald-500' },
  { name: 'Active Users', value: 8, change: '0', changeType: 'neutral', icon: UserGroupIcon, color: 'bg-violet-500' },
];

const kanbanPreview = {
  todo: 12,
  inProgress: 8,
  done: 16
};

const recentActivities = [
  { id: 1, user: 'Sarah Wilson', action: 'commented on', target: 'Homepage Redesign', time: '2 mins ago', avatar: 'S' },
  { id: 2, user: 'Mike Johnson', action: 'uploaded', target: 'Project_Specs.pdf', time: '15 mins ago', avatar: 'M' },
  { id: 3, user: 'Anna Davis', action: 'completed', target: 'User Authentication', time: '1 hour ago', avatar: 'A' },
  { id: 4, user: 'James Miller', action: 'created', target: 'Q4 Marketing Plan', time: '3 hours ago', avatar: 'J' },
];

const Overview = () => {
  const [stats] = useState(initialStats);
  const { workspaces, switchWorkspace } = useWorkspace();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  const handleInvite = (workspaceId) => {
    setSelectedWorkspaceId(workspaceId);
    setIsInviteModalOpen(true);
  };

  const handleSettings = (workspaceId) => {
    // Navigate to settings or show modal
    console.log('Settings for', workspaceId);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
            Download Report
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 dark:shadow-none flex items-center"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Create Workspace
          </button>
        </div>
      </div>

      {/* Workspaces Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Workspaces</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onSwitch={switchWorkspace}
              onInvite={handleInvite}
              onSettings={handleSettings}
            />
          ))}

          {/* Create New Card (Inline) */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group h-full min-h-[180px]"
          >
            <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 flex items-center justify-center transition-colors">
              <PlusIcon className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </div>
            <span className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">Create New Workspace</span>
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10 dark:bg-opacity-20`}>
                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
                  'text-gray-500 dark:text-gray-400'
                }`}>
                {stat.change}
              </span>
              <span className="text-gray-400 dark:text-gray-500 ml-2">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Charts) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Project Progress Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Progress</h3>
              <select className="text-sm border-gray-300 dark:border-gray-600 bg-transparent text-gray-500 dark:text-gray-400 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <ProjectProgressChart />
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <Link to="/dashboard/notifications" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium">
                View All
              </Link>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user} <span className="font-normal text-gray-500 dark:text-gray-400">{activity.action}</span> <span className="font-medium text-gray-900 dark:text-white">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (Side Widgets) */}
        <div className="space-y-8">

          {/* Task Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Distribution</h3>
            <TaskDistributionChart />
          </div>

          {/* Kanban Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Board Status</h3>
              <Link to="/dashboard/projects" className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-1 rounded-full transition-colors">
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">To Do</span>
                </div>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{kanbanPreview.todo}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Progress</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{kanbanPreview.inProgress}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Done</span>
                </div>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{kanbanPreview.done}</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/dashboard/projects" className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center gap-2 group">
              <FolderIcon className="w-8 h-8 group-hover:animate-bounce" />
              <span className="text-sm font-medium">Projects</span>
            </Link>
            <Link to="/dashboard/documents" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2">
              <DocumentTextIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Docs</span>
            </Link>
            <Link to="/dashboard/team" className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2">
              <ChatBubbleLeftRightIcon className="w-8 h-8" />
              <span className="text-sm font-medium">Chat</span>
            </Link>
            <button className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center gap-2">
              <EllipsisHorizontalIcon className="w-8 h-8" />
              <span className="text-sm font-medium">More</span>
            </button>
          </div>

        </div>
      </div>

      {/* Modals */}
      <WorkspaceCreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        workspaceId={selectedWorkspaceId}
      />
    </div>
  );
};

export default Overview;
