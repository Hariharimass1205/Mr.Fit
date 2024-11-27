import jwt from 'jsonwebtoken'
import { blockUserbyEmail, changeStatusByEmail, fetchDataRepo, unblockUserbyEmail } from '../repository/adminRepository';

export const adminLOGIN = (email: string, password: string)=> {
     
    try {
      if (process.env.ADMIN_EMAIL !== email) {
        throw new Error("Invalid Credential")
      }
      if (process.env.ADMIN_PASS !== password) {
        throw new Error("Invalid Credential")
      }
      
      const accessToken = jwt.sign({email:process.env.ADMIN_EMAIL,isCoach:"admin"},process.env.JWT_SECRET!,{
        expiresIn:"1h"
    })
    const refreshToken = jwt.sign({email:process.env.ADMIN_EMAIL,isCoach:"admin"},process.env.JWT_SECRE!,{
        expiresIn:"7d"
    })
      
      return { accessToken,refreshToken, admin: email };
    } catch (error) {
      throw new Error(error)  
    }
  }

  export const fetchDataService = async ()=>{
    try {
      const data = fetchDataRepo()
      return data
    } catch (error) {
      throw new Error(error) 
    }
  }

  export const blockUserService = async (email:string)=>{
    try {
      const data = blockUserbyEmail(email)
      return data
    } catch (error) {
      console.log("error at handling block in admin service")
      throw new Error(error)
    }
  }
  export const unblockUserService = async (email:string)=>{
    try {
      const data = unblockUserbyEmail(email)
      return data
    } catch (error) {
      console.log("error at handling block in admin service")
      throw new Error(error)
    }
  }

  export const changeCoachStatusService = async (email:string,newStatus:string)=>{
    try {
      const result = await changeStatusByEmail(email,newStatus)
      return result
    } catch (error) {
      console.log("error at changing status of coach in  admin service")
      throw new Error(error)
    }
  }