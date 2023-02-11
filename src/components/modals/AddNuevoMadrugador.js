import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

//Modal para añadir un nuevo departamento de trabajo al concurso intensivo madrugador.
const AddNuevoMadrugador = ({ stateEdit, toogle }) => {
  const [show, setShow] = stateEdit;
  const [actualizador, setActualizador] = toogle;
  const [msgError, setMsgError] = useState("");
  const [formPending, setFormPending] = useState(false);

  const { data, error, isPending } = useGetData("/departamento");

  const close = () => setShow(false);

  const act = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      const idDepartamento = Number(e.target.iddepartamento.value);
      console.log(idDepartamento);

      e.target.reset();
      await Axios.post(`/madrugador/insertar`, {
        idDepartamento,
      });
      setActualizador(!actualizador);
      close();
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setMsgError(err.response.data.msg);
      } else {
        setMsgError("Ya tienes el departamento dado de alta");
      }
      setTimeout(() => {
        setMsgError("");
      }, 1000);
    }
    setFormPending(false);
  };
  return (
    <ModalCustomer title="Editar Monto faltante" show={show} close={close}>
      <form onSubmit={act}>
        <div className="w-50 mx-auto">
          <div className="mb-3">
            <label className="form-label mb-0">Escoge el departamento</label>
            {!error && !isPending && (
              <select className="form-select" name="iddepartamento">
                {data.response.map((el) => (
                  <option key={el.iddepartamento} value={el.iddepartamento}>
                    {el.departamento}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        <div>
          <button
            className="btn btn-info mx-auto d-block"
            disabled={formPending}
            type="submit"
          >
            {formPending ? <Loader size="1.25" /> : "Añadir"}
          </button>
        </div>
        <p className="text-danger fw-semibold text-center mt-2">{msgError}</p>
      </form>
    </ModalCustomer>
  );
};
export default AddNuevoMadrugador;
