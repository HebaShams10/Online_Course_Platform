import Comment from "../models/comment.js";
import Lesson from "../models/lesson.js";

// Add a comment to a lesson
export const addComment = async (req, res, next) => {
  try {
    const { text, lessonId } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    const comment = await Comment.create({
      text,
      lesson: lessonId,
      user: req.user._id
    });

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// Get comments for a specific lesson
export const getLessonComments = async (req, res, next) => {
  try {
    const { lessonId } = req.params;
    const comments = await Comment.find({ lesson: lessonId })
      .populate("user", "name role"); // Show who commented
      
    res.json(comments);
  } catch (error) {
    next(error);
  }
};
