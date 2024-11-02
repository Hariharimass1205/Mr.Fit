import { NextFunction, Request, Response } from "express";
import { otpGenerator } from "../utils/OtoGenerator";
import { registerUser } from "../services/userService";

export const register = async (req:Request, res:Response , next: NextFunction )=> {
    try {
        const otp = await otpGenerator();
        await registerUser({
            fullName:req.body.fullname,
            email:req.body.email,
            phone:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword,
            gender:req.body.gender,
            _id: undefined,
            address: "",
            state: "",
            district:"",
            pincode: 0,
            reviews: undefined,
        })
    } catch (error) {
        console.log("error at registering user ")
        next(error)
    }
}