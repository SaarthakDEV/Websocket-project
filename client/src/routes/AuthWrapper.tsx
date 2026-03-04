import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthWrapper;