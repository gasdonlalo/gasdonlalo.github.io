//Modal editar evaluacion pasos para despachar *ED*
import { useState, useMemo } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Axios from "../../Caxios/Axios";
import InputFecha from "../forms/InputFecha";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

export const EditED = ({
  stateEdit, //Estado para mostras el modald
  setModalSuccess, //Modal De exito
  setModalError, //Modal de error
  toggle, //Estado actualizador de la peticion useState
}) => {
  new Date();
  const [show, setShow] = stateEdit;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const [actualizador, setActualizador] = toggle;
  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(`/pasos-despachar/${show.id}`);
  const evaluaciones = useMemo(() => {
    let ev;
    if (!error && !isPending) {
      ev = data.response.map((ev) => ({
        idEvaluacionPaso: ev.idevaluacion_despachar,
        evaluacion: ev.evaluacion ? 1 : 0,
      }));
    }
    setBody(ev);
    return ev;
  }, [error, data, isPending]);

  const handle = (e) => {
    let index = evaluaciones.findIndex(
      (el) => el.idEvaluacionPaso === Number(e.target.value)
    );
    evaluaciones[index].evaluacion = e.target.checked ? 1 : 0;
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
      await Axios.put(`/pasos-despachar`, datos);
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
                name="fecha"
                disabled={true}
                data={body}
                setData={setBody}
                defaultValue={format.formatFechaDB(data.response[0].fecha)}
              ></InputFecha>
            </div>
            {!error &&
              !isPending &&
              data.response.map((el) => (
                <div className="mb-0" key={el.idevaluacion_despachar}>
                  <div className="form-check form-switch">
                    <label className="form-label mb-0">
                      <span className="text-nowrap">{el.paso}</span>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="idEvaluacionPaso"
                        onChange={handle}
                        value={el.idevaluacion_despachar}
                        defaultChecked={el.evaluacion}
                      />
                    </label>
                  </div>
                </div>
              ))}
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

export const DeleteED = ({
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
