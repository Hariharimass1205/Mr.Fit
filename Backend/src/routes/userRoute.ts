import { Router } from "express";
import { otpVerify, register } from '../controllers/userController';

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/sentOTP",otpVerify)

export default userRouter
