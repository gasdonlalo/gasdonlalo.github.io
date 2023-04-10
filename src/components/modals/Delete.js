import { useState } from "react";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

const Delete = ({
  close,
  stateShow,
  setModalSuccess,
  setModalError,
  toogle,
}) => {
  const [show] = stateShow;
  const [actualizador, setActualizador] = toogle;
  const [formPending, setFormPending] = useState(false);
  const del = async () => {
    setFormPending(true);
    try {
      await Axios.delete(`/octanoso/delete/${show.id}`);
      setModalSuccess(true);
      setActualizador(!actualizador);
      close();
      setTimeout(() => {
        setModalSuccess(false);
      }, 500);
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

export default Delete;
