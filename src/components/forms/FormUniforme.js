import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";
import Axios from "../../Caxios/Axios";
import HeaderForm from "../../GUI/HeaderForm";
import { useState } from "react";
import Loader from "../assets/Loader";

function FormUniforme() {
  const [actualizador, setActualizador] = useState(false);
  const [body, setBody] = useState({
    evaluaciones: [
      { idCumplimiento: 1, cumple: 1 },
      { idCumplimiento: 2, cumple: 1 },
      { idCumplimiento: 3, cumple: 1 },
      { idCumplimiento: 4, cumple: 1 },
      { idCumplimiento: 5, cumple: 1 },
      { idCumplimiento: 6, cumple: 1 },
      { idCumplimiento: 7, cumple: 1 },
    ],
  });

  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);
  const pasosDespacho = useGetData("/evaluacion-uniforme/get-pasos");
  const despachadores = useGetData("/empleado?departamento=1", actualizador);

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    console.log(body);

    try {
      let res = await Axios.post("/evaluacion-uniforme", body);
      console.log(res);
      setFormPending(false);
      setModalSuccess(true);
      setBody({
        evaluaciones: body.evaluaciones.map((el) => ({
          idCumplimiento: el.idCumplimiento,
          cumple: 1,
        })),
      });
      e.target.reset();
      setActualizador(!actualizador);
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
    }
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const modalClose = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  const handleEv = (e) => {
    let cuerpo = body.evaluaciones.filter(
      (el) => el.idCumplimiento !== Number(e.target.name)
    );
    cuerpo.push({
      idCumplimiento: Number(e.target.name),
      cumple: Number(e.target.value),
    });
    setBody({ ...body, evaluaciones: cuerpo });
  };

  return (
    <form
      onSubmit={enviar}
      className="row m-auto shadow p-2 mb-3"
      style={{ width: "900px" }}
    >
      <ModalError
        show={modalError.status}
        close={modalClose}
        text={modalError.msg}
      />
      <ModalSuccess show={modalSuccess} close={modalClose} />
      <HeaderForm />
      <div className="col-md-6">
        <label className="form-label">Fecha a evaluar</label>
        <InputFecha
          handle={handle}
          data={body}
          setData={setBody}
          name="fecha"
        />
      </div>
      <div className="col-md-6 mb-3">
        <label className="form-label">Empleado a evaluar</label>
        {!despachadores.error && !despachadores.isPending && (
          <InputSelectEmpleado
            name="empleado"
            empleados={despachadores.data.response}
            handle={handle}
          />
        )}
      </div>
      <div className="w-100 m-auto">
        <label className="form-label">Evaluaciones</label>
        <div className="d-flex flex-wrap justify-content-center">
          {!pasosDespacho.error &&
            !pasosDespacho.isPending &&
            pasosDespacho.data.response.map((el) => (
              <div
                className="mx-1 p-1 text-center border my-2 rounded"
                key={el.idcumplimiento_uniforme}
              >
                <label className="form-label">{el.cumplimiento}</label>
                <div className="w-100 d-flex justify-content-evenly">
                  <label className="form-label rounded border p-2 d-flex flex-column mx-1">
                    cumple
                    <input
                      type="radio"
                      name={el.idcumplimiento_uniforme}
                      className="input-check-form"
                      value={1}
                      onChange={handleEv}
                      defaultChecked
                    />
                  </label>
                  <label className="form-label rounded border p-2 d-flex flex-column mx-1">
                    no cumple
                    <input
                      type="radio"
                      name={el.idcumplimiento_uniforme}
                      className="input-check-form"
                      value={0}
                      onChange={handleEv}
                    />
                  </label>
                </div>
              </div>
            ))}
        </div>
        <div className="col-md-12">
          <button className="m-auto d-block btn btn-primary">
            {" "}
            {formPending ? <Loader size="1.5" /> : "Evaluar"}{" "}
          </button>
        </div>
      </div>
    </form>
  );
}
export default FormUniforme;
