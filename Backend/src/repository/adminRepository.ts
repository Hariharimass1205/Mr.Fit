import userModel from "../model/userModel"


export const findUserList = async () =>{
    try {
        const users = await userModel.find({isCoach:false}).exec();
        const pendingApprovals = await userModel.find({isApproved:"Pending"}).exec();
        const result = {userList : users.length , pendingApprovalsList:pendingApprovals.length , users}
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const blockUserbyEmail = async (email:string) =>{
    try {
        const blockedUser = await userModel.updateOne({email},{isBlocked:true})
        return blockedUser
    } catch (error) {
        throw new Error(error)
    }
}
export const unblockUserbyEmail = async (email:string) =>{
    try {
        const unblockedUser = await userModel.updateOne({email},{isBlocked:false})
        return unblockedUser
    } catch (error) {
        throw new Error(error)
    }
}