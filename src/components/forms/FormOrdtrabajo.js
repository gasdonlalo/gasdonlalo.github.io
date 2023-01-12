import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import HeaderForm from "../../GUI/HeaderForm";

function FormOrdtrabajo({ handle, enviar, pendingForm }) {
  const estacion = useGetData("/estaciones-servicio");
  const empleado = useGetData("/empleado");
  const areas = useGetData(`/orden-trabajo-calidad/areas`);
  const [drawArea, setDrawArea] = useState([]);

  const changeAreas = (e) => {
    if (!areas.error && !areas.isPending) {
      let filtro = areas.data.response.filter(
        (el) => el.idmantenimiento === Number(e.target.value)
      );
      setDrawArea(filtro);
    }
  };

  return (
    <div className="container">
      <form onSubmit={enviar} className="shadow p-2 mt-4 w-75 m-auto">
        <HeaderForm />
        <div className="row">
          <div className="col-6 mb-3">
            <label className="form-label">Fecha y hora de inicio</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaInicio"
              onChange={handle}
              onDoubleClickCapture={handle}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Fecha y hora de termino</label>
            <input
              type="datetime-local"
              className="form-control"
              name="fechaTermino"
              onChange={handle}
              onDoubleClickCapture={handle}
              required
            />
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Tipo de mantenimiento</label>
            <select
              className="form-select"
              name="tipoMantenimiento"
              onChange={handle}
              required
            >
              <option value="">Mantenimiento</option>
              <option value={1}>Correctivo</option>
              <option value={2}>Preventivo</option>
            </select>
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Tipo de reparación</label>
            <select className="form-select" onChange={changeAreas} required>
              <option value="">Selecciona un tipo de reparación</option>
              <option value={1}>Reparaciones</option>
              <option value={2}>Limpieza</option>
              <option value={3}>Pintura</option>
            </select>
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Área</label>
            <select
              className="form-select"
              name="idArea"
              onChange={handle}
              required
            >
              <option value="">Selecciona un área</option>
              {drawArea.length > 0 ? (
                drawArea.map((el) => (
                  <option key={el.idarea} value={el.idarea}>
                    {el.area}
                  </option>
                ))
              ) : (
                <option value="">Sin areas</option>
              )}
            </select>
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Empleado solicita</label>
            <select
              className="form-select"
              name="idEmpleadoSolicita"
              onChange={handle}
              required
            >
              <option value="">Empleado</option>
              {!empleado.error &&
                !empleado.isPending &&
                empleado.data.response.map((el) => (
                  <option value={el.idempleado} key={el.idempleado}>
                    {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-4 mb-3">
            <label className="form-label">Estación de servicio</label>
            <select
              className="form-select"
              name="idEstacionServicio"
              onChange={handle}
              required
            >
              <option value="">Estacion servicio</option>
              {!estacion.error &&
                !estacion.isPending &&
                estacion.data.response.map((el) => (
                  <option
                    value={el.idestacion_servicio}
                    key={el.idestacion_servicio}
                  >
                    {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Descripción de falla</label>
            <textarea
              className="form-control"
              name="descripcionFalla"
              rows="4"
              placeholder="Falla"
              defaultValue={null}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary m-auto"
          disabled={pendingForm}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormOrdtrabajo;
