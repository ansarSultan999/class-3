import Appointment from "../models/appointment.js";

export const scheduleAppointment = async (req, res) => {
  try {
    const { date, time, description } = req.body;
    console.log("scheduleAppointment", date, time, description);

    if (!date || !time || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const appointment = new Appointment({
      userId: req.user.id,
      date,
      time,
      description,
    });

    await appointment.save();

    return res.status(200).send({ message: "Appointment scheduled successfully" });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).send({ message: "Something went wrong" });
  }
};
