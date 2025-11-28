import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const projectData = [
    { name: 'Mon', completed: 4, active: 10 },
    { name: 'Tue', completed: 7, active: 12 },
    { name: 'Wed', completed: 5, active: 15 },
    { name: 'Thu', completed: 10, active: 11 },
    { name: 'Fri', completed: 12, active: 9 },
    { name: 'Sat', completed: 8, active: 13 },
    { name: 'Sun', completed: 15, active: 8 },
];

const taskData = [
    { name: 'To Do', value: 12, color: '#F59E0B' }, // Amber-500
    { name: 'In Progress', value: 8, color: '#3B82F6' }, // Blue-500
    { name: 'Review', value: 4, color: '#8B5CF6' }, // Violet-500
    { name: 'Done', value: 16, color: '#10B981' }, // Emerald-500
];

export const ProjectProgressChart = () => {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={projectData}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="active"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorActive)"
                        name="Active Tasks"
                    />
                    <Area
                        type="monotone"
                        dataKey="completed"
                        stroke="#10B981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCompleted)"
                        name="Completed Tasks"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export const TaskDistributionChart = () => {
    return (
        <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={taskData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {taskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-gray-600 dark:text-gray-300 text-sm ml-1">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
