import express from "express";
import loanRoutes from "./routes/loan.js";
import appointmentRoutes from "./routes/appointment.js";
// ...existing code...

const app = express();

// ...existing code...

app.use("/api/loans", loanRoutes);
app.use("/api/appointments", appointmentRoutes);

// ...existing code...
