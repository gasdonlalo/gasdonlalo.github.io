import { useNavigate } from "react-router-dom";
import { Per } from "../Provider/Auth";

function Administrativo() {
  return (
    // Encabezado de la pagina
    <div className="Main">
      <h1 className="text-center border-bottom w-100">Administrativo</h1>

      {/* cuerpo */}
      <div className="d-flex gap-3 justify-content-evenly">
        <div className="m-auto text-center mt-3 border-end w-50">
          <h3>Configuraciones</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            {/* <Card
              url=""
              icon="fa-thin fa-clipboard-list"
              text="Captura de liquidación"
            />
            <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Cancelar de liquidación"
            />
            <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Configuracion de horarios de despacho"
            /> */}
            {Per(48) && (
              <Card
                icon="fa-thin fa-clipboard-list text-primary"
                url="configuracion-usuario"
                text="Configuración de usuarios"
              />
            )}
            {Per(50) && (
              <Card
                icon="fa-thin fa-clipboard-list text-primary"
                url="configuracion-permisos"
                text="Configuracion de permisos"
              />
            )}
            <Card
              icon="fa-thin fa-clipboard-list text-danger"
              url="permisos-inicial"
              text="entra gei"
            />
            {/* <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Configuracion de precios"
            />
            <Card
              icon="fa-thin fa-clipboard-list text-primary"
              url="configuracion-estacion"
              text="Configuración de estación"
            />
            <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Configuracion de lecturas iniciales"
            />
            <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Configuración de despachadores"
            />
            <Card
              icon="fa-thin fa-clipboard-list"
              url=""
              text="Configuracion de turnos"
            /> */}
          </div>
        </div>
        <div className="m-auto text-center mt-3 w-50">
          <h3>Reportes</h3>
          <div className="d-flex justify-content-evenly flex-wrap mt-5">
            {/* <Card
              url="rep-permisos"
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de precios cap. por fecha"
            />
            <Card
              url="rep-estacion"
              icon="chart-pie"
              text="Reporde de configuración de estación"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de lecturas iniciales captura (Hist'órico)"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de lecturas acumuladas (al día)"
            />
            <Card url="" icon="chart-pie" text="Reporde de despachadores" />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de turnos dados de alta"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde configuración horario (rango de fecha)"
            />
            <Card url="" icon="chart-pie" text="Reporde de " />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            />
            <Card
              url=""
              icon="chart-pie"
              text="Reporde de usuarios y opciones"
            /> */}
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

export default Administrativo;
