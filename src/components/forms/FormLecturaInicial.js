import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";

function FormConfiguracionEstacion() {
  const [estacionS, setEstacionS] = useState(1);

  const estacion = useGetData("/estaciones-servicio");
  const islas = useGetData(`/liquidacion/islas/${estacionS}`);

  return (
    <div>
      {/* Select para la estación */}
      <div className="row">
        <div className="col-4 mb-3">
          <label className="form-label">Estación de servicio</label>
          <select
            className="form-select"
            name="estacionServicio"
            onChange={(e) => setEstacionS(e.target.value)}
          >
            {estacion.isPending && (
              <option value="">Obteniendo estaciones...</option>
            )}

            {!estacion.error &&
              !estacion.isPending &&
              estacion.data.response.map((el) => (
                <option
                  value={el.idestacion_servicio}
                  key={el.idestacion_servicio}
                >
                  {el.nombre}
                </option>
              ))}
          </select>
        </div>
      </div>

      {!islas.error && !islas.isPending && (
        <Success datos={islas.data.response} />
      )}
      {islas.isPending && <Loader />}
      <div className="text-center text-danger">
        Nota: Solo marca la isla necesaria
      </div>
      <form className="text-center">
        <button
          type="submit"
          className="btn btn-primary m-auto"
          // disabled={pendingForm}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
const Success = ({ datos }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {datos.map((el) => {
        return (
          <div className="col mb-3">
            <div
              className="Card d-flex justify-content-between col-4 border border-3"
              style={{ width: "18rem" }}
            >
              <div className="left-column">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text text-success"
                    id="basic-addon1"
                  >
                    M1
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    aria-label="m1"
                  ></input>
                </div>

                <div class="input-group mb-3">
                  <span
                    className="input-group-text text-danger"
                    id="basic-addon2"
                  >
                    P1
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    aria-label="p1"
                  ></input>
                </div>

                <div class="input-group mb-3">
                  <span
                    className="input-group-text text-danger"
                    id="basic-addon3"
                  >
                    D1
                  </span>
                  <input
                    className="form-control"
                    type="checkbox"
                    aria-label="d1"
                  ></input>
                </div>
              </div>

              <div className="center-column">
                <i
                  className="bi bi-ev-station text-primary"
                  style={{ fontSize: "72pt" }}
                ></i>
                <div className="card-body d-flex">
                  <div class="form-check form-switch">
                    <input
                      className="form-check-input "
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault4"
                      required
                    ></input>
                    <label
                      class="form-check-label"
                      for="flexSwitchCheckDefault4"
                    >
                      <h5>Isla {el.numeroIsla}</h5>
                    </label>
                  </div>
                </div>
              </div>

              <div className="right-column">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text text-success"
                    id="basic-addon4"
                  >
                    M2
                  </span>
                  <input
                    className="form-control"
                    type="text"
                    aria-label="M2"
                  ></input>
                </div>

                <div class="input-group mb-3 text-danger">
                  <span className="input-group-text text-danger">P2</span>
                  <input
                    className="form-control"
                    type="text"
                    aria-label="P2"
                  ></input>
                </div>

                <div class="form-check form-switch form-check-reverse">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckReverse3"
                  ></input>
                  <label class="form-check-label" for="flexSwitchCheckReverse3">
                    D 2
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormConfiguracionEstacion;
