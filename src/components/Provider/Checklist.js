import { createContext, useState } from "react";
export const Datos = createContext(null);

function Checklist({ children }) {
  const [data, setData] = useState(null);
  return <Datos.Provider value={[data, setData]}>{children}</Datos.Provider>;
}

export default Checklist;
