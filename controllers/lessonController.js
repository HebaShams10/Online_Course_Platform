import Lesson from "../models/lesson.js";
import Course from "../models/course.js";

// Add a lesson to a course (Instructor only)
export const addLesson = async (req, res, next) => {
  try {
    const { title, content, courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Security Check: Only the instructor of this course can add lessons to it
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only add lessons to your own courses" });
    }

    const lesson = await Lesson.create({
      title,
      content,
      course: courseId
    });

    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
};

// Get lessons for a specific course
export const getCourseLessons = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
};
