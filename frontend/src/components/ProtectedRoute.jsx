import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  // eslint-disable-next-line react/prop-types
  children,
}) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}