import { useContext } from "react";
import Session from "./Session";

function Auth() {
  const user = useContext(Session);
  return user;
}

export function per(id) {
  return Auth().permisos.some((el) => el[0] === 1 || el[0] === id);
}

export function dep(id) {
  return Auth().permisos.some((el) => el[1] === 1 || el[1] === id);
}

export default Auth;
