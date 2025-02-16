import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [chatRooms, setChatRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(savedMessages);
        const savedChatRooms = JSON.parse(localStorage.getItem('chatRooms')) || [];
        setChatRooms(savedChatRooms);
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(savedContacts);
    }, []);

    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        localStorage.setItem('chatRooms', JSON.stringify(chatRooms));
    }, [chatRooms]);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            const newMessage = {
                text: currentMessage,
                timestamp: new Date().toISOString(),
                room: currentRoom
            };
            setMessages([...messages, newMessage]);
            setCurrentMessage('');
        }
    };

    const createChatRoom = () => {
        const roomName = prompt('Enter chat room name:');
        if (roomName) {
            setChatRooms([...chatRooms, roomName]);
        }
    };

    const addContact = () => {
        const contactName = prompt('Enter contact name:');
        if (contactName) {
            setContacts([...contacts, contactName]);
        }
    };

    const shareFile = (file) => {
        if (currentRoom) {
            const newMessage = {
                text: `Shared a file: ${file.name}`,
                timestamp: new Date().toISOString(),
                room: currentRoom
            };
            setMessages([...messages, newMessage]);
        }
    };

    return (
        <div className="chat-app">
            <h1>Chat</h1>
            <div className="chat-rooms">
                <h2>Chat Rooms</h2>
                <button onClick={createChatRoom}>Create Chat Room</button>
                <ul>
                    {chatRooms.map((room, index) => (
                        <li key={index} onClick={() => setCurrentRoom(room)}>
                            {room}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="contacts">
                <h2>Contacts</h2>
                <button onClick={addContact}>Add Contact</button>
                <ul>
                    {contacts.map((contact, index) => (
                        <li key={index}>{contact}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-window">
                <h2>{currentRoom ? `Room: ${currentRoom}` : 'Select a chat room'}</h2>
                <div className="messages">
                    {messages
                        .filter(message => message.room === currentRoom)
                        .map((message, index) => (
                            <div key={index} className="message">
                                <span>{message.timestamp}</span>
                                <p>{message.text}</p>
                            </div>
                        ))}
                </div>
                {currentRoom && (
                    <div className="message-input">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                        <input
                            type="file"
                            onChange={(e) => shareFile(e.target.files[0])}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export const displayChat = () => {
    return <Chat />;
};

export default Chat;
