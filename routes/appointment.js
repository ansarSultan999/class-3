import express from "express";
import { scheduleAppointment } from "../controller/appointment.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/schedule", authMiddleware, scheduleAppointment);

export default router;
