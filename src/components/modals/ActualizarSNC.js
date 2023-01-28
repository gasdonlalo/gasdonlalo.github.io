import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import InputFecha from "../forms/InputFecha";
import InputSelectEmpleado from "../forms/InputSelectEmpleado";
import AlertSuccess from "../alerts/AlertSuccess";

function ActualizarSNC({ show, handleClose, id, setActualizar, actualizar }) {
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const SNC = useGetData(`salida-no-conforme/${id}`);

  const defaultDatos = !SNC.data
    ? false
    : SNC.data.response.map((e) => {
        return {
          fecha: format.formatFechaDB(e.fecha),
          descripcionFalla: e.descripcion_falla,
          idEmpleadoIncumple: e.idempleado_incumple,
          idIncumplimiento: e.idincumplimiento,
          nombre: e.nombre_completo_incumple,
          accionesCorregir: e.acciones_corregir,
          concesiones: e.concesiones,
        };
      });
  const [datos, setDatos] = useState({
    fecha: !defaultDatos ? null : defaultDatos[0].fecha,
    descripcionFalla: !defaultDatos ? null : defaultDatos[0].descripcion_falla,
    idEmpleadoIncumple: !defaultDatos
      ? null
      : defaultDatos[0].idempleado_incumple,
    idIncumplimiento: !defaultDatos ? null : defaultDatos[0].idincumplimiento,
    accionesCorregir: !defaultDatos ? null : defaultDatos[0].acciones_corregir,
    concesiones: !defaultDatos ? null : defaultDatos[0].concesiones,
  });
  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const empleado = useGetData("/empleado?departamento=1");
  const incumplimiento = useGetData("/incumplimiento");
  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
    enviarDatos();
  };

  const enviarDatos = async () => {
    try {
      await Axios.put(`/salida-no-conforme/${id}`, datos);
      setShowAlertSucces(true);
      setTimeout(() => {
        setShowAlertSucces(false);
        handleClose();
        setActualizar(!actualizar);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar salida no conforme {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={enviar}>
            <div className="mb-3">
              <label>Fecha</label>
              <InputFecha
                name="fecha"
                data={datos}
                setData={setDatos}
                handle={handle}
                //defaultValue={!defaultDatos ? null : defaultDatos[0].fecha}
              />
            </div>
            <div className="mb-3">
              <label>Descripcion del motivo</label>
              <textarea
                className="form-control"
                placeholder="Describe el nuevo motivo"
                required
                name="descripcionFalla"
                onChange={handle}
                /* defaultValue={
                  !defaultDatos ? null : defaultDatos[0].descripcionFalla
                } */
              />
            </div>
            <div className="mb-3">
              <label>Acciones a corregir</label>
              <textarea
                name="accionesCorregir"
                className="form-control"
                placeholder="Escribe las nuevas acciones"
                /* defaultValue={
                  !defaultDatos ? null : defaultDatos[0].accionesCorregir
                } */
                onChange={handle}
              />
            </div>
            <div className="mb-3">
              <label>Concesiones</label>
              <textarea
                name="concesiones"
                className="form-control"
                placeholder="Escribe las nuevas acciones"
                /* defaultValue={
                  !defaultDatos ? null : defaultDatos[0].concesiones
                } */
                onChange={handle}
              />
            </div>
            <div className="row mb-3">
              <div className="col -6">
                <label>Empleado que incumple</label>
                {!empleado.error && !empleado.isPending && (
                  <InputSelectEmpleado
                    name="idEmpleadoIncumple"
                    empleados={empleado.data.response}
                    handle={handle}
                    /* defaultData={{
                      nombre: !defaultDatos ? null : defaultDatos[0].nombre,
                      id: !defaultDatos
                        ? null
                        : defaultDatos[0].idEmpleadoIncumple,
                    }} */
                  />
                )}
              </div>

              {!incumplimiento.error && !incumplimiento.isPending && (
                <div className="col-6">
                  <label className="label-form">Incumplimiento</label>
                  <select
                    name="idIncumplimiento"
                    className="form-select form-select"
                    onChange={handle}
                    required
                    /* defaultValue={
                      !defaultDatos ? null : defaultDatos[0].idIncumplimiento
                    } */
                  >
                    <option value="">-- Seleccionar incumplimiento --</option>
                    {incumplimiento.data.response.map((el) => (
                      <option
                        key={el.idincumplimiento}
                        value={Number(el.idincumplimiento)}
                      >
                        {el.incumplimiento}
                      </option>
                    ))}
                    {/* <option value="add" className="bg-success">
                      Añadir otro
                    </option> */}
                  </select>
                </div>
              )}
            </div>

            {/* <div className="mb-3">
              <label>Departamento</label>
              <input
                type="number"
                className="form-control"
                placeholder="Escribe las nuevas acciones"
                min="0"
              />
            </div> */}
            <AlertSuccess show={showAlertSucces} />
            <button type="submit">Enviar</button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={enviar}>
            Continuar
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default ActualizarSNC;
