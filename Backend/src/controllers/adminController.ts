import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { adminLOGIN, blockUserService, sendUserDataService, unblockUserService } from "../services/adminService";

export const adminLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,password} = req.body
      const result = await adminLOGIN(email,password)
      if (result) {
        res.cookie("adminToken", result.adminToken);
        res.json({ adminToken: result.adminToken, admin: result.admin });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Login failed" });
      }
    } catch (error) {
      console.error("Error at adminLogin");
      next(error);
    }
  }

  export const sendUserList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await sendUserDataService()
        res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.error("Error at sendingUserlist");
      next(error);
    }
  }
  export const blockUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email} = req.body
      console.log(email,"block email")
      const result = await blockUserService(email)
      console.log(result,"------controller result")
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at blockUser");
      next(error);
    }
  }
  export const unblockUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email} = req.body
      const result = await unblockUserService(email)
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at blockUser");
      next(error);
    }
  }