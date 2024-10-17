'use client';
import React, { useEffect, useState, useRef } from 'react';
import { sendMessage, listenForMessages, disconnectSocket, registerUser } from '../../services/socketService';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  
  const senderId = '670f9e538d38b72bf2d53dff'; // Replace with actual sender ID (firebaseId)
  const receiverId = '670fb9a7abbd055a3658abd7'; // Replace with actual receiver ID

  const isRegistered = useRef(false); // A flag to prevent multiple registrations

  useEffect(() => {
    if (!isRegistered.current) {
      // Register the senderId with the server only once
      registerUser(senderId);
      isRegistered.current = true;
    }

    const handleNewMessage = (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    listenForMessages(handleNewMessage);

    return () => {
      console.log('Chat component unmounted, socket will not disconnect');
    };
  }, [senderId]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (message.trim()) {
      sendMessage(message, senderId, receiverId);
      setMessages((prevMessages) => [...prevMessages, { sender: senderId, content: message }]); // Optionally show the sent message
      setMessage('');
    }
  };

  const handleDisconnect = () => {
    disconnectSocket(); // Call the disconnect function
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={handleDisconnect}>Disconnect</button>
    </div>
  );
};

export default Chat;
