import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusIcon, EllipsisHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Modal from './Modal';
import TaskForm from './TaskForm';
import { useNotification } from '../context/NotificationContext';

// Initial data for the board
const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Design new landing page', description: 'Create high-fidelity mockups for the new marketing landing page.', priority: 'High', tag: 'Design', dueDate: '2023-12-01' },
        'task-2': { id: 'task-2', content: 'Integrate Firebase Auth', description: 'Set up authentication using Firebase for email/password login.', priority: 'High', tag: 'Backend', dueDate: '2023-11-20' },
        'task-3': { id: 'task-3', content: 'Create dashboard layout', description: 'Implement the responsive sidebar and top navigation.', priority: 'Medium', tag: 'Frontend', dueDate: '2023-11-25' },
        'task-4': { id: 'task-4', content: 'Fix navigation bug', description: 'Mobile menu not closing when clicking outside.', priority: 'Low', tag: 'Bug', dueDate: '2023-11-18' },
        'task-5': { id: 'task-5', content: 'Write documentation', description: 'Document the API endpoints and component library.', priority: 'Low', tag: 'Docs', dueDate: '2023-12-10' },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
            color: 'bg-gray-100 dark:bg-gray-800',
            headerColor: 'border-t-4 border-indigo-500'
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: ['task-5'],
            color: 'bg-blue-50 dark:bg-blue-900/20',
            headerColor: 'border-t-4 border-blue-500'
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
            color: 'bg-green-50 dark:bg-green-900/20',
            headerColor: 'border-t-4 border-green-500'
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
};

const KanbanBoard = () => {
    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view'
    const [currentTask, setCurrentTask] = useState(null);
    const [activeColumnId, setActiveColumnId] = useState(null);

    const { showToast } = useNotification();

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = { ...start, taskIds: newTaskIds };

            setData({
                ...data,
                columns: { ...data.columns, [newColumn.id]: newColumn },
            });
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = { ...start, taskIds: startTaskIds };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = { ...finish, taskIds: finishTaskIds };

        setData({
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        });
    };

    const openCreateModal = (columnId = 'column-1') => {
        setModalMode('create');
        setCurrentTask(null);
        setActiveColumnId(columnId);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setModalMode('edit');
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const openViewModal = (task) => {
        setModalMode('view');
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
        setActiveColumnId(null);
    };

    const handleTaskSubmit = (taskData) => {
        if (modalMode === 'create') {
            const newTaskId = `task-${Date.now()}`;
            const newTask = { ...taskData, id: newTaskId };

            const columnId = activeColumnId || 'column-1';
            const column = data.columns[columnId];
            const newTaskIds = [...column.taskIds, newTaskId];

            setData({
                ...data,
                tasks: { ...data.tasks, [newTaskId]: newTask },
                columns: {
                    ...data.columns,
                    [columnId]: { ...column, taskIds: newTaskIds }
                }
            });
            showToast('success', 'Task Created', `"${newTask.content}" has been added to ${column.title}.`);
        } else if (modalMode === 'edit') {
            setData({
                ...data,
                tasks: { ...data.tasks, [taskData.id]: taskData }
            });
            showToast('success', 'Task Updated', `"${taskData.content}" has been updated.`);
        }
        closeModal();
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getModalTitle = () => {
        switch (modalMode) {
            case 'create': return 'Create New Task';
            case 'edit': return 'Edit Task';
            case 'view': return 'Task Details';
            default: return 'Task';
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Board</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your tasks and workflows</p>
                </div>
                <button
                    onClick={() => openCreateModal()}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    New Task
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex-1 overflow-x-auto overflow-y-hidden">
                    <div className="flex h-full space-x-6 pb-4 min-w-max">
                        {data.columnOrder.map((columnId) => {
                            const column = data.columns[columnId];
                            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

                            return (
                                <div key={column.id} className="w-80 flex flex-col h-full rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 shadow-sm">
                                    {/* Column Header */}
                                    <div className={`p-4 rounded-t-xl bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center ${column.headerColor}`}>
                                        <div className="flex items-center space-x-2">
                                            <h2 className="font-semibold text-gray-700 dark:text-gray-200">{column.title}</h2>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full">
                                                {tasks.length}
                                            </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                            <EllipsisHorizontalIcon className="h-5 w-5" />
                                        </button>
                                    </div>

                                    {/* Droppable Area */}
                                    <Droppable droppableId={column.id}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                className={`flex-1 p-3 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''
                                                    }`}
                                            >
                                                {tasks.map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                onClick={() => openViewModal(task)}
                                                                className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 group hover:shadow-md transition-all duration-200 cursor-pointer ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-500 rotate-2 scale-105 z-50' : ''
                                                                    }`}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                            >
                                                                <div className="flex justify-between items-start mb-2">
                                                                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${getPriorityColor(task.priority)}`}>
                                                                        {task.priority}
                                                                    </span>
                                                                    <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); openEditModal(task); }}
                                                                            className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                                                                        >
                                                                            <PencilSquareIcon className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white mb-3 leading-snug">
                                                                    {task.content}
                                                                </p>
                                                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                                        {task.tag}
                                                                    </span>
                                                                    {task.dueDate && (
                                                                        <span>{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>

                                    {/* Add Task Button */}
                                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl">
                                        <button
                                            onClick={() => openCreateModal(column.id)}
                                            className="w-full py-2 flex items-center justify-center text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors border border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-300"
                                        >
                                            <PlusIcon className="h-4 w-4 mr-1" />
                                            Add Card
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </DragDropContext>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={getModalTitle()}
            >
                <TaskForm
                    task={currentTask}
                    mode={modalMode}
                    onSubmit={handleTaskSubmit}
                    onCancel={closeModal}
                />
            </Modal>
        </div>
    );
};

export default KanbanBoard;
