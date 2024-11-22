import jwt from 'jsonwebtoken'
import { blockUserbyEmail, changeStatusByEmail, findUserList, unblockUserbyEmail } from '../repository/adminRepository';

export const adminLOGIN = (email: string, password: string)=> {
    try {
      if (process.env.ADMIN_EMAIL !== email) {
        console.error(Error);
      }
      if (process.env.ADMIN_PASS !== password) {
        console.error(Error);
      }
      const adminToken = jwt.sign(
        {
          AdminEmail: email,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      
      return { adminToken, admin: email };
    } catch (error) {
      throw new Error(error)  
    }
  }

  export const sendUserDataService = async ()=>{
    try {
      const data = findUserList()
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