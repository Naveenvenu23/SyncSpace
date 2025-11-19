import { useState } from 'react';

const initialStats = [
  { name: 'Total Projects', value: 0, change: '0', changeType: 'neutral' },
  { name: 'Active Tasks', value: 0, change: '0', changeType: 'neutral' },
  { name: 'Team Members', value: 0, change: '0', changeType: 'neutral' },
  { name: 'Upcoming Deadlines', value: 0, change: '0', changeType: 'neutral' },
];

const Overview = () => {
  const [stats, setStats] = useState(initialStats);
  const [recentActivities, setRecentActivities] = useState([]);
  const [deadlines, setDeadlines] = useState([]);

  const updateStat = (name, delta) => {
    setStats((prev) =>
      prev.map((stat) => {
        if (stat.name !== name) return stat;
        const newValue = stat.value + delta;
        const change = delta === 0 ? '0' : `${delta > 0 ? '+' : ''}${delta}`;
        const changeType =
          delta > 0 ? 'positive' : delta < 0 ? 'negative' : 'neutral';

        return {
          ...stat,
          value: newValue,
          change,
          changeType,
        };
      })
    );
  };

  const addDeadline = (title, time, priority = 'medium') => {
    setDeadlines((prev) => [
      ...prev,
      { id: prev.length + 1, title, time, priority },
    ]);
  };

  const recordActivity = (user, action) => {
    const time = 'just now';
    setRecentActivities((prev) => [
      { id: prev.length + 1, user, action, time },
      ...prev,
    ]);
  };

  const handleQuickAction = (type) => {
    if (type === 'newProject') {
      updateStat('Total Projects', 1);
      updateStat('Upcoming Deadlines', 1);
      recordActivity('You', 'created a new project');
      addDeadline('New project kickoff', 'Soon', 'high');
    } else if (type === 'uploadFile') {
      updateStat('Active Tasks', 1);
      recordActivity('You', 'uploaded a file');
    } else if (type === 'inviteMember') {
      updateStat('Team Members', 1);
      recordActivity('You', 'invited a team member');
    } else if (type === 'generateReport') {
      recordActivity('You', 'generated a report');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600">📊</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate ">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      {stat.change !== '0' && (
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.changeType === 'positive'
                              ? 'text-green-600'
                              : stat.changeType === 'negative'
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {stat.change}
                        </div>
                      )}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
              <p className="mt-1 text-sm text-gray-500">Team activity across all projects</p>
            </div>
            <div className="bg-white overflow-hidden">
              {recentActivities.length === 0 ? (
                <div className="px-6 py-8 text-center text-sm text-gray-500">
                  No activity yet. Start by using the quick actions on the right.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <li key={activity.id} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600">👤</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.user}
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.action}{' '}
                            <span className="text-gray-400">• {activity.time}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all activity
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-gray-500">Common tasks and shortcuts</p>
            </div>
            <div className="p-6 space-y-4">
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleQuickAction('newProject')}
              >
                New Project
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleQuickAction('uploadFile')}
              >
                Upload File
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleQuickAction('inviteMember')}
              >
                Invite Team Member
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => handleQuickAction('generateReport')}
              >
                Generate Report
              </button>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Deadlines</h3>
              <p className="mt-1 text-sm text-gray-500">Tasks due soon</p>
            </div>
            <div className="p-6">
              {deadlines.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No upcoming deadlines yet. As you create work, deadlines will appear here.
                </p>
              ) : (
                <ul className="space-y-4">
                  {deadlines.map((deadline) => (
                    <li
                      key={deadline.id}
                      className={`border-l-4 pl-4 py-1 ${
                        deadline.priority === 'high'
                          ? 'border-red-500'
                          : deadline.priority === 'medium'
                          ? 'border-yellow-500'
                          : 'border-green-500'
                      }`}
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {deadline.title}
                      </div>
                      <div className="text-sm text-gray-500">{deadline.time}</div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 text-center">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all tasks
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
