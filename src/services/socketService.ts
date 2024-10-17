// src/services/socketService.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:5000', {
      transports: ['websocket'],
      path: '/socket.io/',
    });

    // Error handling
    socket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
  }
  return socket;
};

export const registerUser = (userId: string) => {
   const socketInstance = getSocket();


   socketInstance.emit('register', userId);
};


// Function to send a message to the server
export const sendMessage = (message: string, senderId: string,receiverId: string) => {
  const socketInstance = getSocket();
  console.log('Sending message:', message);
  socketInstance.emit('chat message', {message,senderId, receiverId});
};

// Function to listen for messages from the server
export const listenForMessages = (callback: (message: string) => void) => {
  const socketInstance = getSocket();
  socketInstance.on('chat message', (message) => {
    console.log('Received message:', message);
    callback(message);
  });
};

// Function to disconnect the socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null; // Clear the reference
  }
};

export default getSocket;
