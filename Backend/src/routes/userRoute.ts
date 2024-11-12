import { Router } from "express";
import { login, otpVerify, register } from '../controllers/userController';

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/sentOTP",otpVerify)
userRouter.post("/login",login);

export default userRouter
