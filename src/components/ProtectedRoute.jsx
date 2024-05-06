import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const user = useUserStore((state) => state.user);

  if (!accessToken && !user) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
