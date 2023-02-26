import { useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";
import InputFecha from "./InputFecha";
import InputSelectEmpleado from "./InputSelectEmpleado";

function FormOrdenIsla() {
  const [actualizador, setActualizador] = useState(false);
  const [body, setBody] = useState({
    evaluaciones: [
      { idcumplimiento: 0, cumple: 1 },
      { idcumplimiento: 1, cumple: 1 },
      { idcumplimiento: 2, cumple: 1 },
      { idcumplimiento: 3, cumple: 1 },
      { idcumplimiento: 4, cumple: 1 },
      { idcumplimiento: 5, cumple: 1 },
      { idcumplimiento: 6, cumple: 1 },
      { idcumplimiento: 7, cumple: 1 },
      { idcumplimiento: 8, cumple: 1 },
      { idcumplimiento: 9, cumple: 1 },
    ],
  });

  const [bomba, setBomba] = useState(null);
  const [estacionS, setEstacionS] = useState(null);
  const despachador = useGetData(`/empleado?departamento=1`, actualizador);
  const estacion = useGetData("/estaciones-servicio");
  const islas = useGetData(`/bomba/${bomba}`);
  const pasos = useGetData("/ordenLimpieza/cumplimientos");
  const [checkErroneo] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    setEstacionS(Number(e.target.value));
    setBomba(Number(e.target.value));
  };

  const handleEv = (e) => {
    let contenido = body.evaluaciones.filter(
      (el) => el.idcumplimiento !== Number(e.target.name)
    );
    contenido.push({
      idcumplimiento: Number(e.target.name),
      cumple: Number(e.target.value),
    });
    setBody({ ...body, evaluaciones: contenido });
  };

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);

    console.log(body);

    try {
      let res = await Axios.post("/ordenLimpieza", body);
      console.log(res);
      setFormPending(false);
      setModalSuccess(true);
      setBody({
        evaluaciones: body.evaluaciones.map((el) => ({
          idcumplimiento: el.idcumplimiento,
          cumple: 1,
        })),
      });
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
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
      e.target.reset();
    }
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
                name="idEmpleado"
                handle={handle}
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
              onChange={handle}
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
            <label className="form-label">Escoje la isla</label>
            <select
              name="isla"
              className="form-select"
              onChange={handle}
              required
              disabled={checkErroneo}
            >
              {!islas.error && !islas.isPending && (
                <option value=""> -- Seleccione Isla-- </option>
              )}
              {!islas.error &&
                !islas.isPending &&
                islas.data.response.map((el) => (
                  <option value={el.idbomba} key={el.idbomba}>
                    {el.bomba}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-100 m-auto">
          <div className="form-label">Evaluaciones</div>
          <div className="d-flex flex-wrap justify-content-center">
            {!pasos.error &&
              !pasos.isPending &&
              pasos.data.response.map((el) => (
                <div
                  className="mx-1 p-1 text-center border my-2 rounded"
                  key={el.idoyl_cumplimiento}
                >
                  <label className="form-abel">{el.cumplimiento}</label>
                  <div className="w-100 d-flex justify-content-evenly">
                    <label className="form-label rounded border p-2 d-flex flex-column mx-1 text-success">
                      Cumple
                      <input
                        type="radio"
                        name={el.idoyl_cumplimiento}
                        className="input-check-form"
                        value={1}
                        onChange={handleEv}
                        defaultChecked
                      />
                    </label>
                    <label className="form-label rounded border p-2 d-flex flex-column mx-1 text-danger">
                      No cumple
                      <input
                        type="radio"
                        name={el.idoyl_cumplimiento}
                        className="input-check-form"
                        value={0}
                        onChange={handleEv}
                      />
                    </label>
                  </div>
                </div>
              ))}
          </div>

          {/* <div className="mb-3">
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
          </div> */}
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

export default FormOrdenIsla;
