import { useNavigate } from "react-router-dom";
function Despacho() {
  return (
    <div className="Main">
      <h1 className="text-center border-bottom w-100">Despacho</h1>
      <div className="d-flex gap-3 justify-content-evenly ">
        <div className="m-auto text-center mt-3 border-end">
          <h3>Captura de indicadores de desempeño</h3>

          <div className="w-100 d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="montos-faltantes"
              icon="money-bills"
              text="Monto faltante"
            />
            <Card url="checklist" icon="check" text="Checklist bomba" />
            <Card
              url="evaluacion-uniforme"
              icon="shirt"
              text="Evaluación uniforme"
            />
            <Card
              url="recoleccion-efectivo"
              icon="sack-dollar"
              text="Recoleccion efectivo"
            />
            <Card
              url="pasos-despachar"
              icon="list-check"
              text="Pasos para despachar"
            />
            <Card
              url="recurso-despachador"
              icon="stapler"
              text="Recursos despachador"
            />
            <Card
              url="salida-no-conforme"
              icon="thumbs-down"
              text="Salidas no conformes"
            />
          </div>
        </div>
        <div className="text-center m-auto">
          <h3>Reportes</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="montos-faltantes/reporte"
              icon="chart-simple"
              text="Monto faltante"
            />
            <Card
              url="checklist/reporte"
              icon="chart-line"
              text="Checklist Bomba"
            />
            <Card
              url="evaluacion-uniforme/reporte"
              icon="chart-simple"
              text="Evaluacion uniforme"
            />
            <Card
              url="recoleccion-efectivo/reporte"
              icon="chart-simple"
              text="Recoleccion efectivo"
            />
            <Card
              url="pasos-despachar/reporte"
              icon="chart-simple"
              text="Pasos para despachar"
            />
            <Card
              url="recurso-despachador/reporte"
              icon="chart-line"
              text="Recursos despachador"
            />
            <Card
              url="salida-no-conforme-files"
              icon="file-pdf"
              text="Salidas no conformes"
            />
          </div>
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

export default Despacho;
