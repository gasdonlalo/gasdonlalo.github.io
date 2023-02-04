import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import InputSelectEmpleados from "./InputSelectEmpleado";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
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

  /*   const handleRecursos = (e) => {
    let idRecurso = Number(e.target.name);
    let evaluacion = Number(e.target.value);
    let filtrarPasos = body.recursos.filter((el) => el.idRecurso !== idRecurso);
    let insertarNuevo = { idRecurso, evaluacion };
    setBody({
      ...body,
      recursos: [...filtrarPasos, insertarNuevo],
    });
  };
 */
  const handleSwitch = (e) => {
    let id = Number(e.target.name);
    let evaluacion = e.target.checked ? 1 : 0;
    if (e.target.checked) {
      let filtrarPasos = body.recursos.filter((el) => el.idRecurso !== id);
      setBody({
        ...body,
        recursos: [...filtrarPasos, { idRecurso: id, evaluacion: evaluacion }],
      });
    } else {
      let filtrarPasos = body.recursos.filter((el) => el.idRecurso !== id);
      setBody({
        ...body,
        recursos: [...filtrarPasos, { idRecurso: id, evaluacion: evaluacion }],
      });
    }
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: null });
  };
  const enviar = async (e) => {
    e.preventDefault();
    console.log(body);
    setFormPending(true);

    try {
      const res = await Axios.post("/lista-recurso-despachador", body);
      console.log(res);
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
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
      e.target.reset();
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

          <div className="row mt-3">
            {!recursos.data
              ? false
              : recursos.data.response.map((e, i) => {
                  return (
                    <div className="col-6 form-check form-switch" key={i}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        onChange={handleSwitch}
                        name={e.idrecurso}
                      />
                      <label className="form-check-label">{e.recurso}</label>
                    </div>
                  );
                })}
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
