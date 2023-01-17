import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import Axios from "../../Caxios/Axios";
import InputFecha from "../forms/InputFecha";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

export const EditMF = ({
  stateEdit,
  setModalSuccess,
  setModalError,
  toogle,
}) => {
  const [show, setShow] = stateEdit;
  const [actualizador, setActualizador] = toogle;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);

  const close = () => setShow({ status: false, id: null });
  const { data, error, isPending } = useGetData(
    `/com/findone?table=monto_faltante&id=${show.id}`
  );
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    const datos = {
      fecha: format.formatFechaDB(data.response[0].fecha),
      cantidad: data.response[0].cantidad,
      empleado: data.response[0].idempleado,
    };
    try {
      e.target.reset();
      setShow({ status: false, id: null });
      setModalSuccess(true);
      await Axios.put(`/monto-faltante-despachador/${show.id}`, {
        ...datos,
        ...body,
      });
      setActualizador(!actualizador);
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
      title="Editar Monto faltante"
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
              <label className="form-label mb-0">Cantidad</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  onChange={handle}
                  defaultValue={data.response[0].cantidad}
                  type="number"
                  step="0.01"
                  min="0.00"
                  className="form-control"
                  name="cantidad"
                  required
                />
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

export const DeleteMF = ({
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
      await Axios.delete(`/monto-faltante-despachador/${show.id}`);
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
      title="Eliminar Monto faltante"
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
