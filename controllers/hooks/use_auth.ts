import { useContext } from "react";
import AuthContext from "../contexts/auth_context";
import { AuthContextProps } from "../../models";

// nos permite llamar a las variables del contexto
export const useAuth = (): AuthContextProps => useContext(AuthContext);
