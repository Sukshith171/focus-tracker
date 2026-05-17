import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  startTimer,
  stopTimer,
  getSessions,
} from "../controllers/sessionController.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/start", startTimer);
router.post("/stop", stopTimer);
router.get("/", getSessions);

export default router;
