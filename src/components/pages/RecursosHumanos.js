import { useNavigate } from "react-router-dom";

function RecursosHumanos() {
  return (
    <div className="d-flex gap-3 justify-content-evenly">
      <div className="m-auto text-center mt-3 border-end w-50">
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
            text="Documentos de trabajadores"
          />
          <Card
            url="faltas-retardos"
            icon="fa solid fa-business-time"
            text="Faltas y retardos"
          />
          <Card
            url="concurso-madrugador"
            icon="fa-thin fa-award"
            text="Concurso el madrugador"
          />
          <Card
            url="concurso-octanoso"
            icon="fa-thin fa-award"
            text="Concurso el octanoso"
          />
          <Card
            url="concurso-aceitoso"
            icon="fa-thin fa-award"
            text="Concurso el aceitoso"
          />
          <Card
            url="entrega-recursos"
            icon="fa-thin fa-hand-holding-hand"
            text="Entrega de recursos"
          />
          <Card
            url="pago-recursos"
            icon="fa-thin fa-circle-dollar-to-slot"
            text="Compromiso de pago de recursos"
          />
        </div>
      </div>
      <div className="mt-3 text-center m-auto w-50">
        <h3>Reportes</h3>
        <div className="d-flex justify-content-evenly wrap mt-5">
          <Card
            url="grafica-mensual"
            icon="chart-simple"
            text="Grafica Mensual"
          />

        </div>
      </div>
    </div>
  );
}

const Card = ({ url, text, icon }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded p-2 btn-select m-1" onClick={() => navigate(url)}>
      <i className={`fa-regular fa-${icon}`} style={{ fontSize: "50px" }}></i>
      <p className="p-0 m-0">{text}</p>
    </div>
  );
};

export default RecursosHumanos;