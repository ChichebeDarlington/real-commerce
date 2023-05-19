import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticate()) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default ProtectedRoute;
