import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
function ModalAltaBaja({ show, handleClose, enviar, changeMotivo, tipo }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{tipo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={enviar}>
          <label>Motivo</label>
          <input
            className="form-control"
            name="motivo"
            onChange={changeMotivo}
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        {/*         <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAltaBaja;
