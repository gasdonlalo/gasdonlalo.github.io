import { Link, useNavigate } from "react-router-dom";

const DetallesMontoFaltente = () => {
  let navigate = useNavigate();
  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho/montos-faltantes">
          Volver al montos faltantes
        </Link>
        <h4 className="border-bottom">Escoge las opciones disponibles</h4>
      </div>
      <div className="d-flex text-white text-center justify-content-center m-auto flex-wrap">
        <button
          className="btn btn-primary p-4 m-1 fw-bold  rounded"
          onClick={() => navigate("/despacho/reporteria/monto-faltante")}
        >
          Montos faltantes por semana
        </button>
        <button
          className="btn btn-primary p-4 m-1 fw-bold  rounded"
          onClick={() =>
            navigate("/despacho/reporteria/monto-faltante/empleado")
          }
        >
          Montos por empleado
        </button>
        <button
          className="btn btn-primary p-4 m-1 fw-bold  rounded"
          onClick={() => navigate("/salidas-no-conformes")}
        >
          Capturar salidas no conformes
        </button>
      </div>
    </div>
  );
};

export default DetallesMontoFaltente;
