import { Router } from "express";
import { forgotPassword,logout, forgotPasswordOTPVerify, HandleResendOTP, login, otpVerify, register, saveChangePassword, fetchUserData } from '../controllers/userController';
import authMiddleware from "../middlesware/jwtVerification";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/sentOTP",otpVerify)
userRouter.post("/fetchdata",authMiddleware,fetchUserData)
userRouter.post("/login",login);
userRouter.post("/logout",logout)
userRouter.post('/forgotPassword1',forgotPassword)
userRouter.post('/ForgotOTPVerify',forgotPasswordOTPVerify)
userRouter.post('/saveNewPassword',saveChangePassword)
userRouter.post('/resendOTP',HandleResendOTP)

export default userRouter
