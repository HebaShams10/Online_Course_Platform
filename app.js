import express from "express";
import cors from "cors";
import authRoutes from "./Routers/auth.router.js";
import courseRoutes from "./Routers/course.router.js";
import lessonRoutes from "./Routers/lesson.router.js";
import enrollmentRoutes from "./Routers/enrollment.router.js";
import commentRoutes from "./Routers/comment.router.js";
import errorMiddleware from "./middlewares/errorHandling.js";

const app = express();

// Enable CORS for frontend
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Basic Health Check Route
app.get("/api/health", (req, res) => {
  res.json({ status: "API is running successfully" });
});

// Main Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/comments", commentRoutes);

// Fallback for not found routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Global Error Handler Middleware
app.use(errorMiddleware);

export default app;