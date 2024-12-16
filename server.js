import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import cors from "cors";


import userRoute from "./routes/user.js"
const app = express();
const port = 3000;

dotenv.config()
// S4MxnZwgECZFqsey

mongoose.connect(process.env.MONGODB_URL)
// const PORT = process.env.PORT || 4000

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
app.listen(port , () => {
  console.log(`Server iis running on port: http://localhost:${port}`)
}
);