import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";

function AdminRoute({ children }) {
  const { user } = useAuth();
  const { isAdmin } = useAdmin();

  if (!user || !isAdmin(user)) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
