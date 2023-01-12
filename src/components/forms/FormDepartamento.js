import HeaderForm from "../../GUI/HeaderForm";
import Loader from "../assets/Loader";

const FormDepartamento = ({ enviar, handle, pending, dataDefault }) => {
  return (
    <div className="w-100 mt-4">
      <form className="w-50 shadow m-auto p-3" onSubmit={enviar}>
        <HeaderForm title="Departamento" />
        <div className="w-75 m-auto ">
          <label className="form-label mb-0 mt-2">Nuevo departamento</label>
          <input
            className="form-control m-auto"
            type="text"
            name="departamento"
            placeholder="Escribe el nuevo departamento"
            onChange={handle}
            defaultValue={dataDefault ? dataDefault.departamento : null}
            required
          />
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="m-auto btn btn-primary d-block"
            disabled={pending}
          >
            {pending ? (
              <Loader size="1.5" />
            ) : dataDefault ? (
              "Actualizar"
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormDepartamento;
