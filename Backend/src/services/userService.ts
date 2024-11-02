import jwt from 'jsonwebtoken'

export const registerUser =(user:any)=>{
    try {
        const exsitingUser = await findUserByEmail(user.email)
        
    } catch (error) {
        
    }

}