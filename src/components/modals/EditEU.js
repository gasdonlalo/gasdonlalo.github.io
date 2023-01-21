import { useMemo, useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Axios from "../../Caxios/Axios";
import InputFecha from "../forms/InputFecha";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

export const EditEU = ({
  stateEdit, //Estado para mostras el modald
  setModalSuccess, //Modal De exito
  setModalError, //Modal de error
  actualizar, //Actualiza los datos si hay un nuevo cambio *function*
}) => {
  const [show, setShow] = stateEdit;
  const [body, setBody] = useState(null);
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(
    `/evaluacion-uniforme/buscar/${show.id}`
  );

  const evaluaciones = useMemo(() => {
    let ev;
    if (!error && !isPending) {
      ev = data.response.map((ev) => ({
        idEvaluacionUniforme: ev.idevaluacion_uniforme,
        cumple: ev.cumple ? 1 : 0,
      }));
    }
    setBody(ev);
    return ev;
  }, [error, data, isPending]);

  const handle = (e) => {
    let index = evaluaciones.findIndex(
      (el) => el.idEvaluacionUniforme === Number(e.target.value)
    );
    evaluaciones[index].cumple = e.target.checked ? 1 : 0;
    setBody(evaluaciones);
  };

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    const datos = {
      empleado: data.response[0].idempleado,
      evaluaciones: body,
    };
    try {
      e.target.reset();
      setShow({ status: false, id: null });
      setModalSuccess(true);
      await Axios.put(`/evaluacion-uniforme`, datos);
      setShow({ status: false, id: null });
      actualizar();
    } catch (err) {
      console.log(err);
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
    <ModalCustomer title="Editar Evaluación" show={show.status} close={close}>
      {!error && !isPending ? (
        <form onSubmit={act}>
          <div className="w-75 mx-auto">
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
              {!error &&
                !isPending &&
                data.response.map((el) => (
                  <div className="mb-0" key={el.idevaluacion_uniforme}>
                    <div className="form-check form-switch">
                      <label className="form-label mb-0">
                        <span className="text-nowrap">{el.cumplimiento}</span>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="idEvaluacionUniforme"
                          value={el.idevaluacion_uniforme}
                          onChange={handle}
                          defaultChecked={el.cumple}
                        />
                      </label>
                    </div>
                  </div>
                ))}
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

export const DeleteEU = ({
  stateDel,
  setModalSuccess,
  setModalError,
  actualizar,
}) => {
  const [show, setShow] = stateDel;
  const [formPending, setFormPending] = useState(false);
  const close = () => setShow({ status: false, id: null });

  const del = async () => {
    setFormPending(true);
    try {
      await Axios.delete(`/evaluacion-uniforme/eliminar/${show.id}`);
      setModalSuccess(true);
      actualizar();
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
      title="Eliminar Evalución uniforme"
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
