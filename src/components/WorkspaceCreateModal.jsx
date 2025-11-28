import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useWorkspace } from '../context/WorkspaceContext';

const WorkspaceCreateModal = ({ isOpen, onClose }) => {
    const { createWorkspace } = useWorkspace();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [teamSize, setTeamSize] = useState('1-10');

    const handleSubmit = (e) => {
        e.preventDefault();
        createWorkspace({ name, description, teamSize });
        onClose();
        setName('');
        setDescription('');
        setTeamSize('1-10');
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                            Create New Workspace
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Get started by creating a new workspace for your team.
                                            </p>
                                        </div>
                                        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Workspace Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="e.g. Acme Corp"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    id="description"
                                                    rows={3}
                                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="What's this workspace for?"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Team Size
                                                </label>
                                                <select
                                                    id="teamSize"
                                                    name="teamSize"
                                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                                    value={teamSize}
                                                    onChange={(e) => setTeamSize(e.target.value)}
                                                >
                                                    <option>1-10</option>
                                                    <option>11-50</option>
                                                    <option>50+</option>
                                                </select>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                                >
                                                    Create Workspace
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto"
                                                    onClick={onClose}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default WorkspaceCreateModal;
