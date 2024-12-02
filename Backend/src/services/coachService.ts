import { fetchCoachDataRepo, findUserByEmailandUpdateCoach,  findUserByIdIsCoach } from "../repository/coachRepository"
import { createCoach } from "../repository/coachRepository"

export const updateCoachScore = async (score:number,coach:any)=>{
    try {
        let email = coach.email
        console.log(email,coach,score,"from coachService")
        let res = await findUserByEmailandUpdateCoach(score,email)
        return res
    } catch (error) {
        throw new Error("error at sendind doc to db in service")
    }
}
//export const registerCoachService = async (coach)


export const registerCoachService = async (coach:any)=>{
    try {
        console.log(coach.userId,"userId")
        const exsitingUser = await findUserByIdIsCoach(coach.userId)
        if(!exsitingUser){
                throw new Error("Email id not found as user");
        }
        console.log(coach," from ser coach")
        return await createCoach(coach)
    } catch (error) {
        throw error
    }
}

export const fetchCoachDataService = async (userId:string)=>{
    try {
        const coachData = await fetchCoachDataRepo(userId)
        return coachData
    } catch (error) {
        throw new Error("error at fetching data for navbar");
    }
}