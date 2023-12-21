import { useAuth } from "api/user";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRedirect() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/sign-in" />;
  else return <Outlet />;
}
