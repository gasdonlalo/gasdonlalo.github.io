import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";

const ModalEmpleados = ({ show, close, setEmpleado }) => {
  const [departamento, setDepartamento] = useState(null);
  const dep = useGetData("/departamento");
  const emp = useGetData(`/empleado?departamento=${departamento}`);

  const enviar = (e) => {
    e.preventDefault();
    setEmpleado({
      id: e.target.empleado.value,
      data: emp.data.response.find(
        (el) => (el.idempleado = Number(e.target.empleado.value))
      ),
    });
    close();
  };

  const handleDepartamento = (e) => setDepartamento(e.target.value);
  /* 
  const handleEmpleado = (e) => {
    setEmpleado({
      id: e.target.value,
      data: emp.data.response.find(
        (el) => (el.idempleado = Number(e.target.value))
      ),
    });
  }; */

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona el empleado saliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={enviar}>
            <div>
              <label className="form-label">Selecciona el departamento</label>
              <select onChange={handleDepartamento} className="form-select">
                <option value="">--</option>
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
                  <select className="form-select" name="empleado">
                    <option value="">--</option>
                    {emp.data.response.map((el) => (
                      <option value={el.idempleado} key={el.idempleado}>
                        {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-100">
                  <input
                    type="submit"
                    value="Escoger"
                    className="btn btn-primary mx-auto mt-2"
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
