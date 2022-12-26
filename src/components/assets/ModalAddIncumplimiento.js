import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import Loader from "./Loader";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";

const ModalAddIncumplimiento = ({ show, close }) => {
  //show sera un booleado
  //cerrar sera una función
  const [body, setBody] = useState({ departamento: 1 });
  const [pendingForm, setPendingForm] = useState(false);

  const departamentos = useGetData("/departamento");

  console.log({ departamentos });

  const enviar = async (e) => {
    e.preventDefault();
    setPendingForm(true);
    try {
      const establecer = await Axios.post("/incumplimiento", body);
      console.log(establecer);
      setPendingForm(false);
      setBody({});
      e.target.reset();
      close();
    } catch (error) {
      console.log(error);
      setPendingForm(false);
    }
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Añadir nuevo incumplimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={enviar}>
          <input
            type="text"
            name="incumplimiento"
            onChange={handle}
            placeholder="Incumplimiento"
          />
          {!departamentos.error && !departamentos.isPending && (
            <select name="departamento" onChange={handle}>
              {departamentos.data.response.map((el) => (
                <option key={el.iddepartamento} value={el.iddepartamento}>
                  {el.departamento}
                </option>
              ))}
            </select>
          )}
          {pendingForm && <Loader size="1.5" />}
          {!pendingForm && <input type="submit" disabled={pendingForm} />}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={close}>
          Intertar de nuevo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddIncumplimiento;
