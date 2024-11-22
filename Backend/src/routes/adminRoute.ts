import { Router } from "express";
import { adminLogin, blockUser, changeCoachStatus, sendUserList, unblockUser } from "../controllers/adminController";

const adminRouter = Router()

adminRouter.post("/adminlogin",adminLogin)
adminRouter.post("/blockUser",blockUser)
adminRouter.post("/unblockUser",unblockUser)
adminRouter.post("/fetchUserList",sendUserList)
adminRouter.post("/changeStatus",changeCoachStatus)
export default adminRouter