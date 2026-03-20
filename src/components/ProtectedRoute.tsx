import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

/** Renders children if user is authenticated, otherwise redirects to login */
export interface RouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export function ProtectedRoute({ children, roles }: RouteProps): JSX.Element {
  const location = useLocation();
  const user = getCurrentUser();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
