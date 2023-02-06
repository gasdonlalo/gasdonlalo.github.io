import { useNavigate } from "react-router-dom";
import { Per } from "../Provider/Auth";

function RecursosHumanos() {
  return (
    <div className="Main">
      <h1 className="text-center border-bottom w-100">Recursos Humanos</h1>
      <div className="d-flex gap-3 justify-content-evenly">
        <div className="m-auto text-center mt-3 border-end">
          <h3>Captura de documentos</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            {Per(25) && (
              <Card
                url="captura-solicitud"
                icon="address-book"
                text="Solicitudes de empleo"
              />
            )}
            {Per(28) && (
              <Card
                url="documentos-trabajadores"
                icon="fa-solid fa-book"
                text="Documentos de personal"
              />
            )}
            {Per(30) && (
              <Card
                url="faltas-retardo"
                icon="fa solid fa-business-time"
                text="Faltas y retardos"
              />
            )}
            {Per(34) && (
              <Card
                url="concurso-octanoso"
                icon="fa-thin fa-gas-pump"
                text="Venta de litros"
              />
            )}
            {Per(38) && (
              <Card
                url="concurso-aceitoso"
                icon="fa-thin fa-oil-can"
                text="Venta de aceite"
              />
            )}
            {Per(42) && (
              <Card
                url="entrega-recursos"
                icon="fa-thin fa-hand-holding-hand"
                text="Entrega de recursos"
              />
            )}
            {/* <Card
              url="empleados-dados-baja"
              icon="fa-thin  fa-arrows-down-to-people"
              text="Empleados rechazados/dados de baja"
            /> */}
            {Per(45) && (
              <Card
                url="departamentos"
                icon="fa-solid fa-briefcase"
                text="Departamentos"
              />
            )}
            {Per(20) && (
              <Card
                url="salida-no-conforme"
                icon="thumbs-down"
                text="Salidas no conformes"
              />
            )}
          </div>
        </div>
        <div className="mt-3 text-center m-auto">
          <h3>Reportes</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            {Per(29) && (
              <Card
                url="grafica-mensual-faltas-retardos"
                icon="chart-simple"
                text="Faltas y retardos por empleado"
              />
            )}
            {Per(24) && (
              <Card
                url="alta-baja-empleados"
                icon="fa-solid fa-table"
                text="Altas y baja de empleados"
              />
            )}
            {Per(29) && (
              <Card
                url="concurso-madrugador"
                icon="fa-thin fa-award"
                text="Concurso el madrugador"
              />
            )}
            {Per(33) && (
              <Card
                url="concurso-octanoso/reporte"
                icon="fa-thin fa-award"
                text="Concurso el octanoso"
              />
            )}
            {Per(37) && (
              <Card
                url="concurso-aceitoso/reporte"
                icon="fa-thin fa-award"
                text="Concurso el aceitoso"
              />
            )}
            {Per(20) && (
              <Card
                url="salida-no-conforme/files"
                icon="file-pdf"
                text="Salidas no conformes"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = ({ url, text, icon, rotacion }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded p-2 btn-select m-1"
      onClick={() => navigate(url)}
      style={{ minWidth: "100px", maxWidth: "150px" }}
    >
      <i
        className={`fa-regular fa-${icon}`}
        style={{ fontSize: "50px", transform: `rotate(${rotacion}deg)` }}
      ></i>
      <p className="p-0 m-0">{text}</p>
    </div>
  );
};

export default RecursosHumanos;
