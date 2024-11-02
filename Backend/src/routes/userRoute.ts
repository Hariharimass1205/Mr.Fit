import { Router } from "express";
import {register} from '../controllers/userController'
import userController from '../controllers/userController'

export const router = Router()

router.post("/signup",userController.register)


