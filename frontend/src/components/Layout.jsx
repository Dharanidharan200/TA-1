import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {

  const { auth, logout } = useAuth();

  return (
    <div>

      <nav style={{
        padding: "15px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        justifyContent: "space-between"
      }}>

        <div>
          <Link to="/dashboard" style={{ color: "white", marginRight: 15 }}>
            Dashboard
          </Link>

          {auth.user?.role === "ADMIN" && (
            <Link to="/admin" style={{ color: "white", marginRight: 15 }}>
              Admin
            </Link>
          )}

          {auth.user?.role === "INSTRUCTOR" && (
            <Link to="/courses" style={{ color: "white", marginRight: 15 }}>
              Courses
            </Link>
          )}

          {auth.user?.role === "STUDENT" && (
            <Link to="/bookings" style={{ color: "white", marginRight: 15 }}>
              Bookings
            </Link>
          )}
        </div>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </nav>

      <div style={{ padding: 20 }}>
        {children}
      </div>

    </div>
  );
};

export default Layout;