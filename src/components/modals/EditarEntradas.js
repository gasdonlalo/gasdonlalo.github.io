import React, { useState } from "react";
import InputFechaC from "../forms/Controlado/InputFechaC";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";

const EditarEntradas = ({ state, actualizador }) => {
  const [body, setBody] = useState({});
  const [modal, setModal] = state;
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const enviar = async (e) => {
    e.preventDefault();
    console.log(body);
    /* try {
      let res = await Axios.post("/entrada/descanso", {
        idEmpleado,
        fecha: body.fecha,
      });
      console.log(res);
      setActualizador();
      setModal(false);
    } catch (err) {
      console.log(err);
    } */
  };

  const close = () => setModal(false);
  return (
    <Modal show={modal} onHide={close} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Establecer inconformidad</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="w-75 mx-auto" onSubmit={enviar}>
            <div>
              <label className="form-label">Inconformidad</label>
              <select className="form-select" onChange={handle}>
                <option value="">Escoge una inconformidad</option>
                <option value="1">Falta justificable</option>
                <option value="2">Dia de descanso</option>
                <option value="3">Falta</option>
                <option value="4">Retardo</option>
                <option value="5">Capacitación</option>
                <option value="6">No checo entrada</option>
              </select>
            </div>
            <div>
              <button className="btn btn-warning mt-2 mx-auto d-block">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditarEntradas;
