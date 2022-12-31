import { Link } from "react-router-dom";
import FormRecoleccion from "../../forms/FormRecoleccion";
import useGetData from "../../../hooks/useGetData";
import Axios from "../../../Caxios/Axios";
import { useState } from "react";

function RecolEfect() {
  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Recoleccion de efectivo</h4>
        <FormRecoleccion />
      </div>
    </div>
  );
}

export default RecolEfect;
