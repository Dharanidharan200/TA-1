import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseList from "./pages/courses/CourseList";
import CreateCourse from "./pages/courses/CreateCourse";
import BookingList from "./pages/booking/BookingList";
import CreateBooking from "./pages/booking/CreateBooking";
import Approvals from "./pages/admin/Approvals";
import ManageUsers from "./pages/admin/ManageUsers";
import QuizList from "./pages/quiz/QuizList";
import QuizAttempt from "./pages/quiz/QuizAttempt";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute roles={["INSTRUCTOR"]}>
                <CourseList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-course"
            element={
              <ProtectedRoute roles={["INSTRUCTOR"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute roles={["STUDENT", "INSTRUCTOR", "ADMIN"]}>
                <BookingList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-booking"
            element={
              <ProtectedRoute roles={["STUDENT"]}>
                <CreateBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approvals"
            element={<ProtectedRoute roles={["ADMIN"]}><Approvals /></ProtectedRoute>}
          />

          <Route
            path="/admin/users"
            element={<ProtectedRoute roles={["ADMIN"]}><ManageUsers /></ProtectedRoute>}
          />

          <Route
            path="/quiz"
            element={<ProtectedRoute roles={["STUDENT"]}><QuizList /></ProtectedRoute>}
          />

          <Route
            path="/quiz/:id"
            element={<ProtectedRoute roles={["STUDENT"]}><QuizAttempt /></ProtectedRoute>}
        />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;   // ✅ VERY IMPORTANT