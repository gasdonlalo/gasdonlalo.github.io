import { useState } from "react";
import Loader from "../assets/Loader";
import useGetData from "../../hooks/useGetData";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";

const FormHistorialEmpleado = ({ state, msgError, buscarDatos }) => {
  const [body, setBody] = state;
  const [formPending, setFormPending] = useState(false);
  const { data, error, isPending } = useGetData(`/empleado?departamento=1`);

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const buscar = async (e) => {
    setFormPending(true);
    e.preventDefault();
    await buscarDatos();
    setFormPending(false);
  };

  return (
    <div className="mt-2">
      <form className="shadow p-2 w-50 mx-auto rounded" onSubmit={buscar}>
        <HeaderForm title="Evaluaciones por despachador" />
        <div className="row">
          <div className="col-10 mx-auto mb-3">
            <label className="form-label mb-0">Despachador</label>
            {!error && !isPending && (
              <InputSelectEmpleado
                empleados={data.response}
                handle={handle}
                name="idEmpleado"
              />
            )}
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-success mx-auto d-block">
            {formPending ? <Loader size="1.5" /> : "Buscar"}
          </button>
          {msgError && !formPending && (
            <p className="text-center">
              <em className="text-danger text-center">{msgError}</em>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormHistorialEmpleado;
