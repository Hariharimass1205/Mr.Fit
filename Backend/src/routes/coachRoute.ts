import { Router } from "express";
import { saveScore } from "../controllers/coachController";
import { registerCoachController } from "../controllers/coachController";

const coachRouter = Router();

coachRouter.post("/saveQuizScore",saveScore)
coachRouter.post("/registerCoach",registerCoachController)
export default coachRouter