import { Types } from "mongoose";
import { registerCoachServiceInput, updateCoachScoreInput } from "./coachService.type";


export interface ICoachService{
    updateCoachScore(data:updateCoachScoreInput):Promise<any | null>;
    registerCoachService(coach:registerCoachServiceInput):Promise<registerCoachServiceInput | null>;
    fetchCoachDataService(userId:Types.ObjectId):Promise<any | null>;
    saveProfilePic(url:string,userId:Types.ObjectId):Promise<any | null>;
    updateCoachPackage(objData:Object,userId:Types.ObjectId):Promise<any | null>;
    updateCoachProfile(objData:Object,userId:Types.ObjectId):Promise<any | null>;
    updateCoachACHIEVEMENT(coachId:Types.ObjectId,achievements:any,):Promise<any | null>;
}
