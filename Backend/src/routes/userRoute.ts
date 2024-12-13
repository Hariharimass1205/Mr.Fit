import { Router } from "express";
import {UserController} from '../controllers/userController';
import authMiddleware from "../middlesware/jwtVerification";
import { userService } from "../services/userService";
import { UserRepository } from "../repository/userRepository";


const userRouter = Router();
const repository = new UserRepository()
const service = new userService(repository)
const controller = new UserController(service)


userRouter.post("/signup", controller.register);
userRouter.post("/login",controller.login);
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
userRouter.get('/fetchCoachDetails/:id',controller.fetchCoachDetails) 

export default userRouter
