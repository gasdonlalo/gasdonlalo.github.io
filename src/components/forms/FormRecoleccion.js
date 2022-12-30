import { useState } from "react";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
function FormRecoleccion({ datos }) {
  const [body, setBody] = useState(null);
  const [formPending, setFormPending] = useState(false);
  const despacho = useGetData("/empleado?departamento=1");

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    setFormPending(true);
    e.preventDefault();
    console.log(body);
  };

  return (
    <div>
      <form onSubmit={enviar} style={{ width: "300px" }} className="m-auto">
        <div>
          <label className="form-label">Selecciona la fecha</label>
          <InputFecha
            name="fecha"
            handle={handle}
            data={body}
            setData={setBody}
          />
        </div>
        <div>
          <label className="form-label">Selecciona el empledo</label>
          {!despacho.error && !despacho.isPending && (
            <InputSelectEmpleado
              empleados={despacho.data.response}
              name="empleado"
              handle={handle}
            />
          )}
          {despacho.isPending && (
            <label className="form-label">Cargando despachadores</label>
          )}
        </div>
        <div>
          <label className="form-label">Cantidad</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              step="0.01"
              min="0.00"
              className="form-control"
              name="cantidad"
              onChange={handle}
              required
            />
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-2 m-auto d-block">
            {formPending ? <Loader size="1.5" /> : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRecoleccion;
