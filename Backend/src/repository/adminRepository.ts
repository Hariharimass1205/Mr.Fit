import { IAdminRepository } from "../interface/repository/adminRepository.interface";
import userModel from "../model/userModel"

export class adminReository implements IAdminRepository{
 fetchDataRepo = async () =>{
    try {
        const users = await userModel.find({isCoach:false}).exec();
        const coaches = await userModel.find({isCoach:true}).exec();
        const pendingApprovals = await userModel.find({isApproved:"Pending"}).exec();
        const enrolledUsers = await userModel.countDocuments({coachId:{$ne:null}}).exec();
        const result = {
            userList : users.length ,
            pendingApprovalsList:pendingApprovals.length ,
            users,
            coachList:coaches.length,
            coaches:coaches,
            enrolledUsers:enrolledUsers
        }
        return result
    } catch (error) {
        throw new Error(error)
    }
}

 blockUserbyEmail = async (email:string) =>{
    try {
        const blockedUser = await userModel.updateOne({email},{isBlocked:true})
        return blockedUser
    } catch (error) {
        throw new Error(error)
    }
}
 unblockUserbyEmail = async (email:string) =>{
    try {
        const unblockedUser = await userModel.updateOne({email},{isBlocked:false})
        return unblockedUser
    } catch (error) {
        throw new Error(error)
    }
}
 changeStatusByEmail = async (email:string,newStatus:string)=>{
    try {
        const changedStatus = await userModel.updateOne({email},{isApproved:newStatus})
        const updatedStatus = await userModel.findOne({email})
        return updatedStatus
    } catch (error) {
        throw new Error(error)
    }
}
}