
import { useAuth } from "../../controllers/hooks/use_auth";
import { useEffect, useState } from "react";
import LoadingContainer from "../components/loading_container";
import Login from "./login";

type Props = {
  rol?: Array<number>;
  children: React.ReactNode;
};

// controla el inicio de sesion en la app
const SessionLayout = (props: Props) => {
  const { auth } = useAuth();
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(auth !== null);
  }, [auth]);

  return (
    <LoadingContainer visible={loggedIn === null}>
      {loggedIn ? <>{props.children}</> : <Login />}
    </LoadingContainer>
  );
};

export default SessionLayout;
