import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cors from "cors";
import connectDB from "./db.js";


import userRoute from "./routes/user.js"
const app = express();
const port = 4000;

dotenv.config()


app.use(cors({
  origin: ["*"]
}));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use("/api/auth", userRoute)

app.use('/' , ( req , res ) => {
  res.send('server chal raha hy')
})
connectDB();
app.listen(port , () => {
  console.log(`Server is running on port: http://localhost:${port}`)
});