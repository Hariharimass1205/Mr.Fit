import { generateRefreshToken,generateAccessToken } from '../utils/JWTgenerator'
import { createUser, fetchuserDataRepo, findUserByEmail, findUserByEmailandUpdate, updateUser, updateUserOTP, verifyAndSaveUser } from '../repository/userRepository'
import bcrypt from 'bcrypt'

export const registerUser = async (user:any)=>{
    try {
        const exsitingUser = await findUserByEmail(user.email)
        if(exsitingUser){
            if(exsitingUser.otpVerified){
                throw new Error("Email already Exist");
            }
        }
        const hashedpassword =  await bcrypt.hash(user.password,10)
        user.password = hashedpassword;
        return await createUser(user)
    } catch (error) {
        throw error
    }
}
export const verifyOTPService = async (email:string,otp:string)=>{
    try {
        const user = await findUserByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(user.otp==otp){
          await verifyAndSaveUser(email,otp)
          return "User registered successfully";
        }else{
            throw new Error("OTP invalid")
        }
    } catch (error) {
        throw new Error("Invalid OTP");
    }
}

export const fetchuserdataService = async (userId:string)=>{
    try {
        const data = await fetchuserDataRepo(userId)
        return data
    } catch (error) {
        throw new Error("error at fetching data for navbar");
    }
}

export const loginUser = async (email:string,password:string)=>{
 try {
    const user = await findUserByEmail(email)
    const userId = user._id.toString()
    if(!user){
        throw new Error("Invalid Email/Password")
    }
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword){
        throw new Error("Invalid Email/Password")
    }
    const accessToken = generateAccessToken(userId,user.role)
    const refreshToken = generateRefreshToken(userId,user.role)
    return {user,accessToken,refreshToken}
 } catch (error:any) {
    console.error('Error during login:', error);
    throw new Error(error.message);
 }
}

export const checkUser = async (email:string,otp:string)=>{
    try {
        const saveOTP = await findUserByEmailandUpdate(email,otp)
        saveOTP
        if(!saveOTP){
            throw new Error("user not found")
        }
        console.log(saveOTP.otp,'okoko');
        return saveOTP
    } catch (error) {
        console.log("error at checkUser at service")
        throw new Error("error at checkUser in service in forgotpass")
    }
}

export const forgotPassverifyOTPService = async (email:string,otp:string)=>{
    try {
        const user = await findUserByEmail(email)
        if(!user){
            throw new Error("user not found")
        }
        if(user.otp==otp){
          await verifyAndSaveUser(email,otp)
          return "User registered successfully";
        }else{
            throw new Error("OTP invalid")
        }
    } catch (error) {
        throw new Error("Invalid OTP");
    }
}

export const saveNewPassword = async (password:string,email:string)=>{
    try {
        const hashedpassword =  await bcrypt.hash(password,10)
        const user = await updateUser(email,hashedpassword)
        return user
    } catch (error) {
        throw new Error("error at saving chanage password");
    }
}
export const saveOTPtoModel = async (email:string,otp:string)=>{
    try {
        const user = await updateUserOTP(email,otp)
        return user
    } catch (error) {
        throw new Error("error at saving otp for resend otp");
    }
}