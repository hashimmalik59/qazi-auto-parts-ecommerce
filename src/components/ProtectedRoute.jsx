import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Agar loading chal raha hai, toh kuch mat dikhao (ya loading spinner)
  if (loading) return null;

  // Agar user nahi hai, toh login page par bhejo
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Agar user hai, toh children (page) dikhao
  return children;
}
