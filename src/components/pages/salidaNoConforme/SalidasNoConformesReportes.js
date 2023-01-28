import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../assets/Loader";
import format from "../../assets/format";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import ErrorHttp from "../../assets/ErrorHttp";
import PDFSalidaNoConforme from "../despacho/PDFSalidaNoConforme";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";

export const SalidasNoConformesReportes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const reportes = useGetData(`salida-no-conforme/${year}/${month}`);

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
        title="Registros de salidas no conformes"
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
        <Success data={reportes.data.response} />
      )}
      {reportes.error && !reportes.isPending && (
        <div className="mt-5">
          <ErrorHttp msg={reportes.dataError.msg} />
        </div>
      )}
    </div>
  );
};

const Success = ({ data }) => {
  const [idSalida, setIdSalida] = useState(null);
  const salidaNoConforme = useGetData(`salida-no-conforme/${idSalida}`);
  console.log(salidaNoConforme);

  return (
    <div className="d-flex mt-2">
      <div
        className="d-flex flex-column w-25"
        style={{ overflowY: "scroll", maxHeight: "100vh" }}
      >
        {data.map((el) => (
          <div
            className="m-2 rounded d-flex p-2"
            key={el.idsalida_noconforme}
            style={{ backgroundColor: "#dadada" }}
          >
            <div className="w-100">
              <p>
                <span className="fw-bold">Empleado: </span>
                {format.formatTextoMayusPrimeraLetra(
                  el.nombre_completo_incumple
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

            <button
              className="btn btn-danger w-25 h-25 "
              onClick={() => setIdSalida(el.idsalida_noconforme)}
            >
              PDF
            </button>
          </div>
        ))}
      </div>
      <div className="w-75">
        <div>
          {salidaNoConforme.error && !salidaNoConforme.isPending && (
            <div className="mt-5">
              <ErrorHttp />
            </div>
          )}
          {!salidaNoConforme.error && !salidaNoConforme.isPending && (
            <div style={{ height: "100vh" }}>
              {
                <PDFSalidaNoConforme
                  inconformidad={
                    salidaNoConforme.data.response[0].descripcion_falla
                  }
                  fecha={format.formatFechaComplete(
                    salidaNoConforme.data.response[0].fecha
                  )}
                  corregir={salidaNoConforme.data.response[0].acciones_corregir}
                  concesiones={salidaNoConforme.data.response[0].concesiones}
                />
              }
            </div>
          )}
          {salidaNoConforme.isPending && <Loader />}
        </div>
      </div>
    </div>
  );
};

export default SalidasNoConformesReportes;
