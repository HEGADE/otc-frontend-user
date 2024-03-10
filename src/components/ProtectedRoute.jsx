import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const isAuthenticated = useUserStore((state) => !!state.accessToken);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;