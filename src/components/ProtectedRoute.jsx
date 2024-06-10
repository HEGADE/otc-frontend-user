import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const ProtectedRoute = ({ redirectPath = "/login" }) => {
  const user = useUserStore((state) => state.user); 

  if (!user?.isEmailVerified || !user?.isPhoneNumberVerified) {
    return <Navigate to={redirectPath} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
