import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import InputSelectEmpleados from "./InputSelectEmpleado";
import ModalSuccess from "../assets/ModalSuccess";
import ModalError from "../assets/ModalError";
import Loader from "../assets/Loader";
import Axios from "../../Caxios/Axios";
import HeaderForm from "../../GUI/HeaderForm";

const FormRecursosDesp = () => {
  const [formPending, setFormPending] = useState(false);
  const [body, setBody] = useState({ recursos: [] });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: null });
  const despachador = useGetData(`/empleado?departamento=1`);
  const recursos = useGetData("/lista-recurso-despachador/get-recurso");

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleRecursos = (e) => {
    let idRecurso = Number(e.target.name);
    let evaluacion = Number(e.target.value);
    let filtrarPasos = body.recursos.filter((el) => el.idRecurso !== idRecurso);
    let insertarNuevo = { idRecurso, evaluacion };
    setBody({
      ...body,
      recursos: [...filtrarPasos, insertarNuevo],
    });
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: null });
  };
  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      const res = await Axios.post("/lista-recurso-despachador", body);
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
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <form onSubmit={enviar} className="w-75 m-auto shadow p-4">
        <HeaderForm />
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Fecha</label>
            <InputFecha
              handle={handle}
              setData={setBody}
              data={body}
              name="fecha"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Empleado despachador</label>
            {!despachador.error && !despachador.isPending && (
              <InputSelectEmpleados
                empleados={despachador.data.response}
                handle={handle}
                name="empleado"
              />
            )}
            {despachador.isPending && (
              <label className="form-label text-danger">
                Cargando despachadores ...
              </label>
            )}
          </div>
          <div className="row w-100">
            <label className="recursos a evaluar"></label>
            {!recursos.error &&
              !recursos.isPending &&
              recursos.data.response.map((el) => (
                <div className="col-md-3 p-2" key={el.idrecurso}>
                  <label>{el.recurso}</label>
                  <select
                    className="form-control"
                    onChange={handleRecursos}
                    name={el.idrecurso}
                    required
                  >
                    <option value="">Selecciona una opcion</option>
                    <option value="1">Cumple</option>
                    <option value="0">No cumple</option>
                  </select>
                </div>
              ))}
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="btn btn-primary d-block m-auto"
              disabled={formPending}
            >
              {formPending ? <Loader size="1.5" /> : "Enviar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRecursosDesp;
