# Online Course Platform (Full-Stack)

This is a complete Full-Stack application for an Online Course Platform, built using **Node.js, Express, MongoDB (Backend)** and **React + Vite (Frontend)**. It allows users to register as either an **Instructor** or a **Student**. Instructors can create courses, and students can browse, search, and enroll in courses.

This project was built as the Final Individual Project for the Node.js course.

## 🌟 Extra Features Implemented (Bonus Points)
- **React Frontend:** Built a complete UI to interact with the API, demonstrating Full-Stack capabilities beyond the backend requirements.
- **Search & Filtering:** Added search by keyword and category filtering to the courses list.
- **Pagination:** Implemented pagination in the `GET /api/courses` endpoint.
- **CORS Setup:** Configured Cross-Origin Resource Sharing to allow secure frontend-backend communication.

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Security:** JSON Web Token (JWT), Bcrypt.js, CORS

### Frontend
- **Framework:** React.js (via Vite)
- **Styling:** Bootstrap (Clean, responsive UI)
- **HTTP Client:** Axios (with interceptors for JWT token handling)
- **Routing:** React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB running locally or a MongoDB Atlas URI

### 1. Backend Setup
1. Clone the repository and navigate to the root directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Environment Variables:
   Rename `.env.example` to `.env` and fill in the values:
   ```env
   PORT=4000
   MONGO_URI=mongodb://127.0.0.1:27017/blog-system
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a **new terminal window** and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the link provided (usually `http://localhost:5173`).

## 📂 Project Structure

- **Backend:**
  - `/models` - Mongoose database schemas (User, Course, Lesson, Enrollment, Comment)
  - `/controllers` - Business logic for all endpoints
  - `/Routers` - Express route definitions
  - `/middlewares` - Custom middlewares for Auth, RBAC, and Error Handling
- **Frontend (`/frontend`):**
  - `/src/pages` - UI pages (Login, Register, Dashboard, Courses)
  - `/src/components` - Reusable UI components (Navbar)
  - `/src/context` - React Context API for global Authentication state
  - `/src/api` - Axios configuration and interceptors

## 📌 API Endpoints Overview
- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`
- **Courses:** 
  - `GET /api/courses` (Supports `?keyword=`, `?category=`, `?page=`, `?limit=`)
  - `POST /api/courses` (Instructor Only)
  - `PUT /api/courses/:id` (Instructor Only - Update)
- **Lessons:** `POST /api/lessons` (Instructor Only), `GET /api/lessons/:courseId` 
- **Enrollments:** `POST /api/enrollments`, `GET /api/enrollments/my-enrollments`
- **Comments:** `POST /api/comments`, `GET /api/comments/:lessonId`

*Note: For a detailed list of all endpoints, request bodies, and responses, please refer to the included Postman Collection.*