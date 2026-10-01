import React, { useEffect, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCourses();
  }, [search]); // Will fetch when search state changes

  const fetchCourses = async () => {
    try {
      // Send the search keyword to the backend
      const { data } = await api.get(`/courses?keyword=${search}`);
      setCourses(data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/enrollments', { courseId });
      alert("Successfully enrolled in the course!");
    } catch (err) {
      alert(err.response?.data?.message || 'Error enrolling');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Courses</h2>
        
        {/* Search Bar */}
        <div style={{ width: '300px' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search courses..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      <div className="row">
        {courses.length === 0 ? (
          <p className="text-muted">No courses found matching your search.</p>
        ) : (
          courses.map(course => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{course.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{course.category}</h6>
                  <p className="card-text mb-4">{course.description}</p>
                  
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5 text-success">${course.price}</span>
                    {user?.role === 'Student' && (
                      <button 
                        className="btn btn-primary" 
                        onClick={() => handleEnroll(course._id)}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Courses;
