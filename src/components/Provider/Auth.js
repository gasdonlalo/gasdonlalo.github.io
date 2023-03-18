import { useState, useContext } from "react";
import Session from "./Session";
import FormLogin from "../../GUI/Auth";
import Axios from "../../Caxios/Axios";

function Auth({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("Credentials")) || null
  );

  (async function () {
    if (auth) {
      try {
        await Axios.get("/auth");
      } catch (err) {
        localStorage.removeItem("Credentials");
        setAuth(null);
      }
    }
  })();

  if (auth) {
    return (
      <Session.Provider value={[auth, setAuth]}>{children}</Session.Provider>
    );
  } else {
    return (
      <div>
        <FormLogin setAuth={setAuth}></FormLogin>
      </div>
    );
  }
}

export const Per = (id) => {
  const datos = useContext(Session);
  return datos[0].permisos.some((el) => el[0] === 1 || el[0] === id);
};

export const Dep = (id) => {
  const datos = useContext(Session);
  return datos[0].permisos.some((el) => el[1] === 1 || el[1] === id);
};

export const Data = () => {
  const datos = useContext(Session);
  return datos;
};

export default Auth;
