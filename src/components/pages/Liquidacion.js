import { useState, Fragment } from "react";
import Ventana from "../assets/ventana/Ventana";
import ConfiguracionInicial from "./administrativo/ConfiguracionLecturasIni";
import ConfiguracionEstacion from "./administrativo/ConfiguracionEstacion";

function Liquidacion() {
  const [showConfig, setshowConfig] = useState(false);
  const [showLiquidacion, setshowLiquidacion] = useState(false);
  const [contenido, setContenido] = useState(null);
  const [titulo, setTitulo] = useState(null);
  const [showVentana, setShowVentana] = useState(false);

  const mostrarVentana = (contenido, titulo) => {
    setContenido(contenido);
    setTitulo(titulo);
    setShowVentana(true);
  };
  const cerrarVentana = () => {
    setShowVentana(false);
  };

  const mostrarAjustes = () => {
    setshowConfig(true);
    setshowLiquidacion(false);
  };
  const mostrarLiquidacion = () => {
    setshowConfig(false);
    setshowLiquidacion(true);
  };

  return (
    <div className="d-flex" style={{ minHeight: "80vh" }}>
      {/* Barra lateral */}
      <div
        className="d-flex flex-column justify-content-center align-items-center border-end bg-danger bg-opacity-25 shadow"
        style={{
          width: "10vw",
          overflowY: "scroll",
        }}
      >
        <Card text="Configuración" icon="gear" action={mostrarAjustes} />
        <Card text="Liquidación" icon="receipt" action={mostrarLiquidacion} />
      </div>
      {/* Principal */}
      <div className="d-flex flex-fill justify-content-evenly align-items-center  m-3">
        {!showConfig && !showLiquidacion && (
          <h4>Selecciona una opción para empezar</h4>
        )}
        {showConfig && (
          <Ajustes
            showVentana={showVentana}
            mostrarVentana={mostrarVentana}
            cerrarVentana={cerrarVentana}
            contenido={contenido}
            titulo={titulo}
          />
        )}
        {showLiquidacion && <Liquidaciones />}
      </div>
    </div>
  );
}
const Card = ({ text, icon, height, width, action }) => {
  return (
    <div
      className="rounded p-2 btn-liq m-1 text-center"
      onClick={action}
      style={{ height: height, width: { width } }}
    >
      <i className={`fa-regular fa-${icon}`} style={{ fontSize: "50px" }}></i>
      <p className="p-0 m-0">{text}</p>
    </div>
  );
};
const Ajustes = ({
  mostrarVentana,
  cerrarVentana,
  showVentana,
  contenido,
  titulo,
}) => {
  return (
    <Fragment>
      <Card
        text="Configuración de estaciones"
        icon="gas-pump"
        action={() =>
          mostrarVentana(ConfiguracionEstacion, "Configurar estaciones")
        }
      />
      <Card
        text="Configuración inicial de bomba"
        icon="gas-pump"
        action={() =>
          mostrarVentana(ConfiguracionInicial, "Configuración inicial de bomba")
        }
      />

      {showVentana && (
        <Ventana children={contenido} title={titulo} cerrar={cerrarVentana} />
      )}
    </Fragment>
  );
};
const Liquidaciones = () => {
  return <div>Liquidación</div>;
};

export default Liquidacion;
