import { useState } from "react";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import Axios from "../../Caxios/Axios";
import HeaderForm from "../../GUI/HeaderForm";
function FormRecoleccion() {
  const [body, setBody] = useState(null);
  const [formPending, setFormPending] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: null });
  const [modalSuccess, setModalSuccess] = useState(false);
  const despacho = useGetData("/empleado?departamento=1");

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const modalClose = () => {
    setModalError({ status: false, msg: null });
    setModalSuccess(false);
  };

  const enviar = async (e) => {
    setFormPending(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`recoleccion-efectivo`, body);
      console.log(res);
      setModalSuccess(true);
      setFormPending(false);
      e.target.reset();
    } catch (err) {
      console.log(err);
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setFormPending(false);
    }
  };

  return (
    <div>
      <ModalError show={modalError.status} close={modalClose} />
      <ModalSuccess show={modalSuccess} close={modalClose} />
      <form
        onSubmit={enviar}
        style={{ maxWidth: "500px" }}
        className="m-auto shadow p-4 mt-4 row"
      >
        <HeaderForm />
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
          <label className="form-label">
            Cantidad{" "}
            <li
              className="fa fa-circle-info"
              title="Solo se captura la diferencia de los $3000 que debe depositar el despachador, es decir si el despachador recolecta $3,100 solo se capturan los $100"
            ></li>
          </label>
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
          <button
            type="submit"
            className="btn btn-primary mt-2 m-auto d-block"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.5" /> : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormRecoleccion;
