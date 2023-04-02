import React from "react";
import InputFecha from "./InputFecha";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";

const FormEntregaRecurso = ({ enviar, handle, formPending, body, setBody }) => {
  const empleados = useGetData(`/empleado`);
  console.log(empleados);
  return (
    <div className="shadow p-2 w-50 m-auto mt-2">
      <form onSubmit={enviar}>
        <HeaderForm />
        <div className="row">
          <div className="col-6">
            <label className="form-label mb-0">Fecha</label>
            <InputFecha
              name="fecha"
              handle={handle}
              data={body}
              setData={setBody}
            />
          </div>
          {/* Tipo de entrada */}
          <div className="col-6">
            <label className="form-label mb-0">Tipo de entrada</label>
            <select
              className="form-select"
              onChange={handle}
              id="entradas"
              name="tipo"
              required
            >
              <option value="">Tipos de entradas</option>
              <option value={1}>Entrega</option>
              <option value={2}>Recibe</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label mb-0 mt-2">Empleado</label>
            {!empleados.error && !empleados.isPending && (
              <InputSelectEmpleado
                empleados={empleados.data.response}
                name="idEmpleado"
                handle={handle}
              />
            )}
          </div>
        </div>
        {/* Recursos */}
        <div className="pt-4 d-flex justify-content-between">
          <div className="left-column">
            {/* 1 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault1"
              ></input>
              <label className="form-check-label" for="flexSwitchCheckDefault1">
                Plumón detector
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  // disabled={!(aceptado === 1 || aceptado === 2)}
                  required
                />
              </div>
            </div>
            {/* 2 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault2"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault2">
                Tabla porta papeles
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 3 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault3"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault3">
                Caja de metal para monedas y documentos
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 4 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault4"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault4">
                Sobre de plástico
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 5 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault5"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault5">
                Hoja de liquidación
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 6 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault6"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault6">
                Sobres para recoleccion parcial (25)
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 7 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault7"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault7">
                Gafete
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 8 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault8"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault8">
                Cartera para vales
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 9 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault9"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault9">
                Uniforme
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 10 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault10"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault10">
                Gorra
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
            {/* 11 */}
            <div class="form-check form-switch text-success">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault11"
              ></input>
              <label class="form-check-label" for="flexSwitchCheckDefault11">
                Impermeable
              </label>
              {/* linea */}
              <div className="col-5 ms-auto p-2 bd-highligh">
                <input
                  className="form-control col-6"
                  type="number"
                  placeholder="Activa el recurso."
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button
            className="btn btn-primary mx-auto d-block"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.5" /> : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEntregaRecurso;
