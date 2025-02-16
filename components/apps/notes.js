import React, { useState, useEffect } from 'react';

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState('');

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        if (currentNote.trim() !== '') {
            setNotes([...notes, currentNote]);
            setCurrentNote('');
        }
    };

    const deleteNote = (index) => {
        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };

    const editNote = (index, newContent) => {
        const newNotes = notes.map((note, i) => (i === index ? newContent : note));
        setNotes(newNotes);
    };

    return (
        <div className="notes-app">
            <h1>Notes</h1>
            <div className="notes-input">
                <input
                    type="text"
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Enter your note here..."
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <div className="notes-list">
                {notes.map((note, index) => (
                    <div key={index} className="note">
                        <textarea
                            value={note}
                            onChange={(e) => editNote(index, e.target.value)}
                        />
                        <button onClick={() => deleteNote(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notes;

export const displayNotes = () => {
    return <Notes />;
};
