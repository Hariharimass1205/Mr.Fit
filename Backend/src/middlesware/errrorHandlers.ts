import {Request, Response,NextFunction} from 'express'
import { HttpStatus } from '../utils/httpStatusCode';

export const errorHandles = (err:any,req:Request,res:Response,next:NextFunction)=>{
    let errorMessage = err?.message || 'An unexpected error';
    console.log(err)
    console.log('error Handles\n',errorMessage.message);
    res.status(HttpStatus.NOT_FOUND).send({errorMessage,success:false})
}