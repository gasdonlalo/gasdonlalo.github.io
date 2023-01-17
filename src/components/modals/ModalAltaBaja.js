import { Modal } from "react-bootstrap";
function ModalAltaBaja({
  show,
  handleClose,
  enviar,
  changeMotivo,
  encabezado,
  mostrarId,
}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{encabezado}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={enviar}>
          {mostrarId === true ? (
            <div className="row">
              <div className="mb-3 col-6">
                <label>Dar de alta como: </label>
                <select
                  className="form-control "
                  name="estatus"
                  required
                  onChange={changeMotivo}
                >
                  <option value="">--Selecciona una opcion--</option>
                  <option value="1">Contratado</option>
                  <option value="2">Practicante</option>
                </select>
              </div>
              <div className="mb-3 col-6">
                <label>Ingresar ID</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  name="idEmpleado"
                  required
                  onChange={changeMotivo}
                />
              </div>
            </div>
          ) : null}
          <div className="mb-3">
            <label>Motivo</label>
            <textarea
              className="form-control"
              name="motivo"
              onChange={changeMotivo}
              placeholder="Puedes o no escribir un motivo."
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}

export default ModalAltaBaja;
