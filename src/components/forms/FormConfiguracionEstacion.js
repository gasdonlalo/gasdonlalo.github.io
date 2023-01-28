function FormConfiguracionEstacion() {
  return (
    <div className="main">
      {/* Select para la estación */}
      <div className="container">
        <div className="row">
          <div className="col-4 mb-3">
            <label className="form-label">Estación de servicio</label>
            <select className="form-select">
              <option value="">Selecciona una estacion</option>
              <option value={1}>ID: 1 / GDL 1</option>
              <option value={2}>ID: 2 / GDL 2</option>
            </select>
          </div>
        </div>
      </div>
      {/* Tarjetas */}
      <div className="row mx-5">
        {/* NO.1 */}
        <div className="col mb-3">
          <div
            className="Card d-flex justify-content-between col-4 border border-2"
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
                  M 1
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
                  P 1
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
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 1</h5>
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
                  M 2
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
                  P 2
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label class="form-check-label" for="flexSwitchCheckDefault">
                  M 3
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
                  P 3
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
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 2</h5>
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
                  M 4
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
                  P 4
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault"
                >
                  M 5
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
                  P 5
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
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 3</h5>
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
                  M 6
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
                  P 6
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault"
                >
                  M 7
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
                  P 7
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
                    id="flexSwitchCheckDefault"
                    required
                  ></input>
                </div>
                <h5>Isla 4</h5>
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
                  M 8
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
                  P 8
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault"
                >
                  M 9
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
                  P 9
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
              <div class="form-check form-switch text-success">
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
              <div class="form-check form-switch text-danger">
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
              <div class="form-check form-switch">
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
                  id="flexSwitchCheckDefault"
                ></input>
                <label
                  class="form-check-label text-success"
                  for="flexSwitchCheckDefault"
                >
                  M 11
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
                  P 11
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
              <div class="form-check form-switch text-success">
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
              <div class="form-check form-switch text-danger">
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
              <div class="form-check form-switch">
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
