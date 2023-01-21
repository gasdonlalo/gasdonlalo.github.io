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
  const docEmpleado = useGetData(`/control-documento/${idEmpleado}`);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualización de documentos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <AlertSuccess show={showAlert} />
            <AlertError show={showError} setAlertError={setShowAlertError} />
            <label>Documentos</label>
            {!docEmpleado.error && !docEmpleado.isPending
              ? docEmpleado.data.response.map((e, i) => {
                  return (
                    <div className="form-check form-switch" key={i}>
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
                      <label className="form-check-label">{e.documento}</label>
                    </div>
                  );
                })
              : null}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddDocs;
