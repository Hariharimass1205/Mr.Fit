import { Types } from "mongoose";
import { registerCoachServiceInput, updateCoachScoreInput } from "./coachService.type";


export interface ICoachService{
    updateCoachScore(data:updateCoachScoreInput):Promise<any | null>;
    registerCoachService(coach:registerCoachServiceInput):Promise<registerCoachServiceInput | null>;
    fetchCoachDataService(userId:Types.ObjectId):Promise<any | null>;
}
