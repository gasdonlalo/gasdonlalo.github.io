import React from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";

const HistorialPasoDes = () => {
  return (
    <div className="Main">
      <HeaderComponents
        title="Pasos de despacho por empleado"
        urlBack="/despacho/pasos-despachar/reporte"
        textUrlback="Regresar a reportes de despacho"
      ></HeaderComponents>
    </div>
  );
};

export default HistorialPasoDes;
