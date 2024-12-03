import { Router } from "express";
import authMiddleware from "../middlesware/jwtVerification";

const coachRouter = Router();
const repository = new coachRepository()
const service = new coachService(repository)
const controller = new coachController(service)


coachRouter.post("/saveQuizScore",saveScore)
coachRouter.post("/registerCoach",authMiddleware,registerCoachController)
coachRouter.post("/fetchCoachdata",authMiddleware,fetchCoachDataController)

export default coachRouter