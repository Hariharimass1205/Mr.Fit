import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCode";
import { CustomRequest } from "../middlesware/jwtVerification";
import { ICoachController } from "../interface/controllers/coachController.interface";
import mongoose, { Types } from "mongoose";
import { ICoachService } from "../interface/services/coachService.interface";


export class CoachController implements ICoachController{
  private coachService : ICoachService;
  constructor(coachService:ICoachService) {
    this.coachService = coachService;
}

saveScore = async  (req:Request,res:Response,next:NextFunction): Promise<void>=>{
    try {
        const {score,coach} = req.body
        const takenn = JSON.parse(coach)
        const data = {score:score,takenn:takenn}
        console.log(coach,score,"from coach controlle")
        const result = await this.coachService.updateCoachScore(data)
        if(result){
       res.status(HttpStatus.OK).json({success:true,result})
        }
    } catch (error) {
        console.error("Error at saving score in coach side");
         next(error);
    }
}
registerCoachController = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void> => {
    try {
      const {role,id} = req.user
      const {formData} = req.body
      console.log(formData,id,role,"forma data from front")
      const result = this.coachService.registerCoachService({
        name:formData.fullName,
        userId:new Types.ObjectId(`${id}`),
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
        address:formData.address,
        licenseOrAadhaar:formData.licenseOrAadhaar,
        role:role
      })
      res.status(HttpStatus.OK).json({success:true})
    } catch (error) {
      console.error("Error at registering  coach");
      next(error);
    }
}

fetchCoachDataController = async (req:CustomRequest,res:Response,next:NextFunction): Promise<void>=>{
  try {
      const {id} = req?.user
      const idd = new mongoose.Types.ObjectId(id)
      const result = await this.coachService.fetchCoachDataService(idd)
      if(result){
        res.status(HttpStatus.OK).json({success:true,result})
      }
  } catch (error) {
    console.error("Error at fetching user data");
    next(error);
  }
}
}

