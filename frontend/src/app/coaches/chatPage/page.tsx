// "use client";
// import { getMessages,SaveChatUser } from '@/service/chatApi';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { formatDate } from '../../../../utils/dateFormat';

// const ChatPage = () => {
//   const searchParams = useSearchParams();
//   const [messages, setMessages] = useState<any[]>([]);
//   const userID = searchParams.get("user") || "";
//   const coachId = searchParams.get("coachId") || "";
//   const [newMessage, setNewMessage] = useState('');
//   const [userId, setUserId] = useState<string | null>(null);
//   const [coachName, setCoachName] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("user");
//       if (user) {
//         const parsedUser = JSON.parse(user);
//         setUserId(parsedUser?._id || null);
//       }
//     }
//   }, []);

//   // Fetch chat details
//   // useEffect(() => {
//   //   const fetchChatDetails = async () => {
//   //     if (userId && coachId) {
//   //       try {
//   //         const response = await getMessages(userId, coachId);
//   //         console.log(response,"jjj",userId, coachId)
//   //         const messagesData = response?.data || [];
//   //         setMessages(messagesData);

//   //         // Extract coach name from the first message
//   //         const name = messagesData[0]?.receiverId?.name || "Coach";
//   //         setCoachName(name);
//   //       } catch (error) {
//   //         console.error("Failed to fetch chat details:", error);
//   //         setMessages([]);
//   //         setCoachName("Coach");
//   //       }
//   //     }
//   //   };

//   //   fetchChatDetails();
//   // }, [userId, coachId]);

//   // Handle sending a message
//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!userId) {
//       console.error("User ID is not defined");
//       return;
//     }

//     if (!newMessage.trim()) {
//       console.log("Message cannot be empty");
//       return;
//     }

//     try {
//       console.log(coachId,userId,"+++++++")
//       const response = await SaveChatUser({
//         content: newMessage,
//         senderId:coachId,
//         coachId:userID,
//       });

//       if (response) {
//         alert("PPPPP")
//         setMessages([
//           ...messages,
//           {
//             content: newMessage,
//             senderId: userId,
//             receiverId: { name: coachName },
//             timestamp: new Date().toISOString(),
//           },
//         ]);
//         setNewMessage('');
//       }
//     } catch (error) {
//       console.error("Network error:", error);
//     }
//   };

//   return (
//     <div className="flex h-[95vh] bg-gray-100">
//       <div className="flex-1 flex flex-col h-full p-6 bg-white w-[10%]">
//         <div className="h-16 bg-gray-200 flex items-center px-4 border-b border-gray-300">
//           <h2 className="text-xl font-semibold text-gray-800">{coachName}</h2>
//         </div>
//         <div className="flex-1 overflow-y-auto bg-gray-200 p-6 space-y-4">
//           {messages.length > 0 ? (
//             messages.map((msg: any, index: number) => (
//               <div
//                 key={index}
//                 className={`flex ${
//                   msg.senderId === userId ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`${
//                     msg.senderId === userId
//                       ? "bg-cyan-400 text-white"
//                       : "bg-gray-600 text-white"
//                   } rounded-lg p-3 max-w-xs break-words`}
//                 >
//                   <p>{msg.content}</p>
//                   <span className="text-xs text-gray-300 block mt-1">
//                     {msg.senderId === userId ? "You" : coachName || "Unknown"}
//                   </span>
//                   <span className="text-xs text-white-300 block mt-1">
//                     {formatDate(msg.timestamp)}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 mt-6">No messages available.</p>
//           )}
//         </div>
//         <div className="bg-gray-100 text-black flex items-center p-4 border-t border-gray-300 mt-4">
//           <form onSubmit={handleSendMessage} className="flex w-full">
//             <input
//               type="text"
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-cyan-500"
//             />
//             <button
//               type="submit"
//               className="bg-cyan-500 text-white px-6 py-3 rounded-r-lg hover:bg-pink-600 focus:outline-none"
//             >
//               Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
