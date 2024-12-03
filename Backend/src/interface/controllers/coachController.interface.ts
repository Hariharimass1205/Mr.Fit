import { NextFunction, Request,Response } from "express";
export interface ICoachController{
    saveScore(req: Request, res: Response, next: NextFunction): Promise<void>
    registerCoachController(req: Request, res: Response, next: NextFunction): Promise<void>
    fetchCoachDataController(req: Request, res: Response, next: NextFunction): Promise<void>
}