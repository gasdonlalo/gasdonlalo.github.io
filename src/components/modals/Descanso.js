import React, { useState } from "react";
import InputFechaC from "../forms/Controlado/InputFechaC";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";

const Descanso = ({ state, idEmpleado, setActualizador }) => {
  const [body, setBody] = useState({});
  const [modal, setModal] = state;
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });
  const enviar = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post("/entrada/descanso", {
        idEmpleado,
        fecha: body.fecha,
      });
      console.log(res);
      setActualizador();
      setModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const close = () => setModal(false);
  return (
    <Modal show={modal} onHide={close} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Descanso de empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form className="w-75 mx-auto" onSubmit={enviar}>
            <div>
              <label className="form-label">Fecha</label>
              <InputFechaC
                handle={handle}
                setData={setBody}
                data={body}
                name="fecha"
                value={body.fecha || ""}
                requered
              />
            </div>
            <div>
              <button className="btn btn-info mt-2 mx-auto d-block">
                Agregar
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Descanso;
