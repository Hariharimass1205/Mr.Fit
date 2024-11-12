// userController.ts
import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../utils/OtoGenerator";
import { loginUser, registerUser, verifyOTPService } from "../services/userService";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { json } from "stream/consumers";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const otp = await otpGenerator();
    await registerUser({
      userName: req.body.userName,
      email: req.body.email,
      phone: req.body.phone,
      DOB: "",
      otp:otp,
      password: req.body.password,
      gender: req.body.gender,
      address: "",
      state: "",
      district: "",  
      pincode: 0,
      coachId: ""      
    });
    await sendEmail(req.body.email, otp);
    console.log(otp,req.body.email)
     res.status(HttpStatus.OK).json("OTP sent to email and saved in the database.");
  } catch (error) {
    console.error("Error at registering user");
    throw new Error("Error at registering")
  }
};

export const otpVerify = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email, otp } = req.body;
    console.log(otp)
    const result = await verifyOTPService(email,otp)
    console.log(result)
    res.status(200).json({result})
  } catch (error:any) {
    console.error("Error at otpVerification user");
    next(error);
  }
}
export const login = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {email,password} = req.body
    const {user,token} = await loginUser(email,password)
    res.cookie("token",token,{
      sameSite:"strict",
      maxAge:3600000
    });
    res.status(HttpStatus.OK).json({user,token})
  } catch (error) {
    console.error("Error at otpVerification user");
    next(error);
  }
}