import Session from "../models/Session.js";
import Task from "../models/Task.js";

// Start Timer
export const startTimer = async (req, res) => {
  try {
    const { taskId } = req.body;
    const session = await Session.create({
      userId: req.user,
      taskId,
      startTime: new Date(),
    });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Stop Timer
export const stopTimer = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await Session.findOne({
      _id: sessionId,
      userId: req.user,
    });
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.endTime = new Date();
    const duration =
      (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60);
    session.durationMinutes = Math.round(duration);
    await session.save();

    // Update totalMinutesWorked in task
    await Task.findByIdAndUpdate(session.taskId, {
      $inc: { totalMinutesWorked: session.durationMinutes },
    });

    res.json({ message: "Timer stopped", session });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get sessions for a user
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ userId: req.user }).populate("taskId");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
