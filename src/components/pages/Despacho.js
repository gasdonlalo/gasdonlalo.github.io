import { Fragment } from "react";
import { Link } from "react-router-dom";

function Despacho() {
  return (
    <div className="Main">
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
                className="btn btn-primary "
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
            <Link type="button" className="btn btn-primary disabled">
              Recoleccion de efectivo
            </Link>
            <Link type="button" className="btn btn-primary disabled">
              Pasos para despachar
            </Link>
            <Link type="button" className="btn btn-primary disabled">
              Recursos de despachador
            </Link>
          </div>
        </div>
        {/* Comienza reporteria */}
        <div className="Reporteria">
          <h3>Reporteria</h3>
          <div className="OpcionesReporteria">
            <Link
              type="button"
              className="btn btn-primary"
              to="/despacho/reporteria/monto-faltante"
            >
              Grafica monto faltante
            </Link>
            <Link
              type="button"
              className="btn btn-primary "
              to="/despacho/reporteria/registro-checklist"
            >
              Grafica mensual registro checklist
            </Link>
            <Link
              type="button"
              className="btn btn-primary"
              to="/despacho/reporteria/uniforme"
            >
              Grafica de uniforme
            </Link>
            <Link type="button" className="btn btn-primary disabled">
              Grafica de incumplimientos de recoleccion de efectivo
            </Link>
            <Link type="button" className="btn btn-primary disabled">
              Analisis de evaluacion de pasos para despachar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Despacho;
