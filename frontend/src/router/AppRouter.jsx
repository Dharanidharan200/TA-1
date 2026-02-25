import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleGuard from "../components/RoleGuard";
import DashboardLayout from "../layout/DashboardLayout";

/* Admin */
import AdminDashboard from "../pages/admin/Dashboard";
import Instructors from "../pages/admin/Instructors";
import ApproveStudents from "../pages/admin/ApproveStudents";

/* Instructor */
import InstructorDashboard from "../pages/instructor/Dashboard";
import InstructorCourses from "../pages/instructor/Courses";
import Availability from "../pages/instructor/Availability";
import CreateQuiz from "../pages/instructor/CreateQuiz";
import AssignQuiz from "../pages/instructor/AssignQuiz";

/* Student */
import StudentDashboard from "../pages/student/Dashboard";
import StudentQuiz from "../pages/student/Quizzes";
import Bookings from "../pages/student/Bookings";
import Register from "../pages/auth/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleGuard role="ADMIN">
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute>
              <RoleGuard role="ADMIN">
                <DashboardLayout>
                  <Instructors />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approve-students"
          element={
            <ProtectedRoute>
              <RoleGuard role="ADMIN">
                <DashboardLayout>
                  <ApproveStudents />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
        {/* INSTRUCTOR */}
        <Route
          path="/instructor"
          element={
            <DashboardLayout>
              <InstructorDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/instructor/courses"
          element={
            <DashboardLayout>
              <InstructorCourses />
            </DashboardLayout>
          }
        />

        <Route
          path="/instructor/availability"
          element={
            <DashboardLayout>
              <Availability />
            </DashboardLayout>
          }
        />
        <Route
          path="/instructor/create-quiz"
          element={<DashboardLayout>
            <CreateQuiz />
          </DashboardLayout>
          }

        />

        <Route
          path="/instructor/assign-quiz"
          element={
            <DashboardLayout>
              <AssignQuiz />
            </DashboardLayout>
          }
        />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <DashboardLayout>
              <StudentDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/student/quiz"
          element={
            <DashboardLayout>
              <StudentQuiz />
            </DashboardLayout>
          }
        />

        <Route
          path="/student/bookings"
          element={
            <DashboardLayout>
              <Bookings />
            </DashboardLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}