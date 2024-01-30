import { useUser } from "api";
import { LoadingScrim } from "component";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRedirect() {
  const { data: user, isLoading, isSuccess, isError } = useUser();

  // user for user?
  if (isLoading) return <LoadingScrim />;

  // no user? redirect to sign in
  if (!isSuccess && (!user || isError)) return <Navigate to="/sign-in" />;

  // user is logged in, render authenticated routes
  return <Outlet />;
}
