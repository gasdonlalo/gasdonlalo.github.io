import { useNavigate } from "react-router-dom"

function Mantenimiento() {
  return (
        <div className="Main">
      <h1 className="text-center border-bottom w-100">Mantenimiento</h1>
      <div className="d-flex gap-3 justify-content-evenly">
        <div className="m-auto text-center mt-3 border-end w-50">
          <h1>Captura de indicadores</h1>

          {/* primer tabla */}
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="/calidad/orden-trabajo"
              icon="fa-thin fa-clipboard-list"
              text="Ordenes de trabajo"
            />
            <Card
              url=""
              icon="fa-solid fa-money-bill-1-wave"
              text="Costos por ordenes de trabajo"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="Checklist de P. de Mantenimiento"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="Checklist de limpieza"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="Checklist de M. de equipos"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="Indicias en el mes"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="Costos de materials y horas hombre"
            />
            <Card
              url=""
              icon="fa-solid fa-list-check"
              text="No. Conf. inspe. Inrwena de Mantenimiento"
            />
          </div>
        </div>

        {/* Segunda tabla */}
        <div className="m-auto text-center mt-3 w-50">
          <h1>Reporteria</h1>

          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url=""
              icon="chart-simple"
              text="Gréfica mensual de mantenimiento"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Gráfica mensual de incidencias"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Gráfica mensual de costos de mantenimiento(P & C)"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Gráficas de N.C.I.I.M"
            />
          </div>
        </div>

      </div>
        </div>
  )
}

const Card = ({ url, text, icon }) => {
  const navigate = useNavigate ();
  return (
    <div className="rounded p-2 btn-select m-1" onClick={() => navigate(url)}>
      <i className={`fa-regular fa-${icon}`} style={{fontSize:"50px"}}></i>
      <p className="p-0 m-0">{ text }</p>
    </div>
  )
}

export default Mantenimiento;