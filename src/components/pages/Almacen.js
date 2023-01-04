import { useNavigate } from "react-router-dom";

function Almacen() {
  return (
    <div className="Main">
      <h1 className="text-center border-bottom w-100">Almacen</h1>
      <div className="d-flex gap-3 justify-content-evenly">
        <div className="m-auto text-center mt-3 border-end w-50">
          <h3>Captura de desempeño</h3>

          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url="ciclico-aceites"
              icon="fa-solid fa-warehouse"
              text="Inventario ciclico de almacen aceites"
            />
            <Card
              url="ciclicos-comestibles-bebidas"
              icon="fa-solid fa-utensils"
              text="Inventario ciclico de almacen C & B"
            />
            <Card
              url=""
              icon="fa-solid fa-fire-extinguisher"
              text="Inventario de equipos"
            />
            <Card
              url=""
              icon="fa-solid fa-wrench"
              text="Inventario almacen de herramientas"
            />
            <Card
              url=""
              icon="fa-solid fa-stapler"
              text="Inventario almacen de papeleria"
            />
          </div>
        </div>

        {/* Segundo cuadro */}
        <div className="m-auto text-center mt-3 w-50">
          <h3>Reportería</h3>

          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            <Card
              url=""
              icon="chart-simple"
              text="Faltantes de almacen aceites"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Faltantes de C & B"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Faltantes de equipos"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Faltantes de almacen de herramientas"
            />
            <Card
              url=""
              icon="chart-simple"
              text="Faltantes de almacen de Papeleria"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({ url, icon, text }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded p-2 btn-select m-1" onClick={() => navigate(url)}>
      <i className={`fa-regular fa-${icon}`} style={{ fontSize: "50px" }}></i>
      <p className="p-0 m-0">{text}</p>
    </div>
  )
}

export default Almacen;