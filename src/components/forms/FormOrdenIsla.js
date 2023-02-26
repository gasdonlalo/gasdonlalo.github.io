import { useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";

function FormOrdenIsla() {
  const [body, setBody] = useState(null);
  const [radio, setRadio] = useState({
    aceites: false,
    manguerasBomba: false,
    limpiaparabrisas: false,
    mangueraAguaAire: false,
    maseteros: false,
    bombalimpia: false,
    pisolimpio: false,
    islalimpia: false,
    franja: false,
    contenedorAgua: false,
  });
  const [bomba, setBomba] = useState(null);
  const [estacionS, setEstacionS] = useState(null);
  const despachador = useGetData(`/empleado?departamento=1`);
  const estacion = useGetData("/estaciones-servicio");
  const turnos = useGetData(`/estaciones-servicio/turnos/${estacionS}`);
  const bombas = useGetData(`/bomba/${bomba}`);
  const [checkErroneo, setCheckErroneo] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);

  const changeEstacion = (e) => {
    setEstacionS(Number(e.target.value));
    setBomba(Number(e.target.value));
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
      await Axios.post("/ordenLimpieza", { ...body, ...radio });
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
      aceites: false,
      manguerasBomba: false,
      limpiaparabrisas: false,
      mangueraAguaAire: false,
      maseteros: false,
      bombalimpia: false,
      pisolimpio: false,
      islalimpia: false,
      franja: false,
      contenedorAgua: false,
    });
  };
  return (
    <div className="Container">
      <form className="m-auto shadow rounded p-2 mt-3 w-75 " onSubmit={enviar}>
        <div className="d-flex flex-wrap justify-content-around mb-3 w-100">
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Fecha de evaluación</label>
            <InputFecha
              data={body}
              setData={setBody}
              handle={handle}
              name="fecha"
            />
          </div>
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Nombre del evaluado</label>
            {!despachador.error & !despachador.isPending && (
              <InputSelectEmpleado
                empleados={despachador.data.response}
                reset={body}
                name="idEmpleadoEvaluado"
                handle={handle}
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-around mb-3 w-100">
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Escoje la estacion de servicio</label>
            <select
              name="estacionServicio"
              className="form-select"
              onChange={changeEstacion}
              defaultValue={1}
              disabled={checkErroneo}
            >
              {estacion.isPending && (
                <option value="">Cargando estaciones...</option>
              )}
              {!estacion.error && !estacion.isPending && (
                <option value="">-- Estacion de servicio --</option>
              )}
              {!estacion.error &&
                !estacion.isPending &&
                estacion.data.response.map((el) => (
                  <option
                    value={el.idestacion_servicio}
                    key={el.idestacion_servicio}
                  >
                    {el.nombre}
                  </option>
                ))}
              {estacion.isPending && (
                <option value="">Cargando estaciones ... </option>
              )}
            </select>
          </div>
          <div className="pt-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Escoje la bomba</label>
            <select
              name="idbomba"
              className="form-select"
              onChange={handle}
              required
              disabled={checkErroneo}
            >
              {!bombas.error && !bombas.isPending && (
                <option value=""> -- Selecciona bomba -- </option>
              )}
              {!bombas.error &&
                !bombas.isPending &&
                bombas.data.response.map((el) => (
                  <option value={el.idbomba} key={el.idbomba}>
                    {el.bomba}
                  </option>
                ))}
            </select>
          </div>
          <div className="p-2" style={{ flexGrow: 1 }}>
            <label className="form-label">Turno</label>
            <select
              name="turno"
              className="form-select"
              defaultValue={1}
              onChange={handle}
              disabled={checkErroneo}
            >
              {!turnos.error && !turnos.isPending && (
                <option value=""> -- Selecciona el turno -- </option>
              )}
              {!turnos.error &&
                !turnos.isPending &&
                turnos.data.response.map((el) => (
                  <option key={el.idturno} value={el.turno}>
                    {el.turno}
                  </option>
                ))}
              {turnos.isPending && <option value="">Cargando turnos</option>}
              {turnos.error && !turnos.isPending && <option value=""></option>}
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
                name="aceites"
              />
              <DivChecks
                text="Contenedor limpiaparabrisas (sin roturas)"
                state={[radio, setRadio]}
                name="limpiaparabrisas"
              />
              <DivChecks
                text="Mangueras de la bomba (enrolladas sin tocar el piso)"
                state={[radio, setRadio]}
                name="maguerasBomba"
              />
              <DivChecks
                text="Mangueras de despachadora de agua y aire (enrollada sin tocar el piso)"
                state={[radio, setRadio]}
                name="manguerasAguaAire"
              />
              <DivChecks
                text="Maseteros, solo aplica a isla 1 y 2 de GDL1 (sin basura)"
                state={[radio, setRadio]}
                name="maseteros"
              />
            </tbody>
          </table>
          <div className="mb-2 text-success">Parte II. Limpieza de la Isla</div>
          <table className="table">
            <tbody>
              <DivChecks
                text="Bomba limpia (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="bombaLimpia"
              />
              <DivChecks
                text="Piso limpio de la isla (sin lodo o polvo"
                state={[radio, setRadio]}
                name="pisoLimpio"
              />
              <DivChecks
                text="Isla limpia (sin basura)"
                state={[radio, setRadio]}
                name="islaLimpia"
              />
              <DivChecks
                text="Franja amarilla isla (sin lodo o polvo"
                state={[radio, setRadio]}
                name="franja"
              />
              <DivChecks
                text="Contenedor de agua para limpiaparabrisas limpio (sin lodo o polvo)"
                state={[radio, setRadio]}
                name="contenedorAgua"
              />
            </tbody>
          </table>
          <div className="mb-3">
            <label className="form-label text-success">
              Incidentes durante la evaluación
            </label>
            <textarea
              type="text"
              step="0.01"
              min="0.00"
              className="form-control"
              name="motivo"
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

const DivChecks = ({ text, state, name }) => {
  const [radio, setRadio] = state;
  return (
    <tr>
      <th>{text}</th>
      <th
        onClick={() => setRadio({ ...radio, [name]: true })}
        className={
          radio[name] ? "bg-success bg-opacity-75 text-center" : "text-center"
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

export default FormOrdenIsla;
