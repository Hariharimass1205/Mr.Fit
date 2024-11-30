import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { adminLOGIN, blockUserService, changeCoachStatusService, fetchDataService, unblockUserService } from "../services/adminService";

export const adminLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,password} = req.body
      const result = adminLOGIN(email,password)
      if (result) {
        res.cookie("accessToken",
          result.accessToken,
        {httpOnly:false}
        );
        res.cookie("refreshToken",
           result.refreshToken,
          {httpOnly:true}
        );
        res.json({ admin:result.admin });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message:"Login failed" });
      }
    } catch (error) {
      console.error("Error at adminLogin");
      next(error);
    }
  }

  export const fetchDataList = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const result = await fetchDataService()
        res.status(HttpStatus.OK).json(result)
    } catch (error) {
      console.error("Error at sendingUserlist");
      next(error);
    }
  }
  
  export const blockUser = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email} = req.body
      const result = await blockUserService(email)
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
  export const changeCoachStatus = async (req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,newStatus} = req.body
      const result = await changeCoachStatusService(email,newStatus)
      res.status(HttpStatus.OK).json({success:true,result})
    } catch (error) {
      console.error("Error at changing status of coach");
      next(error);
    }
  }

