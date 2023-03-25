import { useState, Fragment } from "react";
import Ventana from "../assets/ventana/Ventana";

function Liquidacion() {
  const [showConfig, setshowConfig] = useState(false);
  const [showLiquidacion, setshowLiquidacion] = useState(false);

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
      <div
        className="d-flex flex-column justify-content-center align-items-center border-end bg-danger bg-opacity-25"
        style={{
          width: "10vw",
          overflowY: "scroll",
        }}
      >
        <Card text="Configuración" icon="gear" action={mostrarAjustes} />
        <Card text="Liquidación" icon="receipt" action={mostrarLiquidacion} />
      </div>
      {/* Principal */}
      {/* <div className="d-flex flex-fill flex-wrap justify-content-evenly align-items-center m-5">
        <Card text="Configuracion de bomba " icon="gas-pump" height="100px" />
        <Card text="Configuracion de xxxx" />
      </div> */}
      <div className="d-flex flex-fill justify-content-evenly align-items-center  m-3">
        {!showConfig && !showLiquidacion && (
          <h4>Selecciona una opción para empezar</h4>
        )}
        {showConfig && <Ajustes />}
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
const Ajustes = () => {
  const [showVentana, setShowVentana] = useState(false);
  const mostrarVentana = () => {
    setShowVentana(true);
  };
  return (
    <Fragment>
      <Card
        text="Ajuste inicial de bomba"
        icon="gas-pump"
        action={mostrarVentana}
      />
      <Card text="Ajuste xxxxx" icon="gas-pump" action={mostrarVentana} />

      {showVentana && <Ventana cerrar={() => setShowVentana(false)} />}
    </Fragment>
  );
};
const Liquidaciones = () => {
  return <div>Liquidación</div>;
};

export default Liquidacion;
