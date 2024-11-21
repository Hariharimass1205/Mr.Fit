import coachModel from "../model/coachModel"
import userModel from "../model/userModel"


export const findUserByEmailandUpdateCoach =async (score,email)=>{
    try {
        const res = await  userModel.updateOne({email},{quizScore:score,isCoach:true,isApproved:"Pending"})
        const updatedScore = await userModel.findOne({email})
        return updatedScore
    } catch (error) {
        throw new Error(error)
    }
}