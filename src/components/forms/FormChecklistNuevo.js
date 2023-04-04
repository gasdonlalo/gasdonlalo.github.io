import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFechaC from "./Controlado/InputFechaC";
import InputSelectEmpleado from "./InputSelectEmpleado";
import Loader from "../assets/Loader";
import Axios from "../../Caxios/Axios";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";

function FormChecklistNuevo() {
  const [formPending, setFormPending] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const despachador = useGetData(`/empleado`);
  const [body, setBody] = useState(null);
  const [radio, setRadio] = useState({
    islaLimpia: false,
    aceitesCompletos: false,
    bomba: false,
    turno: false,
    estacionServicio: false,
    empleadoEntrante: false,
  });
  let despachadoresEmp;
  if (!despachador.isPending && !despachador.error) {
    despachadoresEmp = despachador.data.response.filter(
      (el) => el.iddepartamento === 1
    );
  }

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    console.log(body);
    console.log(radio);
    try {
      await Axios.post("/bomba-check", { ...body, ...radio });
      setFormPending(false);
      setModalSuccess(true);
      setBody(null);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
      e.target.reset();
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
    }
    setRadio({
      islaLimpia: false,
      aceitesCompletos: false,
      bomba: false,
      turno: false,
      estacionServicio: false,
      empleadoEntrante: false,
    });
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };

  return (
    <div className="container-lg">
      <form className="m-auto shadow rounded p-2 mt-3 " onSubmit={enviar}>
        <div className="row p-2">
          <div className="col-4">
            <label>Fecha</label>
            <InputFechaC value={body} handle={handle} name="fecha" />
          </div>
        </div>
        <div className="row p-2">
          <div className="col-6">
            <label>
              Empleado entrante{" "}
              <span>
                <i className="fa-solid fa-person-walking fs-3" />
              </span>
            </label>
            {!despachador.error && !despachador.isPending && (
              <InputSelectEmpleado
                empleados={despachadoresEmp}
                reset={body}
                name="idEmpleado"
                handle={handle}
              />
            )}
          </div>
          <div className="col-6">
            <label>
              Empleado saliente{" "}
              <span>
                <i className="fa-solid fa-person-walking-arrow-right fs-3" />
              </span>
            </label>
            {!despachador.error && !despachador.isPending && (
              <InputSelectEmpleado
                empleados={despachador.data.response}
                reset={body}
                name="idEmpleadoSaliente"
                handle={handle}
              />
            )}
          </div>
        </div>
        <div className="mb-2">
          <table className="table">
            <tbody>
              <DivChecks text="Fecha" state={[radio, setRadio]} name="fechac" />
              <DivChecks
                text="Estacion Servicio"
                state={[radio, setRadio]}
                name="estacionServicio"
              />
              <DivChecks text="Bomba" state={[radio, setRadio]} name="bomba" />
              <DivChecks text="Turno" state={[radio, setRadio]} name="turno" />
              <DivChecks
                text="Isla Limpia"
                state={[radio, setRadio]}
                name="islaLimpia"
              />
              <DivChecks
                text="Aceites completos"
                state={[radio, setRadio]}
                name="aceitesCompletos"
              />
              <DivChecks
                text="Empleado entrante"
                state={[radio, setRadio]}
                name="empleadoEntrante"
              />
              <DivChecks
                text="Empleado saliente"
                state={[radio, setRadio]}
                name="empleadoSaliente"
              />
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary m-auto d-block">
            {formPending ? <Loader size="1.5" /> : "Guardar Check"}
          </button>
        </div>
      </form>

      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
    </div>
  );
}

const DivChecks = ({ text, state, name }) => {
  const [radio, setRadio] = state;
  return (
    <tr>
      <th>{text}</th>
      <th
        onClick={() => setRadio({ ...radio, [name]: true })}
        className={
          radio[name]
            ? "bg-success bg-opacity-75 text-center"
            : // eslint-disable-next-line no-useless-concat
              "text-center"
        }
      >
        Cumple
      </th>
      <th
        onClick={() => setRadio({ ...radio, [name]: false })}
        className={
          !radio[name] ? "bg-danger bg-opacity-75 text-center" : "text-center"
        }
      >
        No cumple
      </th>
    </tr>
  );
};

export default FormChecklistNuevo;
