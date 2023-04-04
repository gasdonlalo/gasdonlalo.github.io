import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFechaC from "./Controlado/InputFechaC";
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

  const handleSwitch = (e) => {
    let evaluacion = e.target.checked ? 1 : 0;
    let cuerpo = body.recursos.filter(
      (el) => el.idRecurso !== Number(e.target.name)
    );
    cuerpo.push({ idRecurso: Number(e.target.name), evaluacion: evaluacion });
    setBody({
      ...body,
      recursos: cuerpo,
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
      /* const res =  */ await Axios.post("/lista-recurso-despachador", body);
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
      setFormPending(false);
      e.target.reset();
      setBody({ recursos: [] });
    } catch (err) {
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
      setBody({ recursos: [] });
    }
  };
  console.log(body);
  return (
    <div className="container">
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <form onSubmit={enviar} className="mt-3 m-auto shadow p-4">
        <HeaderForm />
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Fecha</label>
            <InputFechaC handle={handle} value={body} name="fecha" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Empleado despachador</label>
            {!despachador.error && !despachador.isPending && (
              <InputSelectEmpleados
                empleados={despachador.data.response}
                handle={handle}
                name="empleado"
                reset={body.hasOwnProperty("empleado")}
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
                    <div className="col-6 form-check form-switch " key={i}>
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onClick={handleSwitch}
                          name={e.idrecurso}
                        />
                        {e.recurso}
                      </label>
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
