// userController.ts
import { NextFunction, Request, Response } from "express";    
import { otpGenerator } from "../utils/OtoGenerator";
import { checkUser, forgotPassverifyOTPService, loginUser, registerUser, saveNewPassword, saveOTPtoModel, verifyOTPService } from "../services/userService";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { json } from "stream/consumers";
import { findUserByEmail } from "../repository/userRepository";
import { syncBuiltinESMExports } from "module";

export const register = async (req: Request, res: Response, next: NextFunction)=> {
  try {    
    const otp =  otpGenerator();
    await sendEmail(req.body.email, otp);
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
    console.log(otp,req.body.email)
     res.status(HttpStatus.OK).json("OTP sent to email and saved in the database.");
  
  } catch (error) {
    console.error("Error at registering user",error);
    throw new Error("Error at registering")
  }
};

export const otpVerify = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email, otp } = req.body;
    const result = await verifyOTPService(email,otp)
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
export const forgotPassword = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const {email} = req.body
    const otp = otpGenerator()
    const exsitingUser = await checkUser(email,otp)
  if(!exsitingUser){
     throw new Error("user not found")
  }
    await sendEmail(req.body.email, otp);
   res.status(HttpStatus.OK).json({success:true})
  } catch (error) {
    console.error("Error at forgotPassword sent otp");
    next(error);
  }
}


export const forgotPasswordOTPVerify = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email, otp } = req.body;
    const result = await forgotPassverifyOTPService(email,otp)
    if(result){
    res.status(HttpStatus.OK).json({success:true})
    }
  } catch (error:any) {
    console.error("Error at otpVerification user");
    next(error);
  }
}

export const saveChangePassword = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const {password,email} = req.body
    const result = await saveNewPassword(password,email)
    if(result){
    res.status(HttpStatus.OK).json({success:true})
    }
  } catch (error) {
    console.error("new Password saving");
    next(error);
  }
}
export const HandleResendOTP = async(req:Request,res:Response,next:NextFunction)=>{
try {
  const {email} = req.body
  const otp =  otpGenerator();
  await sendEmail(req.body.email, otp);
  console.log("resend otp:",otp)
  const result = await saveOTPtoModel(email,otp)
  if(result){
  res.status(HttpStatus.OK).json({success:true})
  }
} catch (error) {
  console.error("error at handling resent otp ");
  next(error);
}
}