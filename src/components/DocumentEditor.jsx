import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { ShareIcon, CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'code-block'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'link', 'image', 'code-block'
];

const DocumentEditor = () => {
    const [value, setValue] = useState('<h1>Project Requirements</h1><p>Start typing your document here...</p>');
    const [title, setTitle] = useState('Untitled Document');
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    // Simulate auto-save
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSaving(true);
            setTimeout(() => {
                setSaving(false);
                setLastSaved(new Date());
            }, 800);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [value, title]);

    return (
        <div className="h-full flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header / Toolbar Area */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-xl font-bold bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white w-full placeholder-gray-400"
                            placeholder="Untitled Document"
                        />
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 space-x-2">
                            <span>File</span>
                            <span>Edit</span>
                            <span>View</span>
                            <span>Insert</span>
                            <span>Format</span>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <span className="flex items-center">
                                {saving ? (
                                    <>
                                        <CloudArrowUpIcon className="h-3 w-3 mr-1 animate-bounce" />
                                        Saving...
                                    </>
                                ) : lastSaved ? (
                                    <>
                                        <CheckCircleIcon className="h-3 w-3 mr-1 text-green-500" />
                                        Saved {lastSaved.toLocaleTimeString()}
                                    </>
                                ) : (
                                    'Ready'
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Collaborators (Simulated) */}
                        <div className="flex -space-x-2">
                            <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-indigo-500 flex items-center justify-center text-white text-xs font-medium" title="Sarah Wilson">SW</div>
                            <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 bg-green-500 flex items-center justify-center text-white text-xs font-medium" title="Mike Johnson">MJ</div>
                        </div>

                        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm font-medium">
                            <ShareIcon className="h-4 w-4 mr-2" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 overflow-hidden flex flex-col">
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats}
                    className="flex-1 flex flex-col h-full"
                />
            </div>

            {/* Custom Styles for Quill in Dark Mode */}
            <style>{`
        .quill {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .ql-toolbar {
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          border-color: #e5e7eb !important;
          background-color: white;
        }
        .dark .ql-toolbar {
          background-color: #1f2937;
          border-color: #374151 !important;
        }
        .dark .ql-toolbar .ql-stroke {
          stroke: #9ca3af;
        }
        .dark .ql-toolbar .ql-fill {
          fill: #9ca3af;
        }
        .dark .ql-toolbar .ql-picker {
          color: #9ca3af;
        }
        .ql-container {
          flex: 1;
          border: none !important;
          font-size: 16px;
          overflow-y: auto;
        }
        .ql-editor {
          padding: 2rem;
          min-height: 100%;
        }
        .dark .ql-editor {
          color: #e5e7eb;
        }
        .dark .ql-editor.ql-blank::before {
          color: #6b7280;
        }
      `}</style>
        </div>
    );
};

export default DocumentEditor;
