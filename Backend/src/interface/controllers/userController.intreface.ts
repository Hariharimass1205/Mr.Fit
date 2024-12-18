import { NextFunction, Request,Response } from "express";
import { CustomRequest } from "../../middlesware/jwtVerification";
export interface IUserController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>
    otpVerify(req: Request, res: Response, next: NextFunction): Promise<void>
    login(req: Request, res: Response, next: NextFunction): Promise<void>
    logout(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchUserData(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchCoachlist(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchCoachDetails(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchUserDetails(req: Request, res: Response, next: NextFunction): Promise<any>
    updateUserProfile(req:CustomRequest,res:Response,next:NextFunction):Promise<any>
}