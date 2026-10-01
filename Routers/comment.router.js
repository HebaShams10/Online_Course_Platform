import express from "express";
import { addComment, getLessonComments } from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addComment);
router.get("/:lessonId", protect, getLessonComments);

export default router;
