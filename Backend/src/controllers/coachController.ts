import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { updateCoachScore } from "../services/coachService";


export const saveScore = async  (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {score,coach} = req.body
        const takenn = JSON.parse(coach)
        console.log(coach,score,"from coach controlle")
        const result = await updateCoachScore(score,takenn)
       res.status(HttpStatus.OK).json({success:true})
    } catch (error) {
        console.error("Error at saving score in coach side");
         next(error);
    }
}