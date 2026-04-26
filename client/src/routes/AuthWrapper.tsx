import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthWrapper = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isLoggedIn
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthWrapper;