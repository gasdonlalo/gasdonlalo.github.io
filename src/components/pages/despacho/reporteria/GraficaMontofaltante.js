import { useState, useEffect } from "react";
import Meses from "../Meses.json";
import Chart from "../../../charts/Chart";
import Axios from "../../../../Caxios/Axios";
import Tabla from "../../../Tabla";
import { Link } from "react-router-dom";
import MontoFaltpdf from "../../../pdf_generador/MontoFaltpdf";

function GraficaMontofaltante() {
  const [anio, setAnio] = useState(null);
  const [mes, setMes] = useState(null);
  const [datos, setDatos] = useState(null);
  const url = `monto-faltante-despachador/semanas/${anio}/${mes}`;

  useEffect(() => {
    consultarDatos(url);
  }, [url]);

  const consultarDatos = async (x) => {
    const req = await Axios.get(x);
    setDatos(req.data);
  };

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Monto faltante por despachadores</h3>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col 6">
              <label for="exampleInputEmail1" className="form-label">
                Año
              </label>
              <select
                className="form-select"
                onChange={(ev) => {
                  setAnio(ev.target.value);
                }}
              >
                <option value={null}>Elige una opción</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div className="mb-3 col-6">
              <label for="exampleInputEmail1" className="form-label">
                Mes
              </label>
              <select
                className="form-select"
                onChange={(ev) => {
                  setMes(ev.target.value);
                }}
              >
                {Meses.map((e) => {
                  return <option value={e.id}>{e.mes}</option>;
                })}
              </select>
            </div>
          </div>
        </form>
        <div id="render">
          <div>{datos && <Tabla datos={datos} />}</div>
          <div>{datos && <Chart datos={datos} />}</div>
        </div>

        <div>
          <MontoFaltpdf />
        </div>
      </div>
    </div>
  );
}

export default GraficaMontofaltante;
