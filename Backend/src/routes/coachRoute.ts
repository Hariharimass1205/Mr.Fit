import { Router } from "express";
import { sendScoretoAdmin } from "../controllers/coachController";

const CoachRouter = Router();

CoachRouter.post("/sendScore",sendScoretoAdmin)

export default CoachRouter