import { Navigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

function ProtectedRoute({ children}) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/Login" replace />;
}

export default ProtectedRoute;