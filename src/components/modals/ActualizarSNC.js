import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import InputFecha from "../forms/InputFecha";
import InputSelectEmpleado from "../forms/InputSelectEmpleado";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
import Loader from "../assets/Loader";

function ActualizarSNC({ show, handleClose, id, setActualizar, actualizar }) {
  const data = useGetData(`salida-no-conforme/${id}`);
  return (
    <div>
      {!data.error && !data.isPending && (
        <Success
          show={show}
          handleClose={handleClose}
          setActualizar={setActualizar}
          actualizar={actualizar}
          SNC={data}
          id={id}
        />
      )}
    </div>
  );
}

const Success = ({ show, handleClose, id, setActualizar, actualizar, SNC }) => {
  const [showAlertSucces, setShowAlertSucces] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pendiente, setPendiente] = useState(false);

  const [datos, setDatos] = useState({
    fecha: format.formatFechaDB(SNC.data.response[0].fecha),
    descripcionFalla: SNC.data.response[0].descripcion_falla,
    accionesCorregir: SNC.data.response[0].acciones_corregir,
    concesiones: SNC.data.response[0].concesiones,
    idEmpleadoIncumple: SNC.data.response[0].idempleado_incumple,
    idIncumplimiento: SNC.data.response[0].idincumplimiento,
  });

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const empleado = useGetData("/empleado?departamento=1");
  const incumplimiento = useGetData("/incumplimiento");
  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
    setPendiente(true);
    enviarDatos();
    e.target.reset();
  };

  const enviarDatos = async () => {
    try {
      await Axios.put(`/salida-no-conforme/${id}`, datos);
      setPendiente(false);
      setShowAlertSucces(true);
      setTimeout(() => {
        setShowAlertSucces(false);
        handleClose();
        setActualizar(!actualizar);
      }, 800);
    } catch {
      setShowError(true);
      setPendiente(false);
    }
  };

  return (
    <div>
      {!SNC.error && !SNC.isPending && (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Actualizar salida no conforme</Modal.Title>
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
                  defaultValue={format.formatFechaDB(
                    SNC.data.response[0].fecha
                  )}
                />
              </div>
              <div className="mb-3">
                <label>Descripcion de falla</label>
                <textarea
                  className="form-control"
                  placeholder="Describe el nuevo motivo"
                  required
                  name="descripcionFalla"
                  onChange={handle}
                  defaultValue={SNC.data.response[0].descripcion_falla}
                />
              </div>
              <div className="mb-3">
                <label>Acciones/correcciones</label>
                <textarea
                  name="accionesCorregir"
                  className="form-control"
                  placeholder="Escribe las nuevas acciones  "
                  defaultValue={SNC.data.response[0].acciones_corregir}
                  onChange={handle}
                />
              </div>
              <div className="mb-3">
                <label>Concesiones</label>
                <textarea
                  name="concesiones"
                  className="form-control"
                  placeholder="Escribe las nuevas concesiones"
                  defaultValue={SNC.data.response[0].concesiones}
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
                      defaultData={{
                        nombre: SNC.data.response[0].nombre_completo_incumple,
                        id: SNC.data.response[0].idempleado_incumple,
                      }}
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
                      defaultValue={SNC.data.response[0].idincumplimiento}
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
                    </select>
                  </div>
                )}
              </div>
              <AlertSuccess show={showAlertSucces} />
              <AlertError show={showError} setAlertError={setShowError} />
              <button type="submit" className="btn btn-primary">
                {pendiente ? <Loader size="1.5rem" /> : "Actualizar"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default ActualizarSNC;
