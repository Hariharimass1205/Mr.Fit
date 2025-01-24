"use client";

import { getMessages, getRoomId, SaveChatCoach } from "../../../service/chatApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../../utils/dateFormat";
import { io, Socket } from "socket.io-client";
import { Suspense } from "react";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [coachName, setCoachName] = useState("Coach");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Extract query parameters
  const coachId = searchParams.get("coachId") || "";
  const userIDS = searchParams.get("user") || "";
  const userName = searchParams.get("userName") || "";

  // Fetch userId from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser?._id || null);
    }
  }, []);

  // Fetch roomId and initialize socket connection
  useEffect(() => {
    const fetchRoomId = async () => {
      try {
        const response = await getRoomId(userIDS, coachId);
        if (response?.data) {
          setRoomId(response.data as string);
        } else {
          console.log("Room ID is undefined");
        }
      } catch (error) {
        console.log("Error fetching roomId:", error);
      }
    };

    fetchRoomId();

    const socketConnection = io("http://localhost:5000", { withCredentials: true });

    socketConnection.on("connect", () => console.log("Connected to WebSocket server"));

    socketConnection.on("message", (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, [coachId, userIDS]);

  // Join room when roomId and socket are available
  useEffect(() => {
    if (socket && roomId) {
      socket.emit("joinRoom", roomId);
    }
  }, [roomId, socket]);

  // Fetch chat messages
  useEffect(() => {
    const fetchChatDetails = async () => {
      if (userId && coachId) {
        try {
          const response = await getMessages(userIDS, coachId);
          const messagesData = response?.data || [];
          setMessages(messagesData);
          setCoachName(messagesData[0]?.receiverId?.name || "Coach");
        } catch (error) {
          console.log("Failed to fetch chat details:", error);
          setMessages([]);
        }
      }
    };

    fetchChatDetails();
  }, [userId, coachId]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      console.log("Message cannot be empty");
      return;
    }

    try {
      const response = await SaveChatCoach({
        content: newMessage,
        senderId: coachId,
        coachId: userIDS,
      });

      if (response) {
        setMessages([
          ...messages,
          {
            content: newMessage,
            senderId: coachId,
            receiverId: { name: userName },
            timestamp: new Date().toISOString(),
          },
        ]);
        setNewMessage("");
      }
    } catch (error) {
      console.log("Failed to send message:", error);
    }
  };

  return (
    <div className="flex h-[95vh] bg-gray-900">
      <button
        onClick={() => router.back()}
        className="absolute top-9 right-9 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-800"
      >
        Back
      </button>

      <div className="flex-1 flex flex-col h-full p-6 bg-gray-800 w-[10%]">
        <div className="h-16 bg-gray-700 flex items-center px-4 border-b border-gray-600">
          <h2 className="text-xl justify-end font-semibold text-cyan-400">{userName}</h2>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-800 p-6 space-y-4 scrollbar-hide">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.senderId === coachId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.senderId === coachId
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-700 text-white"
                  } rounded-lg p-3 max-w-xs break-words`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-300 block mt-1">
                    {msg.senderId === coachId ? "You" : userName || "Unknown"}
                  </span>
                  <span className="text-xs text-gray-400 block mt-1">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-6">No messages available.</p>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="bg-gray-700 text-white flex items-center p-4 border-t border-gray-600 mt-4">
          <form onSubmit={handleSendMessage} className="flex w-full">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full p-3 border border-gray-600 rounded-l-lg focus:outline-none focus:border-cyan-500 bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-3 rounded-r-lg hover:bg-cyan-800 focus:outline-none"
            >
              Send
            </button>
            <button
              className="bg-cyan-600 ml-3 text-white px-6 py-1 rounded-md hover:bg-cyan-800 focus:outline-none"
              onClick={() =>
               router.replace(
                  `/user/videoCall?roomId=${userId}&coachName=${coachName}&coachId=${coachId}&userId=${userIDS}`
                )
              }
            >
              Video Call
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default function WrappedChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  );
}
