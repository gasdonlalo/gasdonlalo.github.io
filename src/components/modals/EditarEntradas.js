import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";

const EditarEntradas = ({ state, actualizador }) => {
  const [modal, setModal] = state;
  const [body, setBody] = useState({ idfalta: 0 });
  const [err, setErr] = useState("");
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    console.log(body);

    try {
      let res = await Axios.put("/entrada/editar", {
        idCaptura: modal.idCap,
        idTipoFalta: body.idfalta,
        horaEstablecida: body.horaEstablecida || undefined,
        horaEntrada: body.horaEntrada || undefined,
      });
      console.log(res);
      actualizador();
      setModal({
        status: false,
        idCap: "",
        horaEntrada: "",
        horaEstablecida: "",
      });
      setBody({ idfalta: 0 });
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
            <InputEditarHoras
              handle={handle}
              body={body}
              modal={modal}
              setBody={setBody}
            />
            <hr />
            <div>
              <label className="form-label">Inconformidad</label>
              <select
                className="form-select"
                name="idfalta"
                onChange={handle}
                value={body.hasOwnProperty("idfalta") && body.idfalta}
                required
              >
                <option value="0">Ninguna inconformidad</option>
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
                Editar
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

const InputEditarHoras = ({ handle, body, modal, setBody }) => {
  const [disabled, setDisabled] = useState(true);
  const toggleDisable = () => {
    setDisabled(!disabled);
    if (disabled) {
      setBody({
        ...body,
        horaEntrada: modal.horaEntrada,
        horaEstablecida: modal.horaEstablecida,
      });
    }
  };
  return (
    <div className="row" onDoubleClick={toggleDisable}>
      <div className="col-6">
        <label className="form-label">Hora establecida</label>
        <input
          type="time"
          className="form-control"
          onChange={handle}
          name="horaEstablecida"
          value={
            body.hasOwnProperty("horaEstablecida")
              ? body.horaEstablecida
              : modal.horaEstablecida
          }
          disabled={disabled}
          required
        />
      </div>
      <div className="col-6">
        <label className="form-label">Hora entrada</label>
        <input
          type="time"
          className="form-control"
          onChange={handle}
          name="horaEntrada"
          value={
            body.hasOwnProperty("horaEntrada")
              ? body.horaEntrada
              : modal.horaEntrada
          }
          disabled={disabled}
          required
        />
      </div>
      <p className="m-0 text-end">
        <span className={disabled ? "text-secondary" : "text-danger"}>
          Doble click para {disabled ? "habilitar" : "deshabilitar"}
        </span>
      </p>
    </div>
  );
};

export default EditarEntradas;
