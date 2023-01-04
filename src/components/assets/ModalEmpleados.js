import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";

const ModalEmpleados = ({ show, close, setEmpleado }) => {
  const [departamento, setDepartamento] = useState(null);
  const dep = useGetData("/departamento");
  const emp = useGetData(`/empleado?departamento=${departamento}`);

  let empleadoSelect = {};

  const enviar = (e) => {
    e.preventDefault();
    setEmpleado(empleadoSelect);
    close();
    setDepartamento(null);
  };

  const handleDepartamento = (e) => setDepartamento(e.target.value);

  const handleEmpleados = (e) => {
    const findEmpleado = emp.data.response.find(
      (emp) => (emp.idempleado = e.target.value)
    );
    empleadoSelect = findEmpleado;
  };

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona el empleado saliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <div>
              <label className="form-label">Selecciona el departamento</label>
              <select onChange={handleDepartamento} className="form-select">
                <option value="">-- departamentos --</option>
                {!dep.error &&
                  !dep.isPending &&
                  dep.data.response.map((el) => (
                    <option value={el.iddepartamento} key={el.iddepartamento}>
                      {el.departamento}
                    </option>
                  ))}
                {dep.isPending && <span>Cargando departamentos...</span>}
              </select>
            </div>
            {!emp.error && !emp.isPending && (
              <>
                <div>
                  <label className="form-label">Selecciona empleado</label>
                  <select
                    className="form-select"
                    name="empleado"
                    onChange={handleEmpleados}
                  >
                    <option value="">--</option>
                    {emp.data.response.map((el, i) => (
                      <option value={el.idempleado} key={i}>
                        {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-100">
                  <input
                    type="button"
                    value="Escoger"
                    className="btn btn-primary mx-auto mt-2"
                    onClick={enviar}
                  />
                </div>
              </>
            )}
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={close}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEmpleados;
