import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { getCurrentUser } from "../utils/auth";
import { Link } from "react-router-dom";

interface Props {
  message?: string;
}

export const AccessDeniedMessage = ({ message = "Access restricted to HR and Admin users only." }: Props): JSX.Element => {
  const user = getCurrentUser();
  const role = user?.role;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          {message}
          <br />
          {role && (
            <span className="font-semibold text-red-600">
              Your role: {role.toUpperCase()}
            </span>
          )}
        </p>
        <div className="space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link to="/dashboard">My Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

