import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server as ServerSocket } from "socket.io";
import { connectToMongoDB } from "./config/db.connect";
import userRouter from "./routes/userRoute";
import coachRouter from "./routes/coachRoute";
import adminRouter from "./routes/adminRoute";
import paymentRouter from "./routes/paymentRoute";
import chatRouter from "./routes/chatRouter";
import { errorHandles } from "./middlesware/errrorHandlers";
import { socketHandler } from "./utils/chat";
import { IisBlockHandle } from "./middlesware/isBlockHandler";
import logger from "./utils/logger"; // ✅ Import Pino logger

dotenv.config();
const app = express();
connectToMongoDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Replace Morgan with a Pino request logger
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Initialize HTTP Server and Socket.IO
const httpServer = createServer(app);

export const io = new ServerSocket(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

// Routes
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/coach", coachRouter);
app.use("/admin", adminRouter);
app.use("/chat", chatRouter);

// Global Error Handler
app.use(errorHandles);
app.use(IisBlockHandle);

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  logger.info(`🚀 Server started on port ${PORT}`);
});
