import { ThemeProvider } from "styled-components";
import "devextreme/dist/css/dx.light.css";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../controllers/styles/global";
import theme from "../controllers/styles/theme";
import { useLocalStorage } from "../controllers/hooks/use_local_storage";
import { useMemo, useState } from "react";
import AuthContext from "../controllers/contexts/auth_context";
import { AuthContextProps, Usuario,  } from "../models";
import SessionLayout from "./layouts/session_layout";
import { useNoScroll } from "../controllers/hooks/use_no_scroll";
import "../styles/global.css";
import ToastContainer from "./components/toastify";

// configuracion general de la app
export default function App({ Component, pageProps }) {
  // hook para obtener los datos de usuario en el local storage
  const { storedValue, setValue, removeValue } = useLocalStorage("userData");
  // estado del usuario en la app - recuperar del localStorage si existe
  const [auth, setAuth] = useState(storedValue);

  useNoScroll().set();

  // permite iniciar sesion
  const login = (userData: Usuario) => {
    setValue(userData);
    setAuth(userData);
  };

  // permite cerrar sesion
  const logout = () => {
    if (auth) {
      setAuth(null);
      removeValue();
    }
  };

  // guarda y actualiza las variables del contexto
  const authData = useMemo<AuthContextProps>(
    () => ({ auth, login, logout }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );

  return (
    // provee de variables de context
    <AuthContext.Provider value={authData}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
      {/* muestra alertas */}
      <ToastContainer />
      <SessionLayout>
        {/* ruta actual renderizada */}
        <Component {...pageProps} />
      </SessionLayout>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
