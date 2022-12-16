import { Fragment } from "react";
import { Link } from "react-router-dom";

function Despacho() {
  return (
    <Fragment>
      <h1 className="text-center border-bottom w-100">Despacho</h1>
      <div className="Contenido">
        <div className="Captura">
          <h3>Captura de indicadores de desempeño</h3>
          <div className="OpcionesCaptura">
            <Fragment>
              <Link
                type="button"
                className="btn btn-primary"
                to="/despacho/montos-faltantes"
              >
                Monto faltante
              </Link>
              <Link
                type="button"
                className="btn btn-primary"
                to="/despacho/checklist"
              >
                Checklist de bombas
              </Link>
              <Link
                type="button"
                className="btn btn-primary"
                to="/despacho/evaluacion-uniforme"
              >
                Evaluación de uniforme
              </Link>
            </Fragment>
            <Link type="button" className="btn btn-primary">
              Recoleccion de efectivo
            </Link>
            <Link type="button" className="btn btn-primary">
              Pasos para despachar
            </Link>
            <Link type="button" className="btn btn-primary">
              Recursos de despachador
            </Link>
          </div>
        </div>
        <div className="Reporteria">
          <h3>Reporteria</h3>
          <div className="OpcionesReporteria">
            <Link
              type="button"
              className="btn btn-primary disabled"
              to="/montos-faltantes"
            >
              Grafica monto faltante
            </Link>
            <Link type="button" className="btn btn-primary disabled" to="">
              Grafica mensual registro checklist
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Despacho;
