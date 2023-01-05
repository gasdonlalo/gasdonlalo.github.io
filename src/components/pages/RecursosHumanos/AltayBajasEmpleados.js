import { Link } from "react-router-dom";

function AltayBajaEmpleados() {
  return (
    <div className="Main">
      <div>
        <Link className="Link-primary" to="/recursos-humanos">
          Volver a recursos humanos
        </Link>
        <h4 className="border-bottom">Altas y Bajas de Empleados</h4>
      </div>
    </div>
  )
};

export default AltayBajaEmpleados;