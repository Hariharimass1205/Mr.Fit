import { Types } from "mongoose"
import { Coach } from "../coach"
import { User } from "../user"


export interface ICoachRepository{
    findUserByEmailandUpdateCoach(score:number,email:string):Promise<any|null>
    findUserByIdIsCoach(id:Types.ObjectId):Promise<User|null>
    createCoach(coach:Coach):Promise<Coach|null>
    fetchCoachDataRepo(userId:Types.ObjectId):Promise<any|null>
}