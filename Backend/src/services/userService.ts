import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../repository/userRepository'
import bcrypt from 'bcrypt'

export const registerUser = async (user:any)=>{
    try {
        console.log("back user service")
        const exsitingUser = await findUserByEmail(user.email)
        if(exsitingUser){
            if(exsitingUser.otpVerified){
                throw new Error("User already exists and is verified.");
            }
        }
        const hashedpassword =  await bcrypt.hash(user.password,10)
        user.password = hashedpassword;
        return await createUser(user)
    } catch (error) {
        throw error
    }

}

export { findUserByEmail }
