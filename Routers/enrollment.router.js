import express from "express";
import { enrollInCourse, getMyEnrollments } from "../controllers/enrollmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Student routes
router.post("/", protect, enrollInCourse);
router.get("/my-enrollments", protect, getMyEnrollments);

export default router;
