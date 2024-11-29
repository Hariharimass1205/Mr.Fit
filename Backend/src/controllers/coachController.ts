import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { fetchCoachDataService, registerCoachService, updateCoachScore } from "../services/coachService";
import { CustomRequest } from "../middlesware/jwtVerification";


export const saveScore = async  (req:Request,res:Response,next:NextFunction)=>{
    try {
        const {score,coach} = req.body
        const takenn = JSON.parse(coach)
        console.log(coach,score,"from coach controlle")
        const result = await updateCoachScore(score,takenn)
        if(result){
       res.status(HttpStatus.OK).json({success:true,result})
        }
    } catch (error) {
        console.error("Error at saving score in coach side");
         next(error);
    }
}
export const registerCoachController = async (req:CustomRequest,res:Response,next:NextFunction) => {
    try {
      const {role,id} = req.user
      console.log(role,id,"from con")
      const {formData} = req.body
      const result = registerCoachService({
        name:formData.fullName,
        userId:id,
        phone:formData.phone,
        age:formData.age,
        height:formData.height,
        weight:formData.weight,
        noOfStudentsCoached:0,
        Students:[],
        availability:formData.availability,
        achievementBadges:[],
        package:[],  
        state:formData.state,
        city:formData.city,
        locality:formData.locality,
        licenseOrAadhaar:formData.licenseOrAadhaar,
        role:role
      })
      res.status(HttpStatus.OK).json({success:true})
    } catch (error) {
      console.error("Error at registering  coach");
      next(error);
    }
}

export const fetchCoachDataController = async (req:CustomRequest,res:Response,next:NextFunction)=>{
  try {
      const {id} = req?.user
      const result = await fetchCoachDataService(id)
      console.log(result,"from coach controlre")
      if(result){
        res.status(HttpStatus.OK).json({success:true,result})
      }
  } catch (error) {
    console.error("Error at fetching user data");
    next(error);
  }
}
