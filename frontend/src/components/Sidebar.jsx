import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // 👈 add

  const handleLogout = () => {
    logout();              // clear auth
    navigate("/login");   // redirect
  };

  return (
    <div className="sidebar">

      {user?.role === "ADMIN" && (
        <>
          <NavLink to="/admin/instructors">Instructors</NavLink>
          <NavLink to="/admin/approve-students">Approve Students</NavLink>
        </>
      )}

      {user?.role === "INSTRUCTOR" && (
        <>
          <NavLink to="/instructor">
            Dashboard
          </NavLink>

          <NavLink to="/instructor/courses">
            Courses
          </NavLink>

          <NavLink to="/instructor/create-quiz">
            Create Quiz
          </NavLink>

          <NavLink to="/instructor/assign-quiz">
            Assign Quiz
          </NavLink>
        </>
      )}

      {user?.role === "STUDENT" && (
        <>
          <NavLink to="/student">
            Dashboard
          </NavLink>
          
        </>
      )}

      <button
        style={{ marginTop: 30 }}
        onClick={handleLogout}  // 👈 changed
      >
        Logout
      </button>
    </div>
  );
}