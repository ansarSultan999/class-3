import { User } from "../models/user.js";
import JwtService from "../services/jwt-services.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import crypto from "crypto";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const register = async (req, res) => {
  try {
    const { cnic, name, email } = req.body;
    console.log("register", cnic, name, email);
    

    if (!cnic || !name || !email) {
      return res.status(400).json({ message: "CNIC, name, and email are required" });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const randomPassword = crypto.randomBytes(8).toString("hex");
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    let imageUrl = "";
    if (req.body.image) {
      const result = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "users",
      });
      imageUrl = result.secure_url;
    }

    user = new User({
      cnic,
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    await user.save();

    const token = JwtService.sign({ id: user.id }, "1hr");

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.cookie("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    return res.status(200).send({ message: "User registered successfully", password: randomPassword });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).send({ message: "something went wrong" });
  }
};