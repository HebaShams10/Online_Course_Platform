import express from "express";
import { getCourses, createCourse, updateCourse } from "../controllers/courseController.js";
import { protect, instructorOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route to view courses
router.get("/", getCourses);

// Protected and Instructor Only routes
router.post("/", protect, instructorOnly, createCourse);
router.put("/:id", protect, instructorOnly, updateCourse);

export default router;
