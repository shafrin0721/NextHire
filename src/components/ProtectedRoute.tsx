import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

/** Renders children if user is authenticated, otherwise redirects to login */
export function ProtectedRoute({ children }: Props): JSX.Element {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
