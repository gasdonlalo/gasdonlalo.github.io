import { Modal } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import AlertError from "../alerts/AlertError";
import AlertSuccess from "../alerts/AlertSuccess";

function AddDocs({
  show,
  handleClose,
  idEmpleado,
  handle,
  showAlert,
  showError,
  setShowAlertError,
}) {
  const docEmpleado = useGetData(`/control-documento/${idEmpleado.id}`);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualización de documentos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h5>Documentos de: {idEmpleado.nombre} </h5>
            <label>Documentos</label>
            {!docEmpleado.error && !docEmpleado.isPending
              ? docEmpleado.data.response.map((e, i) => {
                  return (
                    <div className="form-check form-switch" key={i}>
                      <label className="form-check-label">
                        {e.documento}
                        <input
                          key={e.iddocumento}
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          name="iddocumento"
                          onChange={handle}
                          value={e.iddocumento}
                          id={e.idempleado}
                          defaultChecked={e.cumple}
                        />
                      </label>
                    </div>
                  );
                })
              : null}
          </div>
          <div style={{ height: "60px" }}>
            <AlertSuccess show={showAlert} />
            <AlertError show={showError} setAlertError={setShowAlertError} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddDocs;
