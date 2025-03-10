import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
        auth?.roles ? <Outlet /> : auth?.correo 
                ? <Navigate to="/Prohibido" state={{ from: location }} replace />
                : <Navigate to="/Login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
