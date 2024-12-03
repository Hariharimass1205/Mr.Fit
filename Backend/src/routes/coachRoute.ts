import { Router } from "express";
import authMiddleware from "../middlesware/jwtVerification";
import { CoachRepository } from "../repository/coachRepository";
import { CoachService } from "../services/coachService";
import { CoachController } from "../controllers/coachController";

const coachRouter = Router();
const repository = new CoachRepository()
const service = new CoachService(repository)
const controller = new CoachController(service)


coachRouter.post("/saveQuizScore",controller.saveScore)
coachRouter.post("/registerCoach",authMiddleware,controller.registerCoachController)
coachRouter.post("/fetchCoachdata",authMiddleware,controller.fetchCoachDataController)

export default coachRouter