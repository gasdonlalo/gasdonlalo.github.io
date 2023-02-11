import { Modal } from "react-bootstrap";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";
import InputSelectDep from "../forms/InputSelectDep";
function ActualizarEmpleado({
  show,
  handleClose,
  data,
  handle,
  enviar,
  showAlert,
  showError,
  setShowAlertError,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Actualización de datos de empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!data ? null : (
            <form onSubmit={enviar}>
              <div className="row">
                <div className="mb-3 col-4">
                  <label>Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data.nombre}
                    name="nombre"
                    onChange={handle}
                  />
                </div>
                <div className="mb-3 col-4">
                  <label>Apellido Paterno</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data.apellidoPaterno}
                    name="apellidoPaterno"
                    onChange={handle}
                  />
                </div>
                <div className="mb-3 col-4">
                  <label>Apellido Materno</label>
                  <input
                    className="form-control"
                    type="text"
                    defaultValue={data.apellidoMaterno}
                    name="apellidoMaterno"
                    onChange={handle}
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-6">
                    <label>Departamento actual</label>
                    <InputSelectDep
                      defaultDept={data.idDepartamento}
                      handle={handle}
                      name="idDepartamento"
                    />
                  </div>
                  <div className="mb-3 col-6">
                    <label>ID</label>
                    <input
                      name="idChecador"
                      className="form-control"
                      type="number"
                      defaultValue={data.idChecador}
                      onChange={handle}
                      min={0}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Actualizar
              </button>
            </form>
          )}
          <div style={{ height: "60px" }}>
            <AlertSuccess show={showAlert} />
            <AlertError show={showError} setAlertError={setShowAlertError} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ActualizarEmpleado;
