import { Types } from "mongoose"
import { User } from "../user"

export interface IUserRepository{
    findUserByEmail(user:string):Promise<any|null>
    fetchuserDataRepo(userId:string):Promise<any|null>
    createUser(user:User):Promise<any|null>
    verifyAndSaveUser(email:string,otp:string):Promise<any|null>
    findUserByEmailandUpdate(email:string,otp:string):Promise<any|null>
    updateUser(email:string,hashedpassword:string):Promise<any|null>
    updateUserOTP(email:string,otp:string):Promise<any|null>
    fetchCoachListRep():Promise<any|null>
    fetchCoachDetailsRep(id:Types.ObjectId):Promise<any|null>
}