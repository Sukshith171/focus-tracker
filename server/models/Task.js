import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskName: { type: String, required: true },
  category: { type: String },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  totalMinutesWorked: { type: Number, default: 0 },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
