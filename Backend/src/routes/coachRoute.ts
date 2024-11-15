import { Router } from "express";
import { saveScore } from "../controllers/coachController";

const coachRouter = Router();

coachRouter.post("/sendScore",saveScore)

export default coachRouter