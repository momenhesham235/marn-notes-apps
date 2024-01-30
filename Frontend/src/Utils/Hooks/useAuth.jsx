import { useContext } from "react";
import AuthContext from "../../Store/Contexts/auth/auth";

export const useAuth = () => useContext(AuthContext);
