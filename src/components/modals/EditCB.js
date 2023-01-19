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
  const [show, setShow] = stateEdit;
  const [actualizador, setActualizador] = toogle;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(
    `/com/findone?table=checklist_bomba&id=${show.id}`
  );

  const empleados = useGetData(`/empleado?departamento=1`);
  const handle = (e) =>
    setBody({ ...body, [e.target.name]: Number(e.target.value) });
  const handleChekboxs = (e) => {
    setBody({ ...body, [e.target.name]: e.target.checked ? 1 : 0 });
  };

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    const datos = {
      fecha: format.formatFechaDB(data.response[0].fecha),
      islaLimpia: data.response[0].isla_limpia,
      aceitesCompletos: data.response[0].aceites_completos,
      idbomba: data.response[0].idbomba,
      turno: data.response[0].turno,
      idempleadoEntrante: data.response[0].idempleado_entrante,
      idempleadoSaliente: data.response[0].idempleado_saliente,
    };
    try {
      e.target.reset();
      // setShow({ status: false, id: null });
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
          <div className="w-50 mx-auto">
            <div className="mb-3">
              <label className="form-label mb-0">Fecha</label>
              <InputFecha
                handle={handle}
                name="fecha"
                disabled={true}
                data={body}
                setData={setBody}
                defaultValue={format.formatFechaDB(data.response[0].fecha)}
              ></InputFecha>
            </div>
            <div className="mb-3">
              <div className="form-check form-switch">
                <label className="form-label mb-0">
                  Aceites completos
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="aceitesCompletos"
                    onChange={handleChekboxs}
                    defaultChecked={data.response[0].aceites_completos}
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
                    onChange={handleChekboxs}
                    defaultChecked={data.response[0].isla_limpia}
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Empleado recibe</label>
              {!empleados.error && !empleados.isPending && (
                <InputSelectEmpleado
                  empleados={empleados.data.response}
                  handle={handle}
                  name="idempleadoSaliente"
                  defaultData={{
                    nombre: "Empleado Guardado",
                    id: data.response[0].idempleado_saliente,
                  }}
                />
              )}
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
