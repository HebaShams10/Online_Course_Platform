import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  
  // States for Form (Create/Edit)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  
  // Edit State
  const [editMode, setEditMode] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role === 'Student') {
      fetchMyEnrollments();
    } else {
      fetchInstructorCourses();
    }
  }, [user]);

  const fetchMyEnrollments = async () => {
    try {
      const { data } = await api.get('/enrollments/my-enrollments');
      const enrolledCourses = data.map(enrollment => enrollment.course).filter(c => c !== null);
      setMyCourses(enrolledCourses);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchInstructorCourses = async () => {
    try {
      const { data } = await api.get('/courses');
      const filtered = data.courses.filter(c => c.instructor?._id === user._id || c.instructor === user._id);
      setMyCourses(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  // Switch to Edit Mode and fill form
  const handleEditClick = (course) => {
    setEditMode(true);
    setEditCourseId(course._id);
    setTitle(course.title);
    setDescription(course.description);
    setCategory(course.category);
    setPrice(course.price || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll up to form
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditCourseId(null);
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // UPDATE Existing Course
        await api.put(`/courses/${editCourseId}`, { title, description, category, price: Number(price) });
        alert("Course updated successfully!");
        setEditMode(false);
        setEditCourseId(null);
      } else {
        // CREATE New Course
        await api.post('/courses', { title, description, category, price: Number(price) });
        alert("Course created successfully!");
      }
      
      // Clear form and refresh list
      setTitle('');
      setDescription('');
      setCategory('');
      setPrice('');
      fetchInstructorCourses();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving course');
    }
  };

  if (!user) return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Welcome, {user.name}!</h2>
        <span className="badge bg-secondary fs-6">Role: {user.role}</span>
      </div>
      
      <hr />

      {/* INSTRUCTOR: CREATE / EDIT COURSE FORM */}
      {user.role === 'Instructor' && (
        <div className={`card mb-5 shadow-sm ${editMode ? 'border-warning' : 'border-primary'}`}>
          <div className={`card-header text-white fw-bold ${editMode ? 'bg-warning text-dark' : 'bg-primary'}`}>
            {editMode ? 'Edit Course' : 'Create New Course'}
          </div>
          <div className="card-body bg-light">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Course Title</label>
                  <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Category</label>
                  <input type="text" className="form-control" value={category} onChange={e => setCategory(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price ($)</label>
                  <input type="number" className="form-control" value={price} onChange={e => setPrice(e.target.value)} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className={`btn ${editMode ? 'btn-warning' : 'btn-success'}`}>
                  {editMode ? 'Update Course' : 'Publish Course'}
                </button>
                {editMode && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <h4 className="mb-3">{user.role === 'Student' ? 'My Enrolled Courses' : 'My Created Courses'}</h4>
      <div className="row">
        {myCourses.length === 0 ? (
          <p className="text-muted">No courses found here yet.</p>
        ) : (
          myCourses.map(course => (
            <div className="col-md-4 mb-4" key={course._id}>
              <div className="card h-100 shadow-sm border-0 bg-white" style={{ borderLeft: '5px solid #0d6efd' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary">{course.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{course.category}</h6>
                  <p className="card-text">{course.description}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fw-bold fs-5 text-success">${course.price || 0}</span>
                    {user.role === 'Instructor' && (
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEditClick(course)}
                      >
                        Edit
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

export default Dashboard;
