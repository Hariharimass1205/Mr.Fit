import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import cookies from "js-cookie";
import { CLIENT_URL } from "../utils/serverURL";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext).socket;

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = cookies.get("accessToken");

    if (token) {
      // Create the socket connection with token and credentials
      const socketInstance = io(CLIENT_URL, {
        withCredentials: true, // Allow cross-origin requests
        auth: { token },
      });

      socketInstance.on("connect", () => {
        console.log("Connected to socket");
        setSocket(socketInstance);
      });

      socketInstance.on("disconnect", () => {
        console.log("Disconnected from socket");
        setSocket(null);
      });

      // Optionally handle socket errors
      socketInstance.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        setSocket(null); // Handle connection failure
      });

      socketInstance.on("reconnect", (attempt) => {
        console.log(`Reconnected on attempt ${attempt}`);
      });

      socketInstance.on("error", (error) => {
        console.error("Socket error:", error);
      });

      // Cleanup function to disconnect when component unmounts
      return () => {
        socketInstance.disconnect();
      };
    } else {
      console.log("No token found for socket connection");
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
