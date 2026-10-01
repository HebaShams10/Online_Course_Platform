import Enrollment from "../models/enrollment.js";
import Course from "../models/course.js";

// Student enrolls in a course
export const enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if student is already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ message: "You are already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId
    });

    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
};

// Get a student's enrolled courses
export const getMyEnrollments = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate("course", "title description category instructor price");
      
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
};
