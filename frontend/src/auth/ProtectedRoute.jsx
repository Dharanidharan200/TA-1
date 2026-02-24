import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children, allowedRoles }) => {

  const { auth } = useAuth();

  if (!auth?.token) {
    return <Navigate to="/" />;
  }

  // eslint-disable-next-line react/prop-types
  if (allowedRoles && !allowedRoles.includes(auth.user?.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;