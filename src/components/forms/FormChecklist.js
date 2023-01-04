import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";
import Loader from "../assets/Loader";
import { useRef, useState } from "react";
import Axios from "../../Caxios/Axios";
import ModalSuccess from "../assets/ModalSuccess";
import ModalError from "../assets/ModalError";
import HeaderForm from "../../GUI/HeaderForm";
import ModalEmpleados from "../assets/ModalEmpleados";

function FormChecklist() {
  const [bomba, setBomba] = useState(null);
  const [estacionS, setEstacionS] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);
  const [body, setBody] = useState({
    islaLimpia: 1,
    aceitesCompletos: 1,
    turno: "Mañana",
  });

  const estacion = useGetData("/estaciones-servicio");
  const bombas = useGetData(`/bomba/${bomba}`);
  const despachador = useGetData(`/empleado?departamento=1`);
  const turnos = useGetData(`/estaciones-servicio/turnos/${estacionS}`);

  const changeEstacion = (e) => {
    setEstacionS(Number(e.target.value));
    setBomba(Number(e.target.value));
  };

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    console.log(body);
    try {
      let res = await Axios.post("/bomba-check", body);
      console.log(res);
      setFormPending(false);
      setModalSuccess(true);
      setBody({ islaLimpia: 1, aceitesCompletos: 1, turno: "Mañana" });
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
    <div className="container">
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <form
        className="row m-auto shadow rounded p-3 mt-3"
        style={{ width: "800px" }}
        onSubmit={enviar}
      >
        <HeaderForm />
        <div className="col-6">
          <label className="form-label">Fecha de check</label>
          <InputFecha
            data={body}
            setData={setBody}
            handle={handle}
            name="fecha"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Escoje la estacion de servicio</label>
          <select
            name="estacionServicio"
            className="form-select"
            onChange={changeEstacion}
            defaultValue={1}
          >
            {estacion.isPending && (
              <option value="">Cargando estaciones...</option>
            )}
            {!estacion.error && !estacion.isPending && (
              <option value="">Estacion de servicio</option>
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
        <div className="col-md-6">
          <label className="form-label">Turno</label>
          <select
            name="turno"
            className="form-select"
            defaultValue={1}
            onChange={handle}
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
        <div className="col-md-6">
          <label className="form-label">Escoje la bomba</label>
          <select
            name="idbomba"
            className="form-select"
            onChange={handle}
            required
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
        <div className="col-md-6  text-center ">
          <label className="form-label">Isla limpia</label>
          <div className="w-100 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              cumple
              <input
                type="radio"
                name="islaLimpia"
                onChange={handle}
                className="input-check-form"
                value={1}
                defaultChecked
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              no cumple
              <input
                type="radio"
                onChange={handle}
                name="islaLimpia"
                className="input-check-form"
                value={0}
              />
            </label>
          </div>
        </div>
        <div className="col-md-6  text-center ">
          <label className="form-label">Aceites completos</label>
          <div className="w-100 d-flex justify-content-evenly">
            <label className="form-label rounded border p-2 d-flex flex-column">
              cumple
              <input
                type="radio"
                name="aceitesCompletos"
                className="input-check-form"
                value={1}
                onChange={handle}
                defaultChecked
              />
            </label>
            <label className="form-label rounded border p-2 d-flex flex-column">
              no cumple
              <input
                type="radio"
                name="aceitesCompletos"
                onChange={handle}
                className="input-check-form"
                value={0}
              />
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Empleado Entrante</label>
          {!despachador.error && !despachador.isPending && (
            <InputSelectEmpleado
              empleados={despachador.data.response}
              name="idempleadoEntrante"
              handle={handle}
            />
          )}
        </div>
        <InputEmpleados despachador={despachador} handle={handle} />
        <div className="col-md-12 mt-4">
          <button type="submit" className="btn btn-primary m-auto d-block">
            {formPending ? <Loader size="1.5" /> : "Guardar Check"}
          </button>
        </div>
      </form>
    </div>
  );
}

const InputEmpleados = ({ despachador, handle }) => {
  const [showMEm, setShowMEm] = useState(false);
  const [options, setOptions] = useState(null);
  const selectSaliente = useRef();

  const closeModal = () => setShowMEm(false);

  const selectEmpleado = (data) => setOptions([data]);

  return (
    <>
      <div className="col-md-6">
        <label className="form-label">Empleado Saliente</label>
        <div className="input-group">
          <select
            name="idempleadoSaliente"
            className="form-select"
            onChange={handle}
            ref={selectSaliente}
          >
            <option value="">-- Escoge empleado -- </option>
            {options
              ? options.map((el) => (
                  <option value={el.idempleado} key={el.idempleado}>
                    {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                  </option>
                ))
              : !despachador.error &&
                !despachador.isPending &&
                despachador.data.response.map((el) => (
                  <option value={el.idempleado} key={el.idempleado}>
                    {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                  </option>
                ))}
            {despachador.isPending && <option value="">Cargando...</option>}
          </select>
          <span
            className="input-group-text"
            role="button"
            onClick={() => setShowMEm(true)}
          >
            empleados
          </span>
        </div>
      </div>
      <ModalEmpleados
        show={showMEm}
        close={closeModal}
        setEmpleado={selectEmpleado}
      />
    </>
  );
};
export default FormChecklist;
