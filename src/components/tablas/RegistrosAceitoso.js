import { useState } from "react";
import HeaderComponents from "../../GUI/HeaderComponents";
import ModalConfirmacion from "../modals/ModalConfirmacion";
import InputChangeYear from "../forms/InputChangeYear";
import InputChangeMes from "../forms/InputChangeMes";
import useGetData from "../../hooks/useGetData";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import ErrorHttp from "../assets/ErrorHttp";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";
import format from "../assets/format";

function RegistrosAceitoso() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [confirmacion, setConfirmacion] = useState(false);
  const [showCorrecto, setShowCorrecto] = useState(false);
  const [showError, setshowError] = useState(false);

  const [actualizar, setActualizar] = useState(false);
  const { data, error, isPending, dataError } = useGetData(
    `/aceitoso/${year}/${month}`,
    actualizar
  );
  const [idAceite, setIdAceite] = useState(null);

  const changeMonth = (e) => setMonth(e.target.value);
  const changeYear = (e) => setYear(e.target.value);

  const closeModal = () => {
    setConfirmacion(false);
    setShowCorrecto(false);
  };
  const closeError = () => {
    setshowError(false);
  };

  const eliminar = (id) => {
    setIdAceite(id);
    setConfirmacion(true);
  };
  const EnviarEliminar = async () => {
    setConfirmacion(false);
    try {
      await Axios.delete(`/aceitoso/delete/${idAceite}`);
      setActualizar(!actualizar);
      setShowCorrecto(true);
      setTimeout(() => {
        setShowCorrecto(false);
      }, 800);
    } catch {}
  };

  return (
    <div className="Main">
      <ModalSuccess show={showCorrecto} close={closeModal} />
      <ModalError
        show={showError}
        close={closeError}
        text="Error en la conexion"
      />
      <ModalConfirmacion
        show={confirmacion}
        handleClose={closeModal}
        enviar={EnviarEliminar}
      />
      <HeaderComponents title="Registros aceitoso" />
      <div className="row">
        <div className="col-6">
          <label className="form-label">Mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="col-6">
          <label className="form-label">Año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </div>
      <div className="mt-5">
        {!error && !isPending && (
          <Success datos={data.response} eliminar={eliminar} />
        )}
        {error && !isPending && (
          <div>
            <ErrorHttp msg={dataError.msg} />
          </div>
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}
const Success = ({ datos, eliminar }) => {
  return (
    <div className="container-fluid ">
      <table className="table table-bordered border-dark shadow">
        <thead>
          <tr className="table-secondary border-dark">
            <th>ID registro</th>
            <th>Fecha</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Estacion de servicio</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((el) => {
            return (
              <tr>
                <td>{el.idventa_aceite}</td>
                <td>{format.formatFechaComplete(el.fecha)}</td>
                <td>{el.nombre}</td>
                <td>{el.apellido_paterno}</td>
                <td>{el.apellido_materno}</td>
                <td>GDL {el.idestacion_servicio}</td>
                <td>${el.cantidad}</td>
                <td className="d-flex justify-content-center">
                  <button
                    className="btn btn-danger"
                    onClick={() => eliminar(el.idventa_aceite)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default RegistrosAceitoso;
