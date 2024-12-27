import { Server as SocketIOServer, Socket } from "socket.io";

interface MessageData {
  chatId: string;
  text: string;
  senderId: string;
  timestamp?: string;
}

export const socketHandler = (io: SocketIOServer) => {
  console.log("Initializing Socket.IO");

  io.on("connection", (socket: Socket) => {
    console.log("New client connected with ID:", socket.id);

    // Handle joining a room
    socket.on("joinRoom", (roomId: string) => {
      if (!roomId) {
        console.error("Invalid room ID:", roomId);
        socket.emit("error", { message: "Invalid room ID" });
        return;
      }
      console.log(`Socket ${socket.id} joining room: ${roomId}`);
      socket.join(roomId);

      // Notify the client they joined successfully
      socket.emit("joinedRoom", { roomId });
    });

    // Handle receiving and broadcasting messages
    socket.on("message", (messageData: MessageData) => {
      const { chatId, text, senderId } = messageData;

      if (!chatId || !text || !senderId) {
        console.error("Invalid message data:", messageData);
        socket.emit("error", { message: "Invalid message data" });
        return;
      }

      const timestamp = new Date().toISOString();
      const message = { chatId, text, senderId, timestamp };

      console.log("Broadcasting message to room:", chatId);
      io.to(chatId).emit("message", message);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
