import express from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

// require('dotenv').config({
//     path: './src/app/config/.env'
// });


app.use(express.json({limit: "16kb"}))

app.use(express.urlencoded({extended :true,limit :"16kb"})) //url me jo extra space ko  "%"  me convert wala jo manage krrega uss k liye

app.use(express.static("public")) 
app.use(cookieParser())

//routes import

import userRouter from './routes/user.routes.js'

//routes declaration

app.use("/api/v1/users",userRouter)
//eg
//http://localhost:8000//api/v1/users/register

export {app}
