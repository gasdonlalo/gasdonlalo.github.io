import { Modal, Button } from "react-bootstrap";

function ModalConfirmacion({ show, handleClose, enviar }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      size="sm"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>¿Desea continuar?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Esta accion es irreversible.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={enviar}>
          Continuar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalConfirmacion;
