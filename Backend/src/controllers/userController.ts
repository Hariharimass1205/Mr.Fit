// userController.ts
import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../utils/OtoGenerator";
import { registerUser } from "../services/userService";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";


export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const otp = await otpGenerator();
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
    console.log(otp,req.body.email)
     res.status(HttpStatus.OK).json("OTP sent to email and saved in the database.");
  } catch (error) {
    console.error("Error at registering user");
    next(error);
  }
};

export const otpVerify = async (req:Request,res:Response,next:NextFunction)=>{
  try {
    const { email, otp } = req.body;
    console.log( "otp verify area")
    res.status(200).json({sucess:true})
  } catch (error) {
    console.error("Error at otpVerification user");
    next(error);
  }
}