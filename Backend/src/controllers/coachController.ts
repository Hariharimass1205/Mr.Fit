import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { HttpStatus } from "../utils/httpStatusCode";
import { creatCoachDoc } from "../services/coachService";


export const saveScore = async  (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {score,coach} = req.body
        const result = await creatCoachDoc(score,coach)
       res.status(HttpStatus.OK).json("coachScoreStroed")
    } catch (error) {
        throw new Error("error at saving score of coach")
    }
}