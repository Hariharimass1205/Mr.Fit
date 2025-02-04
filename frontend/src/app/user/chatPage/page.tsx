"use client";
import { getMessages, getRoomId, SaveChat } from '../../../service/chatApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { formatDate } from '../../../../utils/dateFormat';
import { io, Socket } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [coachName, setCoachName] = useState("Coach");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null); // Video call link state
  const coachId = searchParams.get("coach") || "";
  const userIdfromback = searchParams.get("userId") || "";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const response = await getRoomId(userIdfromback, coachId);
        if (response) {
          setRoomId(response.data as string);
        } else {
          console.log("Room ID is undefined");
        }
      } catch (error) {
        console.log("Error fetching roomId:", error);
      }
    };

    fetchRoomId();
    const socketConnection = io('https://mr-fit.onrender.com', { withCredentials: true });
   // const socketConnection = io('https://api.mrfit.life', { withCredentials: true });
  
    socketConnection.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for incoming video call link
    socketConnection.on('linkNotification', (data) => {
      console.log("Incoming video call link:", data);
      setVideoLink(data.link);
    });

    socketConnection.on('message', (message: any) => {
      setMessages((prevState) => [...prevState, message]);
    });

    setSocket(socketConnection);

    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };
  }, [coachId, userIdfromback]);

  useEffect(() => {
    if (socket && roomId) {
      socket.emit("joinRoom", roomId);
    }
  }, [roomId, socket]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser?._id || null);
      }
    }
  }, []);

  useEffect(() => {
    const fetchChatDetails = async () => {
      if (userId && coachId) {
        try {
          const response = await getMessages(userId, coachId);
          const messagesData = response?.data || [];
          setMessages(messagesData);

          const name = messagesData[0]?.receiverId?.name || "Coach";
          setCoachName(name);
        } catch (error) {
          console.log(error);
          setMessages([]);
          setCoachName("Coach");
        }
      }
    };
    fetchChatDetails();
  }, [userId, coachId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !newMessage.trim()) {
      toast.error("Type something...");
      return;
    }
    try {
      const response = await SaveChat({
        content: newMessage,
        senderId: userId,
        coachId: coachId
      });

      if (response) {
        const newMsg = {
          content: newMessage,
          senderId: userId,
          receiverId: { name: coachName },
          timestamp: new Date().toISOString(),
        };
        socket?.emit('message', newMsg);
        setNewMessage('');
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  const handleJoinRoom = () => {
    if (videoLink) {
      console.log("Joining video room:", videoLink);
      window.open(videoLink, "_blank");
      setVideoLink(null); // Clear the video link after joining
    }
  };

  return (
    <div className="flex h-[95vh] bg-gray-900">
      <ToastContainer autoClose={2000} position="top-center" />
      <button
        onClick={() => router.back()}
        className="absolute top-9 right-9 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-800"
      >
        Back
      </button>
        {/* Video call notification div */}
        {videoLink && (
        <div
          className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg cursor-pointer z-50"
          
        >
          <p className="font-bold">Incoming Video Call</p>
          <p>Click here to join the call</p>
          <button className='p-2 mt-4 bg-green-600 mr-7 rounded-lg' onClick={handleJoinRoom}>Answer</button>
          <button className='p-2 mt-4 bg-red-600 rounded-lg' onClick={()=>setVideoLink(null)}>Reject</button>
        </div>
      )}
      <div className="flex-1 flex flex-col h-full p-6 bg-gray-800">
        <div className="h-16 bg-gray-700 flex items-center px-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-cyan-400">{coachName}</h2>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-800 p-6 space-y-4">
          {messages.length > 0 ? (
            messages.map((msg: any, index: number) => (
              <div key={index} className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
                <div className={`${msg.senderId === userId ? "bg-cyan-500" : "bg-gray-700"} text-white rounded-lg p-3 max-w-xs`}>
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-300 block mt-1">
                    {msg.senderId === userId ? "You" : coachName || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400 block mt-1">{formatDate(msg.timestamp)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-6">No messages available.</p>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className="bg-gray-700 flex items-center p-4">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-3 border rounded-l-lg bg-gray-800 text-white focus:outline-none"
            />
            <button type="submit" className="bg-cyan-600 px-6 py-3 rounded-r-lg text-white hover:bg-cyan-800">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;