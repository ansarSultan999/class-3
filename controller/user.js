import express from "express";
import { User } from "../models/user.js";
import JwtService from "../services/jwt-services.js";

export const register = async (req , res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ message: errors.array() });
    // }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });
  
      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }
      user = new User(req.body);
      user.save();
  
      const token = JwtService.sign({ id: user.id }, "1hr");
  
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      });
      return res.status(200).send({ message: "user register sucessfully" });
    } catch (error) {
      console.log(error, "error")
      return res.status(500).send({ message: "something went wrong" });
    }
  };