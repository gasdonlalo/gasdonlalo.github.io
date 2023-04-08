import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFechaC from "./Controlado/InputFechaC";
import InputSelectEmpleado from "./Controlado/InputSelectEmp";
import Loader from "../assets/Loader";
import Axios from "../../Caxios/Axios";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";

function FormChecklistNuevo() {
  const [formPending, setFormPending] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const despachador = useGetData(`/empleado`);
  const [body, setBody] = useState({});
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

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    console.log(body);

    try {
      await Axios.post("/bomba-check", { ...body, ...radio });
      setFormPending(false);
      setModalSuccess(true);
      setBody({});
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

  const validacion = new RegExp(/^\s*$/, "g");

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };

  console.log(validacion.test(body.incidentes));

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
                value={body}
                name="idEmpleado"
                handle={handle}
                required
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
                value={body}
                name="idEmpleadoSaliente"
                handle={handle}
                required
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

        <div className="row m-2">
          <label> Incidentes</label>
          <textarea
            className="form-control"
            placeholder="Redactar si hubo incidentes"
            name="incidentes"
            onChange={handle}
          />
          {validacion.test(body.incidentes) && (
            <p className="text-danger">
              **No debes dejar espacios vacios en el campo de incidentes
            </p>
          )}
        </div>

        <div className="d-flex flex-column justify-content-center">
          <button
            type="submit"
            className="btn btn-primary m-auto d-block"
            disabled={validacion.test(body.incidentes)}
          >
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
