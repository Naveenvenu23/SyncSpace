import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, LinkIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { useWorkspace } from '../context/WorkspaceContext';
import { useNotification } from '../context/NotificationContext';

const InviteModal = ({ isOpen, onClose, workspaceId }) => {
    const { inviteMember } = useWorkspace();
    const { showToast } = useNotification();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Member');
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        inviteMember(workspaceId, email, role);
        onClose();
        setEmail('');
        setRole('Member');
    };

    const copyLink = () => {
        const link = `https://syncspace.app/join/${workspaceId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        showToast('success', 'Link Copied', 'Invite link copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
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
                                            Invite Team Members
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Invite colleagues to join this workspace.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Invite Link</label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="block w-full rounded-none rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 sm:text-sm p-2 border bg-gray-50"
                                                        value={`https://syncspace.app/join/${workspaceId}`}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={copyLink}
                                                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                >
                                                    {copied ? (
                                                        <ClipboardDocumentCheckIcon className="-ml-0.5 h-5 w-5 text-green-500" aria-hidden="true" />
                                                    ) : (
                                                        <LinkIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    )}
                                                    {copied ? 'Copied' : 'Copy'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative my-4">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-500">or send an email</span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="colleague@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Role
                                                </label>
                                                <select
                                                    id="role"
                                                    name="role"
                                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                                    value={role}
                                                    onChange={(e) => setRole(e.target.value)}
                                                >
                                                    <option>Member</option>
                                                    <option>Admin</option>
                                                    <option>Viewer</option>
                                                </select>
                                            </div>
                                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                                >
                                                    Send Invite
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

export default InviteModal;
