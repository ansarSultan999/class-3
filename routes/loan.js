import express from "express";
import { requestLoan } from "../controller/loan.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/request", authMiddleware, requestLoan);

export default router;
