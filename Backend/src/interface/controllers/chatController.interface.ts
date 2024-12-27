
import { NextFunction, Request,Response } from "express";
export interface IChatController{
 saveMessage(req: Request, res: Response, next: NextFunction): Promise<void>
 getMessages(req: Request, res: Response, next: NextFunction): Promise<void>
}
