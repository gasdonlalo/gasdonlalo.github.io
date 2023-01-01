import { Modal, Button } from "react-bootstrap";
import React from "react";

const ModalError = ({ show, close, text }) => {
  //show sera un booleado
  //cerrar sera una función
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={close}>
          Intertar de nuevo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalError.defaultProps = {
  text: "Error al intentar hacer la peticion",
};

export default ModalError;
