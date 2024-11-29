import { Router } from "express";
import { fetchCoachDataController, saveScore } from "../controllers/coachController";
import { registerCoachController } from "../controllers/coachController";
import authMiddleware from "../middlesware/jwtVerification";

const coachRouter = Router();

coachRouter.post("/saveQuizScore",saveScore)
coachRouter.post("/registerCoach",authMiddleware,registerCoachController)
coachRouter.post("/fetchCoachdata",authMiddleware,fetchCoachDataController)

export default coachRouter