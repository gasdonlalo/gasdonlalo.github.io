import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import InputFecha from "../forms/InputFecha";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
import Loader from "../assets/Loader";
import { Per } from "../Provider/Auth";
import { useLocation } from "react-router-dom";
import InputSelectEmp from "../forms/Controlado/InputSelectEmp";

function ActualizarSNC({ show, handleClose, id, setActualizar, actualizar }) {
  const { data, isPending, error } = useGetData(`salida-no-conforme/${id}`);
  const url = useLocation().pathname;

  return (
    <div>
      {!error && !isPending && (
        <Success
          show={show}
          handleClose={handleClose}
          setActualizar={setActualizar}
          actualizar={actualizar}
          SNC={data.response}
          id={id}
          url={url}
        />
      )}
    </div>
  );
}

const Success = ({
  show,
  handleClose,
  id,
  setActualizar,
  actualizar,
  SNC,
  url,
}) => {
  const [showAlertSucces, setShowAlertSucces] = useState(false);
  const [showError, setShowError] = useState(false);
  const [pendiente, setPendiente] = useState(false);
  const [deshabilitar, setDeshabilitar] = useState({
    conseciones: false,
    correciones: false,
  });

  const [datos, setDatos] = useState({
    fecha: format.formatFechaDB(SNC[0].fecha),
    descripcionFalla: SNC[0].descripcion_falla,
    accionesCorregir: SNC[0].acciones_corregir,
    concesiones: SNC[0].concesiones,
    idEmpleadoIncumple: SNC[0].idempleado_incumple,
    idIncumplimiento: SNC[0].idincumplimiento,
  });

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  const handleAcciones = (e) => {
    if (e.target.value.length === 0) {
      setDatos({ ...datos, accionesCorregir: null });
      setDeshabilitar({ ...deshabilitar, conseciones: false });
    } else {
      setDeshabilitar({ ...deshabilitar, conseciones: true });
      setDatos({ ...datos, accionesCorregir: e.target.value });
    }
  };
  const handleConseciones = (e) => {
    if (e.target.value.length === 0) {
      setDatos({ ...datos, [e.target.name]: null });
      setDeshabilitar({ ...deshabilitar, correciones: false });
    } else {
      setDeshabilitar({ ...deshabilitar, correciones: true });
      setDatos({ ...datos, [e.target.name]: e.target.value });
    }
  };

  const empleado = useGetData("/empleado?departamento=1");
  const incumplimiento = useGetData("/incumplimiento");
  const enviar = (e) => {
    e.preventDefault();
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
  const exp = new RegExp(/^\s*$/, "g");

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {url.match("pendiente") ? "Validar" : "Actualizar"} salida no
            conforme No.{id}
          </Modal.Title>
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
                defaultValue={format.formatFechaDB(SNC[0].fecha)}
                disabled={url.match("pendiente")}
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
                defaultValue={SNC[0].descripcion_falla}
              />
            </div>
            <div className="mb-3">
              <label>Acciones/correcciones</label>
              <textarea
                name="accionesCorregir"
                className="form-control"
                placeholder="Escribe las nuevas acciones  "
                defaultValue={SNC[0].acciones_corregir}
                disabled={!Per(23) || deshabilitar.correciones}
                onChange={handleAcciones}
              />
            </div>
            <div className="mb-3">
              <label>Concesiones</label>
              <textarea
                name="concesiones"
                className="form-control"
                placeholder="Escribe las nuevas concesiones"
                defaultValue={SNC[0].concesiones}
                disabled={!Per(23) || deshabilitar.conseciones}
                onChange={handleConseciones}
              />
            </div>
            <div className="row mb-3">
              <div className="col -6">
                <label>Empleado que incumple</label>
                {!empleado.error && !empleado.isPending && (
                  /*<InputSelectEmpleado
                      name="idEmpleadoIncumple"
                      empleados={empleado.data.response}
                      handle={handle}
                      defaultData={{
                        nombre: SNC[0].nombre_completo_incumple,
                        id: SNC[0].idempleado_incumple,
                      }}
                      disabled={url.match("pendiente")}
                    />*/
                  <InputSelectEmp
                    name="idEmpleadoIncumple"
                    empleados={empleado.data.response}
                    handle={handle}
                    value={datos}
                    disabled={url.match("pendiente")}
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
                    defaultValue={SNC[0].idincumplimiento}
                    disabled={url.match("pendiente")}
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
            {(exp.test(datos.accionesCorregir) ||
              exp.test(datos.descripcionFalla) ||
              exp.test(datos.concesiones)) && (
              <p className="text-danger text-center fst-italic">
                No puedes dejar los campos vacios, revisalos e intenta de nuevo
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                exp.test(datos.concesiones) || exp.test(datos.accionesCorregir)
              }
            >
              {pendiente ? (
                <Loader size="1.5rem" />
              ) : url.match("pendiente") ? (
                "Validar"
              ) : (
                "Actualizar"
              )}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ActualizarSNC;
