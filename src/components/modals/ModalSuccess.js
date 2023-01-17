import { Modal, Button } from "react-bootstrap";

const ModalSuccess = ({ show, close, text }) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Correcto</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ModalSuccess.defaultProps = {
  text: "Se guardaron los datos correctamente",
};

export default ModalSuccess;
