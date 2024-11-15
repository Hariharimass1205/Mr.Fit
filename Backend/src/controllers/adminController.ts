import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { adminLOGIN } from "../services/adminService";

export const adminLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const {email,password} = req.body
      console.log(email,password)
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