import express from "express"
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute'
import cors from 'cors'
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/db.connect";
import coachRouter from "./routes/coachRoute";
import adminRouter from "./routes/adminRoute";
import { errorHandles } from "./middlesware/errrorHandlers";


dotenv.config()

const app = express()
const morganFormat = ":method :url :status :response-time ms"
connectToMongoDB()    

app.use(cors({
    origin:'http://localhost:3000',
    Credentials:true,
}));
app.use(express.json())
app.use(cookieParser())

app.use("/user",userRouter)
app.use("/coach",coachRouter)
app.use("/admin",adminRouter)


app.use(errorHandles)




app.listen(5000,()=>{
    console.log(`server start at port 5000`)
}) 



