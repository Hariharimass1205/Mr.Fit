import { Router } from "express";
import { adminLogin } from "../controllers/adminController";

const adminRouter = Router()

adminRouter.post("/adminlogin",adminLogin)
export default adminRouter