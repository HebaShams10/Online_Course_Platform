import Course from "../models/course.js";

// Get all courses (with Pagination and Filtering)
export const getCourses = async (req, res, next) => {
  try {
    const category = req.query.category;
    const keyword = req.query.keyword;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filter by category and keyword if provided
    const filter = {};
    if (category) filter.category = category;
    if (keyword) filter.title = { $regex: keyword, $options: "i" };
    
    const courses = await Course.find(filter)
      .populate("instructor", "name email") // Get instructor info
      .skip(skip)
      .limit(limit);
      
    res.json({ courses, page, limit });
  } catch (error) {
    next(error);
  }
};

// Create a new course (Instructor Only)
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;
    
    // req.user is set by the protect middleware
    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id 
    });
    
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

// Update a course (Instructor Only)
export const updateCourse = async (req, res, next) => {
  try {
    const { title, description, category, price } = req.body;
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }

    // Make sure user is the course instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("Not authorized to update this course");
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price !== undefined ? price : course.price;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};
