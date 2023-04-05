import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";

export const ModalEditRecursoEntrega = ({ state, actualizador }) => {
  const [modal, setModal] = state;
  const [err, setErr] = useState("");
  const enviar = async () => {
    try {
      let res = await Axios.delete(
        `/entrega-recursos/eliminar/${modal.idrecurso}`
      );
      console.log(res);
      setModal(false);
      actualizador();
    } catch (err) {
      console.log(err);
      setErr("Error al eliminar los datos");
      setTimeout(() => {
        setErr("");
      }, 1000);
    }
  };

  const close = () => setModal({ status: false, idrecurso: "" });
  return (
    <Modal show={modal.status} onHide={close} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar inconformidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex gap-2">
          <button className="btn btn-danger" onClick={enviar}>
            Eliminar
          </button>
          <button className="btn btn-secondary" onClick={close}>
            Cancelar
          </button>
          <div>{err && <h4 className="text-danger">{err}</h4>}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
