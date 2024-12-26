import { Router } from "express";
import { chatRepository } from "../repository/chatRepository";
import { chatService } from "../services/chatService";
import { chatController } from "../controllers/chatController";

const chatRouter = Router()
const repository = new chatRepository()
const service = new chatService(repository)
const controller = new chatController(service)


chatRouter.post("/saveMsg",controller.saveMessage)
chatRouter.get("/getMsg",controller.getMessages)
export default chatRouter