import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Simpan lokasi halaman asal (misal: /keranjang) ke dalam state route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;