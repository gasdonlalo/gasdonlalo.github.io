import { useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";
import InputFechaC from "./Controlado/InputFechaC";
import InputSelectEmpleado from "./Controlado/InputSelectEmp";

function FormOrdenIsla() {
  const [body, setBody] = useState(null);
  const [radio, setRadio] = useState([]);
  const [isla, setIsla] = useState(null);
  const [estacionS, setEstacionS] = useState(null);
  const despachador = useGetData(`/empleado?departamento=1`);
  // const [checkErroneo, setCheckErroneo] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);

  const changeEstacion = (e) => {
    setEstacionS(Number(e.target.value));
    handle(e);
  };

  const changeIsla = (e) => {
    setIsla(Number(e.target.value));
    handle(e);
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      await Axios.post("/ordenLimpieza", { ...body, evaluaciones: radio });
      setFormPending(false);
      setModalSuccess(true);
      setBody(null);
      setTimeout(() => {
        setModalSuccess(false);
        window.location.reload();
      }, 800);
      setRadio([]);
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
    }
  };
  return (
    <div>
      <form
        className="m-auto shadow rounded p-2 mt-3 w-100 border"
        onSubmit={enviar}
      >
        <div className="d-flex flex-wrap justify-content-around mb-3 w-100">
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Fecha de evaluación</label>
            <InputFechaC handle={handle} value={body} name="fecha" />
          </div>
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Nombre del evaluado</label>
            {!despachador.error & !despachador.isPending && (
              <InputSelectEmpleado
                empleados={despachador.data.response}
                value={body}
                name="idEmpleado"
                handle={handle}
                required
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around mb-3 w-100">
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Escoje la estacion de servicio</label>
            <select
              name="idEstacionServicio"
              className="form-select"
              onChange={changeEstacion}
            >
              <option value="">-- Estacion de servicio --</option>
              <option value="1">GDL 1</option>
              <option value="2">GDL 2</option>
            </select>
          </div>
          <div className="pt-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Seleccionar Isla</label>
            <select
              name="isla"
              className="form-select"
              onChange={changeIsla}
              required
            >
              <option value="">-- Seleccionar isla --</option>
              <option value="1">Isla 1</option>
              <option value="2">Isla 2</option>
              <option value="3">Isla 3</option>
            </select>
          </div>
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Turno</label>
            <select name="idTurno" className="form-select" onChange={handle}>
              <option value="">-- Seleccionar Turno --</option>
              <option value="1">Mañana</option>
              <option value="2">Tarde</option>
              <option value="3">Noche</option>
            </select>
          </div>
        </div>

        <div className="mb-2 text-success">Parte I. Elementos de la isla</div>
        <div className="mb-2">
          <table className="table">
            <tbody>
              <DivChecks
                text="Eshibidor de aceite (Productos ordenados)"
                state={[radio, setRadio]}
                name="1"
              />
              <DivChecks
                text="Contenedor limpiaparabrisas (sin roturas)"
                state={[radio, setRadio]}
                name="2"
              />
              <DivChecks
                text="Mangueras de la bomba (enrolladas sin tocar el piso)"
                state={[radio, setRadio]}
                name="3"
              />
              <DivChecks
                text="Mangueras de despachadora de agua y aire (enrollada sin tocar el piso)"
                state={[radio, setRadio]}
                name="4"
              />
              <DivChecks
                text="Maseteros, solo aplica a isla 1 y 2 de GDL1 (sin basura)"
                state={[radio, setRadio]}
                name="5"
                disabled={!((isla === 1 || isla === 2) && estacionS === 1)}
              />
            </tbody>
          </table>
          <div className="mb-2 text-success">Parte II. Limpieza de la Isla</div>
          <table className="table">
            <tbody>
              <DivChecks
                text="Bomba limpia (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="6"
              />
              <DivChecks
                text="Piso limpio de la isla (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="7"
              />
              <DivChecks
                text="Isla limpia (sin basura)"
                state={[radio, setRadio]}
                name="8"
              />
              <DivChecks
                text="Franja amarilla isla (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="9"
              />
              <DivChecks
                text="Contenedor de agua para limpiaparabrisas limpio (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="10"
              />
            </tbody>
          </table>
          <div className="mb-3">
            <label className="form-label text-success">
              Incidentes durante la evaluación
            </label>
            <textarea
              placeholder="Es opcional, si es requerido escribe el incidente durante esta evaluación"
              type="text"
              step="0.01"
              min="0.00"
              className="form-control"
              name="incidentes"
              onChange={handle}
            />
          </div>
        </div>
        <div className="d-flex justifi-content-center">
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

const DivChecks = ({ text, state, name, disabled }) => {
  const [radio, setRadio] = state;
  const [print, setPrint] = useState(null);
  const setPrintClick = (cumple) => {
    if (disabled) return;
    let fil = radio.filter((el) => el.idcumplimiento !== Number(name));
    let nuevo = [
      ...fil,
      { idcumplimiento: Number(name), cumple: cumple ? 1 : 0 },
    ];
    setRadio(nuevo);
    setPrint(cumple);
  };
  return (
    <tr className={disabled && "bg-secondary border-0 bg-opacity-25"}>
      <th>{text}</th>
      <th
        onClick={() => setPrintClick(true)}
        className={`border rounded border-success text-center
          ${print && "bg-success bg-opacity-75"}
        `}
      >
        Cumple
      </th>
      <th
        onClick={() => setPrintClick(false)}
        className={`border rounded border-danger text-center
          ${print === false && "bg-danger bg-opacity-75"}`}
      >
        No cumple
      </th>
    </tr>
  );
};

export default FormOrdenIsla;
