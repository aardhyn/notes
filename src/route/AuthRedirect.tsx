import { useUser } from "api";
import { LoadingScrim } from "component";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRedirect() {
  const { data: user, isLoading } = useUser();

  // user for user?
  if (isLoading) return <LoadingScrim />;

  // no user? redirect to sign in
  if (!user) return <Navigate to="/sign-in" />;

  // user is logged in, render authenticated routes
  return <Outlet />;
}
