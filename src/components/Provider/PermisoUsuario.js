import { createContext, useState } from "react";

export const Usuario = createContext(null);

//La uso para cuando creo un usuario y me redirigo a permisos, automaticamente la pagina y los inputs ya saben de que usuario estoy tratando
const PermisoUsuario = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  return (
    <Usuario.Provider value={[usuario, setUsuario]}>
      {children}
    </Usuario.Provider>
  );
};

export default PermisoUsuario;
