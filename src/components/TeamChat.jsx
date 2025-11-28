import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { FaceSmileIcon, PaperClipIcon } from '@heroicons/react/24/outline';

const initialMessages = [
    {
        id: 1,
        sender: 'Sarah Wilson',
        email: 'sarah@example.com',
        content: 'Hey team! Has anyone checked the latest designs for the landing page?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        isCurrentUser: false,
    },
    {
        id: 2,
        sender: 'Mike Johnson',
        email: 'mike@example.com',
        content: 'Yes, I just reviewed them. They look great! I especially like the new hero section.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.9).toISOString(),
        isCurrentUser: false,
    },
    {
        id: 3,
        sender: 'You',
        email: 'current@user.com', // Placeholder, will match against auth user
        content: 'I agree. The color palette is much more vibrant now. When can we start implementing?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.8).toISOString(),
        isCurrentUser: true,
    },
    {
        id: 4,
        sender: 'Sarah Wilson',
        email: 'sarah@example.com',
        content: 'I think we can start the sprint planning tomorrow. @Mike, are you free at 10 AM?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
        isCurrentUser: false,
    },
];

const TeamChat = () => {
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input on load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message = {
            id: Date.now(),
            sender: currentUser?.email?.split('@')[0] || 'You',
            email: currentUser?.email,
            content: newMessage.trim(),
            timestamp: new Date().toISOString(),
            isCurrentUser: true,
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">General Channel</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Team announcements and general discussion</p>
                </div>
                <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-indigo-500 flex items-center justify-center text-white text-xs font-medium">SW</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-green-500 flex items-center justify-center text-white text-xs font-medium">MJ</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-gray-400 flex items-center justify-center text-white text-xs font-medium">+3</div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-gray-900/50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`flex max-w-[75%] ${msg.isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                {msg.isCurrentUser ? (
                                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold ml-3">
                                        You
                                    </div>
                                ) : (
                                    <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-bold mr-3">
                                        {msg.sender.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`flex flex-col ${msg.isCurrentUser ? 'items-end' : 'items-start'
                                    }`}
                            >
                                <div className="flex items-baseline space-x-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {msg.sender}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {formatTime(msg.timestamp)}
                                    </span>
                                </div>
                                <div
                                    className={`px-4 py-2 rounded-2xl shadow-sm text-sm ${msg.isCurrentUser
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none border border-gray-200 dark:border-gray-600'
                                        }`}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <button
                        type="button"
                        className="absolute left-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        <PaperClipIcon className="h-5 w-5" />
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full py-3 pl-10 pr-12 bg-gray-100 dark:bg-gray-700/50 border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-700 transition-all duration-200"
                    />

                    <div className="absolute right-2 flex items-center space-x-1">
                        <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            <FaceSmileIcon className="h-5 w-5" />
                        </button>
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className={`p-2 rounded-full transition-all duration-200 ${newMessage.trim()
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:scale-105'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <PaperAirplaneIcon className="h-5 w-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamChat;
