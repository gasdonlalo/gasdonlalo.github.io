import { useNavigate } from "react-router-dom";

function Calidad() {
    return(
        <div className="Main">
        <h1 className="text-center border-bottom w-100">Calidad</h1>
        <div className="d-flex gap-3 justify-content-evenly">
          <div className="m-auto text-center mt-3 border-end w-50">
            <h3>Captura de documentos</h3>

            <div className="d-flex justify-content-evenly flex-wrap mt-5">
              <Card
                url="/calidad/orden-trabajo"
                icon="fa-thin fa-clipboard-list"
                text="Orden de trabajo"
              />
            </div>
          </div>
          <div className="m-auto text-center mt-3 w-50">
            <h3>Reportes</h3>
            <div className="d-flex justify-content-evenly wrap mt-5">
              <Card
                url=""
                icon="chart-simple"
                text="Grafica mensual de mantenimiento"
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

export default Calidad;