import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";

const EditarEntradas = ({ state, actualizador }) => {
  const [body, setBody] = useState({});
  const [modal, setModal] = state;
  const [err, setErr] = useState("");
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const enviar = async (e) => {
    e.preventDefault();
    console.log(body);
    //status: false, idCap: ""
    try {
      let res = await Axios.put("/entrada/editar", {
        idCaptura: modal.idCap,
        idTipoFalta: body.idfalta,
      });
      console.log(res);
      actualizador();
      setModal(false);
    } catch (err) {
      console.log(err);
      setErr("Error al guardar los datos");
      setTimeout(() => {
        setErr("");
      }, 1000);
    }
  };

  const close = () => setModal({ status: false, idCap: "" });
  return (
    <Modal show={modal.status} onHide={close} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Establecer inconformidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="w-75 mx-auto" onSubmit={enviar}>
            <div>
              <label className="form-label">Inconformidad</label>
              <select
                className="form-select"
                name="idfalta"
                onChange={handle}
                required
              >
                <option value="">Escoge una inconformidad</option>
                <option value="2">Falta justificable</option>
                <option value="3">Dia de descanso</option>
                <option value="4">Falta</option>
                <option value="5">Retardo</option>
                <option value="6">Capacitación</option>
                <option value="7">No checo entrada</option>
              </select>
            </div>
            <div>
              <button className="btn btn-warning mt-2 mx-auto d-block">
                Agregar
              </button>
            </div>
            <div>{err && <h4 className="text-danger">{err}</h4>}</div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const DelEntradas = ({ state, actualizador }) => {
  const [modal, setModal] = state;
  const [err, setErr] = useState("");
  const enviar = async () => {
    console.log("hola");
    //status: false, idCap: ""
    try {
      let res = await Axios.delete(`/entrada/eliminar/${modal.idCap}`);
      console.log(res);
      actualizador();
      setModal(false);
    } catch (err) {
      console.log(err);
      setErr("Error al eliminar los datos");
      setTimeout(() => {
        setErr("");
      }, 1000);
    }
  };

  const close = () => setModal({ status: false, idCap: "" });
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

export default EditarEntradas;
