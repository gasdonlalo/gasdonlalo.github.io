import { useContext } from "react";
import Session from "./Session";

function Auth() {
  const user = useContext(Session);
  console.log(user);
  return user;
}

export function per(id) {
  return Auth()
    ? Auth().permisos.some((el) => el[0] === 1 || el[0] === id)
    : false;
}

export function dep(id) {
  return Auth()
    ? Auth().permisos.some((el) => el[1] === 1 || el[1] === id)
    : false;
}

export default Auth;
