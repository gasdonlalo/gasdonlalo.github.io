import { Fragment } from "react";
import { Link } from "react-router-dom";

function Calidad() {
    return(
        <div className="Main">
            <h1 className="text-center border-bottom w-100">Calidad</h1>
            <div className="Contenido">
                <div className="captura">
                    <h3>Captura de indicadores de desempeño</h3>
                    <div className="OpcionesCaptura">
                        <Fragment>
                            <Link
                            type="button"
                            className="btn btn-primary"
                            to="/calidad/Ordtrabajo"
                            >
                                Captura de ordenes de trabajo
                            </Link>
                   <Link
                  type="button"
                  className="btn btn-primary"
                  to="/calidad/DetalleMantenimiento"
                >
                  Detalle de Mantenimiento
                        </Link>
                        </Fragment>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Calidad;