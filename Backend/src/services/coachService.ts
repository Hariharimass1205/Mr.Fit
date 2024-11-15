import { errorMonitor } from "events"
import { findUserByEmail } from "../repository/userRepository"


export const creatCoachDoc = async (score:any,coach:any)=>{
    try {
        let res = await findUserByEmail(coach.Email)
    } catch (error) {
        throw new Error("error at sendind doc to db in service")
    }
}