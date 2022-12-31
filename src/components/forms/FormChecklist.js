import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";
import Loader from "../assets/Loader";
import { useState } from "react";
import Axios from "../../Caxios/Axios";
import ModalSuccess from "../assets/ModalSuccess";
import ModalError from "../assets/ModalError";

function FormChecklist() {
  const [bomba, setBomba] = useState(1);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [formPending, setFormPending] = useState(false);
  const [body, setBody] = useState({
    islaLimpia: 1,
    aceitesCompletos: 1,
    turno: "Mañana",
  });

  const estacion = useGetData("/estaciones-servicio");
  const bombas = useGetData(`/bomba/${bomba}`);
  const despachador = useGetData(`/empleado?departamento=1`);

  const changeEstacion = (e) => {
    setBomba(e.target.value);
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  const closeModal = () => {
    setModalError(false);
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
      setFormPending(false);
      setModalError(true);
    }
  };

  return (
    <div className="container">
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError show={modalError} close={closeModal} />
      <form className="row m-auto" style={{ width: "800px" }} onSubmit={enviar}>
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
          <label className="form-label">Turno</label>
          <select
            name="turno"
            className="form-select"
            defaultValue={1}
            onChange={handle}
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Noche">Noche</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Escoje la estacion de servicio</label>
          <select
            name="estacionServicio"
            className="form-select"
            onChange={changeEstacion}
            defaultValue={1}
          >
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
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Escoje la bomba</label>
          {!bombas.error && !bombas.isPending && (
            <select
              name="idbomba"
              className="form-select"
              onChange={handle}
              required
            >
              <option value="#">-- Escoje la bomba --</option>
              {bombas.data.response.map((el) => (
                <option value={el.idbomba} key={el.idbomba}>
                  {el.bomba}
                </option>
              ))}
            </select>
          )}
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

        <div className="col-md-6">
          <label className="form-label">Empleado Saliente</label>
          {!despachador.error && !despachador.isPending && (
            <InputSelectEmpleado
              empleados={despachador.data.response}
              name="idempleadoSaliente"
              handle={handle}
            />
          )}
        </div>

        <div className="col-md-12 mt-4">
          <button type="submit" className="btn btn-primary m-auto d-block">
            {formPending ? <Loader size="1.5" /> : "Guardar Check"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default FormChecklist;
