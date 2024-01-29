import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Utils/Hooks/useAuth";

export default function PrivateRoutes() {
  const { user } = useAuth();
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
}
