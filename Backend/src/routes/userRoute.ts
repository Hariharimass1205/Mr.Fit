import { Router } from "express";
import {UserController} from '../controllers/userController';
import authMiddleware from "../middlesware/jwtVerification";
import { userService } from "../services/userService";
import { UserRepository } from "../repository/userRepository";
import userModel from "../model/userModel";


const userRouter = Router();
const repository = new UserRepository()
const service = new userService(repository)
const controller = new UserController(service)


userRouter.post("/signup", controller.register);
userRouter.post("/login",controller.login);
userRouter.post("/google-login",controller.googleLogin);
userRouter.post("/signup", controller.register);
userRouter.post("/sentOTP",controller.otpVerify)
userRouter.post("/fetchdata",authMiddleware,controller.fetchUserData)
userRouter.post("/logout",controller.logout)
userRouter.post('/forgotPassword1',controller.forgotPassword)
userRouter.post('/ForgotOTPVerify',controller.forgotPasswordOTPVerify)
userRouter.post('/saveNewPassword',controller.saveChangePassword)
userRouter.post('/resendOTP',controller.HandleResendOTP)
userRouter.get('/fetchCoachdata',controller.fetchCoachlist) 
userRouter.get('/fetchUserDetails',controller.fetchUserDetails) 
userRouter.get('/fetchCoachDetails',controller.fetchCoachDetails) 
userRouter.put('/updateUserData',authMiddleware,controller.updateUserProfile)
userRouter.post('/addReview',controller.addReview)
userRouter.post('/addDietGoal',controller.addDietGoal)
userRouter.post('/updateSlot',authMiddleware,controller.updateSlot)

export default userRouter