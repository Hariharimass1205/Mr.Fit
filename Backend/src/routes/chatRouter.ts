import { Router } from "express";
import { chatRepository } from "../repository/chatRepository";
import { chatService } from "../services/chatService";
import { chatController } from "../controllers/chatController";

const chatRouter = Router()
const repository = new chatRepository()
const service = new chatService(repository)
const controller = new chatController(service)


chatRouter.post("/saveMsg",controller.saveMessage)
chatRouter.post("/saveMsgCoach",controller.saveMessageCoach)
chatRouter.get("/getMsg",controller.getMessages)
chatRouter.get("/getRoomId",controller.getRoomId)
export default chatRouter