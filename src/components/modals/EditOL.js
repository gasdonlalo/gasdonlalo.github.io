//Modal editar evaluacion recursos de despachador *ER*
import { useState, useMemo } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Axios from "../../Caxios/Axios";
import InputFecha from "../forms/InputFecha";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

export const EditOL = ({
  stateEdit, //Estado para mostras el modald
  setModalSuccess, //Modal De exito
  setModalError, //Modal de error
  buscarDatos, //Estado actualizador de la peticion useState
}) => {
  new Date();
  const [show, setShow] = stateEdit;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(
    `/ordenLimpieza/identificador/${show.id}`
  );
  const evaluaciones = useMemo(() => {
    let ev;
    if (!error && !isPending) {
      ev = data.response.map((ev) => ({
        idoyl: ev.idoyl,
        cumple: ev.cumple ? 1 : 0,
      }));
    }
    setBody(ev);
    return ev;
  }, [error, data, isPending]);

  const handle = (e) => {
    let index = evaluaciones.findIndex(
      (el) => el.idoyl === Number(e.target.value)
    );
    evaluaciones[index].cumple = e.target.checked ? 1 : 0;
    setBody(evaluaciones);
  };

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    const datos = {
      idEmpleado: data.response[0].idempleado,
      evaluaciones: body,
    };
    try {
      e.target.reset();
      setModalSuccess(true);
      console.log(datos);
      await Axios.put(`/ordenLimpieza`, datos);
      buscarDatos();
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
      title="Editar Registro Pasos despachar"
      show={show.status}
      close={close}
    >
      {!error && !isPending ? (
        <form onSubmit={act}>
          <div className="w-75 mx-auto">
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
            <div className="row mb-3">
              <div className="col-4">
                <label className="form-label mb-0">Estación</label>
                <select
                  name="estacion_servicio"
                  className="form-select"
                  disabled
                >
                  <option value="1">GDL 1</option>
                  <option value="2">GDL 2</option>
                </select>
              </div>
              <div className="col-4">
                <label className="form-label mb-0">Isla</label>
                <select
                  name="estacion_servicio"
                  className="form-select"
                  disabled
                >
                  <option value="1">Isla 1</option>
                  <option value="2">Isla 2</option>
                </select>
              </div>
              <div className="col-4">
                <label className="form-label mb-0">Turno</label>
                <select
                  name="estacion_servicio"
                  className="form-select"
                  disabled
                >
                  <option value="1">Mañana</option>
                  <option value="2">Tarde</option>
                  <option value="3">Noche</option>
                </select>
              </div>
            </div>
            <div className="">
              {data.response.map((el) => (
                <div className="mb-0 col-6" key={el.idoyl}>
                  <div className="form-check form-switch">
                    <label className="form-label mb-0">
                      <span className="text-nowrap">{el.cumplimiento}</span>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="idoyl"
                        onChange={handle}
                        value={el.idoyl}
                        defaultChecked={el.cumple}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3">
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

export const DeleteOL = ({
  stateDel,
  setModalSuccess,
  setModalError,
  buscarDatos,
}) => {
  const [show, setShow] = stateDel;
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });

  const del = async () => {
    setFormPending(true);
    try {
      await Axios.delete(`/ordenLimpieza/identificador/${show.id}`);
      setModalSuccess(true);
      buscarDatos();
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
    <ModalCustomer title="Eliminar Registro" show={show.status} close={close}>
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
