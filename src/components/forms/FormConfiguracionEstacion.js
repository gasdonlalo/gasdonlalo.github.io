// import { useState } from "react";
import useGetData from "../../hooks/useGetData";

function FormConfiguracionEstacion() {
  // const [bomba, setBomba] = useState(null);
  // const [estacionS, setEstacionS] = useState(null);

  const estacion = useGetData("/estaciones-servicio");

  const changeEstacion = (e) => {
    // setBomba(Number(e.target.value));
    // setEstacionS(Number(e.target.value));
  };

  return (
    <div className="Main">
      {/* Select para la estación */}
      <div className="container">
        <div className="row">
          <div className="col-4 mb-3">
            <label className="form-label">Estación de servicio</label>
            <select
              className="form-select"
              name="estacionServicio"
              onChange={changeEstacion}
              defaultValue={1}
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
      </div>
      {/* Tarjetas */}
      <div className="row mx-5">
        {/* NO.1 */}
        <div className="col mb-3">
          <div
            className="Card d-flex justify-content-between col-4 border border-3"
            style={{ width: "18rem" }}
          >
            <div className="left-column">
              <div class="form-check form-switch text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault1"
                ></input>
                <label>M 1</label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                ></input>
                <label>P 1</label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault3"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault3">
                  D 1
                </label>
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
                  <label class="form-check-label" for="flexSwitchCheckDefault4">
                    <h5>Isla 1</h5>
                  </label>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div class="form-check form-switch form-check-reverse text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse1"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse1">
                  M 2
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse2"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse2">
                  P 2
                </label>
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
      </div>
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

export default FormConfiguracionEstacion;
