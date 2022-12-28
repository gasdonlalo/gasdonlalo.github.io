import { Modal, Button } from "react-bootstrap";

const ModalSuccess = ({ show, close, msg }) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Correcto</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalSuccess.defaultProps = {
  msg: "Se guardaron los datos correctamente",
};

export default ModalSuccess;
