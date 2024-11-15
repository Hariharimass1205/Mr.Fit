import { Router } from "express";
import { forgotPassword, forgotPasswordOTPVerify, login, otpVerify, register, saveChangePassword } from '../controllers/userController';

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/sentOTP",otpVerify)
userRouter.post("/login",login);
userRouter.post('/forgotPassword1',forgotPassword)
userRouter.post('/ForgotOTPVerify',forgotPasswordOTPVerify)
userRouter.post('/saveNewPassword',saveChangePassword)

export default userRouter
