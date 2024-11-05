// userController.ts
import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../utils/OtoGenerator";
import { registerUser } from "../services/userService";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { log } from "console";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const otp = await otpGenerator();
    console.log(otp)
    await registerUser({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      DOB: "",
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      gender: req.body.gender,
      address: "",
      state: "",
      district: "",
      pincode: 0,
      coachId: "",
    });
    await sendEmail(req.body.email, otp);
    res.status(HttpStatus.OK).json("OTP sent to email and saved in the database.");
  } catch (error) {
    console.error("Error at registering user");
    next(error);
  }
};


export const otpVerify = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    let {otp} = req.body
    console.log(req.body)
  } catch (error) {
    console.error("Error at otpVerification user");
    next(error);
  }
}