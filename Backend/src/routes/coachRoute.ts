import { Router } from "express";
import { saveScore } from "../controllers/coachController";

const coachRouter = Router();

coachRouter.post("/saveQuizScore",saveScore)

export default coachRouter