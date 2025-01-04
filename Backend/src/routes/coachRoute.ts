import { Router } from "express";
import authMiddleware from "../middlesware/jwtVerification";
import { CoachRepository } from "../repository/coachRepository";
import { CoachService } from "../services/coachService";
import { CoachController } from "../controllers/coachController";
import { uploadMiddleware } from "../middlesware/multerConfig";

const coachRouter = Router();
const repository = new CoachRepository()
const service = new CoachService(repository)
const controller = new CoachController(service)

coachRouter.post("/saveQuizScore",controller.saveScore)
coachRouter.post("/registerCoach",authMiddleware,controller.registerCoachController)
coachRouter.post("/fetchCoachdata",authMiddleware,controller.fetchCoachDataController)
coachRouter.patch("/updateProfilePic",authMiddleware,uploadMiddleware,controller.updateCoachProfilePic)
coachRouter.patch("/updatPackage",authMiddleware,controller.updateCoachPackage)
coachRouter.patch("/updatProfile",authMiddleware,controller.updateCoachProfile)
coachRouter.patch("/saveCoachAchievement",authMiddleware,controller.updateCoachAchievement)
coachRouter.put("/updateDiet",controller.updateUserDiet)
coachRouter.post('/updateAvailability',authMiddleware,controller.updateAvailability)

export default coachRouter