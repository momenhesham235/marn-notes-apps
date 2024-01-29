import { useContext } from "react";
import AuthContext from "../../Store/Context/authContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
