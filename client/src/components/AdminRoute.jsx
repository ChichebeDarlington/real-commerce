import { Navigate } from "react-router-dom";
import { isAuthenticate } from "../auth";

const AdminRoute = ({ children }) => {
  if (isAuthenticate().user.role !== 1) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default AdminRoute;
