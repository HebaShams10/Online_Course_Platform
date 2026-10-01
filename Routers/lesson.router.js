import express from "express";
import { addLesson, getCourseLessons } from "../controllers/lessonController.js";
import { protect, instructorOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Instructor can add lessons
router.post("/", protect, instructorOnly, addLesson);

// Anyone logged in (or specific students) can view lessons
router.get("/:courseId", protect, getCourseLessons);

export default router;
