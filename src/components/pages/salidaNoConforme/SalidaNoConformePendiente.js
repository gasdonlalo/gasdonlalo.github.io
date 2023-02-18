import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../assets/Loader";
import format from "../../assets/format";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import ErrorHttp from "../../assets/ErrorHttp";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import ModalConfirmacion from "../../modals/ModalConfirmacion";
import ModalSuccess from "../../modals/ModalSuccess";
import Axios from "../../../Caxios/Axios";
import ActualizarSNC from "../../modals/ActualizarSNC";

export const SalidasNoConformesPendientes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showActualizar, setShowActualizar] = useState(false);
  const [actualizar, setActualizar] = useState(false);

  const reportes = useGetData(
    `salida-no-conforme/pendientes/${year}/${month}`,
    actualizar
  );

  const { departamento } = useParams();

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="SNC por resolver"
        urlBack={`/${departamento}`}
        textUrlback={`Regresar a ${departamento}`}
      >
        <div className="d-flex">
          <IconComponents
            icon="chart-line text-success"
            text="Reporte Mensual"
            url="../reporte-mensual"
          />
          <IconComponents
            icon="chart-simple text-info"
            text="Reporte inconformidad"
            url="../inconformidad"
          />
        </div>
      </HeaderComponents>

      <div className="row w-75 mx-auto mt-4">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {reportes.isPending && <Loader></Loader>}
      {!reportes.isPending && !reportes.error && (
        <Success
          data={reportes.data.response}
          showConfirmacion={showConfirmacion}
          setShowConfirmacion={setShowConfirmacion}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          actualizar={actualizar}
          setActualizar={setActualizar}
          showActualizar={showActualizar}
          setShowActualizar={setShowActualizar}
        />
      )}
      {reportes.error && !reportes.isPending && (
        <div className="mt-5">
          <ErrorHttp msg={reportes.dataError.msg} />
        </div>
      )}
    </div>
  );
};

const Success = ({
  data,
  showConfirmacion,
  setShowConfirmacion,
  showSuccess,
  setShowSuccess,
  setActualizar,
  actualizar,
  showActualizar,
  setShowActualizar,
}) => {
  const [idActualizar, setIdActualizar] = useState(null);
  console.log(data);

  const closeConfirmacion = () => {
    setShowConfirmacion(false);
  };

  const closeActualizar = () => {
    setShowActualizar(false);
  };

  const handleActualizar = (id) => {
    setIdActualizar(id);
    setShowActualizar(true);
  };

  const enviarEliminar = async () => {
    setShowConfirmacion(false);
    try {
      await Axios.delete(`/salida-no-conforme/${idActualizar}`);
      setShowSuccess(true);
      setActualizar(!actualizar);
      setTimeout(() => {
        setShowSuccess(false);
      }, 800);
    } catch (error) {}
  };

  return (
    <div
      className="d-flex mt-2"
      style={{ overflowY: "scroll", maxHeight: "100vh" }}
    >
      <ModalConfirmacion
        show={showConfirmacion}
        enviar={enviarEliminar}
        handleClose={closeConfirmacion}
      />
      <ModalSuccess show={showSuccess} />
      <div className="d-flex ">
        <ActualizarSNC
          show={showActualizar}
          handleClose={closeActualizar}
          id={idActualizar}
          setActualizar={setActualizar}
          actualizar={actualizar}
        />
        {data.map((el) => (
          <div
            className="m-2 rounded d-flex p-2"
            key={el.idsalida_noconforme}
            style={{ backgroundColor: "#dadada" }}
          >
            <div className="w-100 me-2">
              <p>
                <span className="fw-bold">Empleado: </span>
                {format.formatTextoMayusPrimeraLetra(
                  `${el.empleadoIncumple.nombre} ${el.empleadoIncumple.apellido_paterno} ${el.empleadoIncumple.apellido_materno}`
                )}
              </p>
              <p>
                <span className="fw-bold">Incumplimiento: </span>
                {format.formatTextoMayusPrimeraLetra(el.incumplimiento)}
              </p>
              <p>
                <span className="fw-bold">Fecha: </span>
                {format.formatFechaComplete(el.fecha)}
              </p>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <button
                type="button"
                className="btn btn-success mb-3 "
                onClick={() => handleActualizar(el.idsalida_noconforme)}
              >
                Validar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalidasNoConformesPendientes;
