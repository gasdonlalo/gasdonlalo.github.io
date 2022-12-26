import { Modal, Button } from "react-bootstrap";
import React from "react";

const ModalError = ({ show, close }) => {
  //show sera un booleado
  //cerrar sera una función
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>Error al intentar hacer la peticion</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={close}>
          Intertar de nuevo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
