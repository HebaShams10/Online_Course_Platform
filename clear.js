import mongoose from 'mongoose';

const clearCourses = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/blog-system');
    await mongoose.connection.collection('courses').deleteMany({});
    console.log('Courses cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

clearCourses();
