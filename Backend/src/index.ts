import express from "express"
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute'
import cors from 'cors'
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/db.connect";
import coachRouter from "./routes/coachRoute";
import adminRouter from "./routes/adminRoute";
import { errorHandles } from "./middlesware/errrorHandlers";
import paymentRouter from "./routes/paymentRoute";
import morgan from 'morgan';
import chatRouter from "./routes/chatRouter";



const myFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
dotenv.config()

const app = express()
connectToMongoDB()    

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(morgan(myFormat))

app.use("/user",userRouter)
app.use("/payment",paymentRouter)
app.use("/coach",coachRouter)
app.use("/admin",adminRouter)
app.use("/chat",chatRouter)

app.use(errorHandles)

app.listen(5000,()=>{
    console.log(`server start at port 5000`)
}) 