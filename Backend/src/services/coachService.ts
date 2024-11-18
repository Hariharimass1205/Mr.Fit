import { findUserByEmailandUpdateCoach } from "../repository/coachRepository"

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