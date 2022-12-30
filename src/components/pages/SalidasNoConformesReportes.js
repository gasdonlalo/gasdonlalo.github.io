import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import format from "../assets/format";
import InputChangeMes from "../forms/InputChangeMes";
import InputChangeYear from "../forms/InputChangeYear";
import ErrorHttp from "../assets/ErrorHttp";
import PDFSalidaNoConforme from "./despacho/PDFSalidaNoConforme";
export const SalidasNoConformesReportes = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const reportes = useGetData(`salida-no-conforme/${year}/${month}`);

  console.log(reportes);

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div>
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Registro mensual de checklist</h3>
      <div className="row w-75 mx-auto">
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
    </div>
  );
};

const Success = ({ data }) => {
  const [idSalida, setIdSalida] = useState(null);
  const salidaNoConforme = useGetData(`salida-no-conforme/${idSalida}`);
  console.log(salidaNoConforme);

  return (
    <div className="row w-100 m-2">
      <div className="col-md-6 overflow-scroll" style={{ maxHeight: "80vh" }}>
        {data.map((el) => (
          <div
            className="mt-2 rounded p-2 position-relative"
            style={{ backgroundColor: "#dadada", width: "400px" }}
            key={el.idsalida_noconforme}
          >
            <p>
              <span className="fw-bold">Empleado: </span>
              {format.formatTextoMayusPrimeraLetra(el.nombre_completo_incumple)}
            </p>
            <p>
              <span className="fw-bold">Incumplimiento: </span>
              {format.formatTextoMayusPrimeraLetra(el.incumplimiento)}
            </p>
            <p>
              <span className="fw-bold">Fecha: </span>
              {format.formatFechaComplete(el.fecha)}
            </p>
            <button
              className="btn btn-danger position-absolute  top-0 end-0"
              onClick={() => setIdSalida(el.idsalida_noconforme)}
            >
              PDF
            </button>
          </div>
        ))}
      </div>
      <div className="col-md-6">
        <div className="auto">
          {salidaNoConforme.error && !salidaNoConforme.isPending && (
            <ErrorHttp />
          )}
          {!salidaNoConforme.error && !salidaNoConforme.isPending && (
            <div style={{ height: "80vh" }}>
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
        </div>
      </div>
    </div>
  );
};

export default SalidasNoConformesReportes;