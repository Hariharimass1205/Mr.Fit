// userController.ts
import { NextFunction, Request, Response } from "express";    
import { otpGenerator } from "../utils/OtoGenerator";
import { checkUser, fetchuserdataService, forgotPassverifyOTPService, loginUser, registerUser, saveNewPassword, saveOTPtoModel, verifyOTPService } from "../services/userService";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { CustomRequest } from "../middlesware/jwtVerification";

export const  register = async (req: Request, res: Response, next: NextFunction)=> {
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
      coachId:null,
      isBlocked:false,
      isCoach:false,
      quizScore:0,
      isApproved:"",
      role:"user" ,
      isRegisted:false
    });
    console.log(otp,req.body.email)
     if(registerUser){
     res.status(HttpStatus.OK).json({success:true});
     }else{
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success:false});
     }
  } catch (error) {
    console.error("Error at registering user",error);
    next(error)
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
    const {user,refreshToken,accessToken} = await loginUser(email,password)
    res.cookie("accessToken",accessToken,{
      sameSite:"strict",
      httpOnly:false
    });
    res.cookie("refreshToken",refreshToken,{
      sameSite:"strict",
      httpOnly:true
    });
    res.status(HttpStatus.OK).json(user)
  } catch (error) {
    console.error("Error at login user");
    next(error);
  }
}

export const logout = (req:Request,res:Response,next:NextFunction)=>{
  try {
    res.clearCookie("refreshToken")
    res.status(HttpStatus.OK).json({success:true})
  } catch (error) {
    console.error("Error at logout user");
    next(error);
  }
}

export const fetchUserData = async (req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
      const {id} = req?.user
      const result = await fetchuserdataService(id)
      console.log(result,"from controlre")
      if(result){
        res.status(HttpStatus.OK).json({success:true,result})
      }
  } catch (error) {
    console.error("Error at fetching user data");
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
    console.error("Error at resend  otpVerification user");
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