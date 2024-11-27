import { Router } from "express";
import { adminLogin, blockUser, changeCoachStatus, fetchDataList, unblockUser } from "../controllers/adminController";

const adminRouter = Router()

adminRouter.post("/adminlogin",adminLogin)
adminRouter.post("/blockUser",blockUser)
adminRouter.post("/unblockUser",unblockUser)
adminRouter.post("/fetchUserList",fetchDataList)
adminRouter.post("/changeStatus",changeCoachStatus)
export default adminRouter