import express from "express"
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute'
import cors from 'cors'
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/db.connect";


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

app.use("'user",userRouter)


   

app.get("/",(req,res)=>{
    res.send("jbabnij")
})




app.listen(5000,()=>{
    console.log(`server start at port 5000`)
}) 



