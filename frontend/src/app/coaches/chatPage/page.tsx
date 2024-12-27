"use client";
import { getMessages, SaveChat } from '@/service/chatApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formatDate } from '../../../../utils/dateFormat';

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const coachId = searchParams.get("coachId") || "";
  const userIDS = searchParams.get("user") || "";
  const userName = searchParams.get("userName") || "";
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [coachName, setCoachName] = useState("Coach");

  // Fetch userId from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser?._id || null);
      }
    }
  }, []);

  // Fetch chat details
  useEffect(() => {
    const fetchChatDetails = async () => {
      if (userId && coachId) {
        try {
          const response = await getMessages(userIDS, coachId);
          console.log(response,"data fetched")
          const messagesData = response?.data || [];
          setMessages(messagesData);
          // Extract coach name from the first message
          const name = messagesData[0]?.receiverId?.name || "Coach";
          setCoachName(name);
        } catch (error) {
          console.error("Failed to fetch chat details:", error);
          setMessages([]);
          setCoachName("Coach");
        }
      }
    };

    fetchChatDetails();
  }, [userId, coachId]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error("User ID is not defined");
      return;
    }

    if (!newMessage.trim()) {
      console.log("Message cannot be empty");
      return;
    }

    try {
        console.log("senderId",coachId, "coachId", userIDS)
      const response = await SaveChat({
        content: newMessage,
        senderId: coachId,
        coachId: userIDS,
        role:"coach"
      });

      if (response) {
        setMessages([
          ...messages,
          {
            content: newMessage,
            senderId: coachId,
            receiverId: { name: {userName} },
            timestamp: new Date().toISOString(),
          },
        ]);
        setNewMessage('');
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex h-[95vh] bg-gray-900">
      {/* Back Button */}

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
        <div
          className="flex-1 overflow-y-auto bg-gray-800 p-6 space-y-4 scrollbar-hide"
        >
          {messages.length > 0 ? (
            messages.map((msg: any, index: number) => (
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

