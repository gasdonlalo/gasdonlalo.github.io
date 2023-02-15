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
              {!estacion.error && !estacion.isPending && (
                <option value="">Selecciona una estación de servicio</option>
              )}
              {!estacion.erro &&
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

        {/* NO.2 */}
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
                  id="flexSwitchCheckDefault17"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault17">
                  M 3
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault18"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault18">
                  P 3
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault19"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault19">
                  D 3
                </label>
              </div>
            </div>

            <div className="center-column ">
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
                    id="flexSwitchCheckDefault20"
                    required
                  ></input>
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault20"
                  >
                    <h5>Isla 2</h5>
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
                  id="flexSwitchCheckReverse4"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse4">
                  M 4
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse5"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse5">
                  P 4
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse6"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse6">
                  D 4
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* NO,3 */}
        <div className="col mb-3">
          <div
            className="Card d-flex justify-content-between col-4 border border-3"
            style={{ width: "18rem" }}
          >
            <div className="left-column col-3">
              <div class="form-check form-switch text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault5"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault5"
                >
                  M 5
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault6"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault6">
                  P 5
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault7"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault7">
                  D 5
                </label>
              </div>
            </div>

            <div className="center-column col-4">
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
                    id="flexSwitchCheckDefault21"
                    required
                  ></input>
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault21"
                  >
                    <h5>Isla 3</h5>
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
                  id="flexSwitchCheckReverse7"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse7">
                  M 6
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse8"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse8">
                  P 6
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse9"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse9">
                  D 6
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* NO.4 */}
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
                  id="flexSwitchCheckDefault8"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault8"
                >
                  M 7
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault9"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault9">
                  P 7
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault10"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault10">
                  D 7
                </label>
              </div>
            </div>

            <div className="center-column">
              <i
                className="bi bi-ev-station text-primary"
                style={{ fontSize: "65pt" }}
              ></i>
              <div className="card-body d-flex">
                <div class="form-check form-switch">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault26"
                    required
                  ></input>
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault26"
                  >
                    <h5>Isla 4</h5>
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
                  id="flexSwitchCheckReverse10"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse10">
                  M 8
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse11"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse11">
                  P 8
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckReverse12"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckReverse12">
                  D 8
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* NO.5 */}
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
                  id="flexSwitchCheckDefault11"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault11"
                >
                  M 9
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault12"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault12">
                  P 9
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault13"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault13">
                  D 9
                </label>
              </div>
            </div>

            <div className="center-column">
              <i
                className="bi bi-ev-station text-primary"
                style={{ fontSize: "65pt" }}
              ></i>
              <div className="card-body d-flex">
                <div class="form-check form-switch">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 5</h5>
              </div>
            </div>

            <div className="right-column">
              <div class="form-check form-switch form-check-reverse text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  M 10
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  P 10
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  D 10
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* NO.6 */}
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
                  id="flexSwitchCheckDefault14"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault14"
                >
                  M 11
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault15"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault15">
                  P 11
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault16"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault16">
                  D 11
                </label>
              </div>
            </div>

            <div className="center-column">
              <i
                className="bi bi-ev-station text-primary"
                style={{ fontSize: "65pt" }}
              ></i>
              <div className="card-body d-flex">
                <div class="form-check form-switch">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 6</h5>
              </div>
            </div>

            <div className="right-column">
              <div class="form-check form-switch form-check-reverse text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  M 12
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  P 12
                </label>
              </div>
              <div class="form-check form-switch form-check-reverse">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  D 12
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* NO.7 */}
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault"
                >
                  M 13
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  P 13
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  D 13
                </label>
              </div>
            </div>

            <div className="center-column">
              <i
                className="bi bi-ev-station text-primary"
                style={{ fontSize: "65pt" }}
              ></i>
              <div className="card-body d-flex">
                <div class="form-check form-switch">
                  <input
                    className="form-check-input "
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 7</h5>
              </div>
            </div>

            <div className="right-column">
              <div class="form-check form-switch text-success">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  M 14
                </label>
              </div>
              <div class="form-check form-switch text-danger">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  P 14
                </label>
              </div>
              <div class="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  D 14
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
