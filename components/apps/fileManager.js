import React, { useState, useEffect } from 'react';

const FileManager = () => {
    const [files, setFiles] = useState([]);
    const [currentPath, setCurrentPath] = useState('/');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch initial files and directories
        fetchFiles(currentPath);
    }, [currentPath]);

    const fetchFiles = (path) => {
        // Simulate fetching files and directories from a server
        const fetchedFiles = [
            { name: 'file1.txt', type: 'file' },
            { name: 'file2.txt', type: 'file' },
            { name: 'folder1', type: 'directory' },
            { name: 'folder2', type: 'directory' },
        ];
        setFiles(fetchedFiles);
    };

    const handleFileClick = (file) => {
        if (file.type === 'directory') {
            setCurrentPath(`${currentPath}${file.name}/`);
        } else {
            // Handle file opening logic
            console.log(`Opening file: ${file.name}`);
        }
    };

    const handleCreateFile = () => {
        const fileName = prompt('Enter file name:');
        if (fileName) {
            setFiles([...files, { name: fileName, type: 'file' }]);
        }
    };

    const handleCreateFolder = () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            setFiles([...files, { name: folderName, type: 'directory' }]);
        }
    };

    const handleRename = (file) => {
        const newName = prompt('Enter new name:', file.name);
        if (newName) {
            const updatedFiles = files.map((f) =>
                f.name === file.name ? { ...f, name: newName } : f
            );
            setFiles(updatedFiles);
        }
    };

    const handleDelete = (file) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${file.name}?`);
        if (confirmDelete) {
            const updatedFiles = files.filter((f) => f.name !== file.name);
            setFiles(updatedFiles);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredFiles = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="file-manager">
            <h1>File Manager</h1>
            <div className="file-manager-controls">
                <button onClick={handleCreateFile}>Create File</button>
                <button onClick={handleCreateFolder}>Create Folder</button>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search files and folders..."
                />
            </div>
            <div className="file-manager-path">Current Path: {currentPath}</div>
            <div className="file-manager-list">
                {filteredFiles.map((file, index) => (
                    <div key={index} className="file-manager-item">
                        <span onClick={() => handleFileClick(file)}>{file.name}</span>
                        <button onClick={() => handleRename(file)}>Rename</button>
                        <button onClick={() => handleDelete(file)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const displayFileManager = () => {
    return <FileManager />;
};

export default FileManager;
