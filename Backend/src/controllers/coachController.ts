import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";


export const sendScoretoAdmin = async  (req:Request,res:Response,next:NextFunction)=>{
    try {
        const res = await sendEmail(process.env.ADMIN_EMAIL)

    } catch (error) {
        
    }
}