import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Axios from "../../Caxios/Axios";
import InputFecha from "../forms/InputFecha";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";
import InputSelectEmpleado from "../forms/InputSelectEmpleado";

export const EditCB = ({
  stateEdit, //Estado para mostras el modald
  setModalSuccess, //Modal De exito
  setModalError, //Modal de error
  toogle, //Estado actualizador de la peticion useState
}) => {
  new Date();
  const [show, setShow] = stateEdit;
  const [actualizador, setActualizador] = toogle;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(
    `/com/findone?table=checklist_bomba&id=${show.id}`
  );
  const empleado = useGetData("/empleado");
  console.log(empleado);
  console.log(data);
  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.checked ? true : false });
  };
  const handleEmp = (e) => {
    setBody({ ...body, [e.target.name]: Number(e.target.value) });
  };

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    const datos = {
      fecha: format.formatFechaDB(data.response[0].fecha),
      islaLimpia: data.response[0].isla_limpia,
      aceitesCompletos: data.response[0].aceites_completos,
      bomba: data.response[0].bomba,
      turno: data.response[0].turno,
      idEmpleado: data.response[0].idempleado,
      estacionServicio: data.response[0].estacion_servicio,
      idEmpleadoSaliente: data.response[0].idempleado_saliente,
      empleadoEntrante: data.response[0].empleado_entrante,
      empleadoSaliente: data.response[0].empleado_saliente,
      fechac: data.response[0].fechac,
    };
    console.log({ ...datos, ...body });
    try {
      e.target.reset();
      setShow({ status: false, id: null });
      setModalSuccess(true);
      await Axios.put(`/bomba-check/${show.id}`, {
        ...datos,
        ...body,
      });
      setActualizador(!actualizador);
      setShow({ status: false, id: null });
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
    }
    setFormPending(false);
  };
  return (
    <ModalCustomer
      title="Editar Registro de checklist de bomba"
      show={show.status}
      close={close}
    >
      {!error && !isPending ? (
        <form onSubmit={act}>
          <div className="mx-auto">
            <div className="mb-3">
              <label className="form-label mb-0">Fecha</label>
              <InputFecha
                name="fecha"
                disabled={true}
                data={body}
                setData={setBody}
                defaultValue={format.formatFechaDB(data.response[0].fecha)}
              />
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  fecha
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="fechac"
                    onChange={handle}
                    defaultChecked={data.response[0].fechac}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Estación Servicio
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="estacionServicio"
                    onChange={handle}
                    defaultChecked={data.response[0].estacion_servicio}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Turno
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="turno"
                    onChange={handle}
                    defaultChecked={data.response[0].turno}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Bomba
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="bomba"
                    onChange={handle}
                    defaultChecked={data.response[0].bomba}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Isla limpia
                  <input
                    type="checkbox"
                    name="islaLimpia"
                    className="form-check-input"
                    onChange={handle}
                    defaultChecked={data.response[0].isla_limpia}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Aceites completos
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="aceitesCompletos"
                    onChange={handle}
                    defaultChecked={data.response[0].aceites_completos}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Empleado entrante
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="empleadoEntrante"
                    onChange={handle}
                    defaultChecked={data.response[0].empleado_entrante}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Empleado saliente
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="empleadoSaliente"
                    onChange={handle}
                    defaultChecked={data.response[0].empleado_saliente}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div>
                <label className="form-label mb-0">Empleado entrante</label>
                {!empleado.error && !empleado.isPending && (
                  <InputSelectEmpleado
                    empleados={empleado.data.response}
                    name="idEmpleado"
                    handle={handleEmp}
                    disabled={true}
                    defaultData={{
                      nombre: show.nombreEntrante,
                      id: data.response[0].idempleado,
                    }}
                  />
                )}
              </div>
              <div>
                <label className="form-label mb-0">Empleado saliente</label>
                {!empleado.error && !empleado.isPending && (
                  <InputSelectEmpleado
                    empleados={empleado.data.response}
                    name="idEmpleadoSaliente"
                    handle={handleEmp}
                    defaultData={{
                      nombre: show.nombreSaliente,
                      id: data.response[0].idempleado_saliente,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-warning mx-auto d-block"
              disabled={formPending}
            >
              {formPending ? <Loader size="1.25" /> : "Editar"}
            </button>
          </div>
        </form>
      ) : (
        <span className="text-danger fw-bold">Datos no encontrados</span>
      )}
    </ModalCustomer>
  );
};

export const DeleteCB = ({
  stateDel,
  setModalSuccess,
  setModalError,
  toogle,
}) => {
  const [show, setShow] = stateDel;
  const [formPending, setFormPending] = useState(false);
  const [actualizador, setActualizador] = toogle;
  const close = () => setShow({ status: false, id: null });

  const del = async () => {
    setFormPending(true);
    try {
      await Axios.delete(`/bomba-check/${show.id}`);
      setModalSuccess(true);
      setActualizador(!actualizador);
      close();
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
    }
    setFormPending(false);
  };

  return (
    <ModalCustomer
      title="Eliminar Registro de checklist bomba"
      show={show.status}
      close={close}
    >
      <div className="d-flex justify-content-end gap-3">
        <button className="btn btn-secondary" onClick={close}>
          Cancelar
        </button>
        <button className="btn btn-danger" disabled={formPending} onClick={del}>
          {formPending ? <Loader size="1.5" /> : "Eliminar"}
        </button>
      </div>
    </ModalCustomer>
  );
};
