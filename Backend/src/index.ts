import express from "express"
import cookieParser from 'cookie-parser';
import {createServer} from 'http'


const app = express()
app.use(express.json())
app.use(cookieParser())
const httpServer = createServer(app)


httpServer.listen(5000,()=>{
    console.log(`server start at port 5000`)
})