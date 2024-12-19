"use client"
import { useState } from 'react';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       // Simulating client message; you can enhance this to include sender details
//       setMessages([...messages, { sender: 'Client', text: newMessage }]);
//       setNewMessage('');

//       // Simulating coach's reply for demo purposes
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           { sender: 'Coach', text: 'Thanks for your message!' },
//         ]);
//       }, 1000);
//     }
//   };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg flex flex-col h-4/5">
        {/* Header */}
        <div className="bg-blue-500 text-white text-center py-4 font-bold text-lg rounded-t-lg">
          Chat with Your Coach
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message === 'Client' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message  === 'Client'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-900'
                }`}
              >
                {message}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex p-4 border-t border-gray-300">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type a message"
          />
          <button
            
            className="px-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
