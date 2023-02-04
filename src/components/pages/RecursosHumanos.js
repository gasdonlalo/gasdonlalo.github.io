import { useNavigate } from "react-router-dom";

function RecursosHumanos() {
  return (
    <div className="Main">
      <h1 className="text-center border-bottom w-100">Recursos Humanos</h1>
      <div className="d-flex gap-3 justify-content-evenly">
        <div className="m-auto text-center mt-3 border-end">
          <h3>Captura de documentos</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="captura-solicitud"
              icon="address-book"
              text="Solicitudes de empleo"
            />

            <Card
              url="documentos-trabajadores"
              icon="fa-solid fa-book"
              text="Documentos de personal"
            />
            <Card
              url="faltas-retardo"
              icon="fa solid fa-business-time"
              text="Faltas y retardos"
            />
            <Card
              url="concurso-octanoso"
              icon="fa-thin fa-gas-pump"
              text="Venta de litros"
            />
            <Card
              url="concurso-aceitoso"
              icon="fa-thin fa-oil-can"
              text="Venta de aceite"
            />
            <Card
              url="entrega-recursos"
              icon="fa-thin fa-hand-holding-hand"
              text="Entrega de recursos"
            />
            {/* <Card
              url="empleados-dados-baja"
              icon="fa-thin  fa-arrows-down-to-people"
              text="Empleados rechazados/dados de baja"
            /> */}
            <Card
              url="departamentos"
              icon="fa-solid fa-briefcase"
              text="Departamentos"
            />
          </div>
        </div>
        <div className="mt-3 text-center m-auto">
          <h3>Reportes</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="grafica-mensual-faltas-retardos"
              icon="chart-simple"
              text="Faltas y retardos por empleado"
            />
            <Card
              url="alta-baja-empleados"
              icon="fa-solid fa-table"
              text="Altas y baja de empleados"
            />
            <Card
              url="concurso-madrugador"
              icon="fa-thin fa-award"
              text="Concurso el madrugador"
            />
            <Card
              url="concurso-octanoso/reporte"
              icon="fa-thin fa-award"
              text="Concurso el octanoso"
            />
            <Card
              url="concurso-aceitoso/reporte"
              icon="fa-thin fa-award"
              text="Concurso el aceitoso"
            />
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
