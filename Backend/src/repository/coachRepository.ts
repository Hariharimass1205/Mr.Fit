import coachModel from "../model/coachModel"
import userModel from "../model/userModel"


export const findUserByEmailandUpdateCoach =(score,email)=>{
    try {
        const updatedScore =  userModel.updateOne({email},{quizScore:score})
        //const updatedScore2 = coachModel.updateOne({email},{score:score})
        return {success:true}
    } catch (error) {
        throw new Error(error)
    }
}