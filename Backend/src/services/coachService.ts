import { Coach } from "../interface/coach"
import { registerCoachServiceInput, updateCoachScoreInput } from "../interface/services/coachService.type"
import { ICoachService } from '../interface/services/coachService.interface'
import { Types } from "mongoose"
import { ICoachRepository } from "../interface/repository/coachRepository.interface"

export class CoachService implements ICoachService{
    private coachRepository:ICoachRepository
    constructor(coachRepository:ICoachRepository){
      this.coachRepository=coachRepository
    }

 updateCoachScore = async (data:updateCoachScoreInput):Promise<any | null>=>{
    try {
        
        const {score,takenn} = data
        let email = takenn.email
        let res = await this.coachRepository.findUserByEmailandUpdateCoach(score,email)
        console.log(res,"res from ser")
        return res
    } catch (error) {
        throw new Error("error at sendind doc to db in service")
    }
}


 registerCoachService = async (coach:Coach):Promise<registerCoachServiceInput | null>=>{
    try {
        console.log(coach.userId,"userId")
        const exsitingUser = await this.coachRepository.findUserByIdIsCoach(coach.userId)
        if(!exsitingUser){
                throw new Error("Email id not found as user");
        }
        console.log(coach," from ser coach")
        return await this.coachRepository.createCoach(coach)
    } catch (error) {
        throw error
    }
}

 fetchCoachDataService = async (userId:Types.ObjectId):Promise<any | null>=>{
    try {
        const coachData = await this.coachRepository.fetchCoachDataRepo(userId)
        return coachData
    } catch (error) {
        throw new Error("error at fetching data for navbar");
    }
}
}