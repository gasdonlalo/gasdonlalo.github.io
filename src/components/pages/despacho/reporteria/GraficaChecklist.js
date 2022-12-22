import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Meses from "../Meses.json";
import Axios from "../../../../Caxios/Axios";
import MontoFaltpdf from "../../../pdf_generador/MontoFaltpdf";
import TablaCheck from "../../../TablaCheck";

function GraficaChecklist() {
  const [datos, setDatos] = useState([]);
  const [anio, setAnio] = useState(null);
  const [mes, setMes] = useState(null);
  const url = `/bomba-check/${anio}/${mes}`;

  useEffect(() => {
    consulta(url);
  }, [url]);

  const consulta = async (x) => {
    const req = await Axios.get(x);
    setDatos(req.data.response);
  };
  console.log(url);
  console.log(datos);
  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Registro mensual de checklist</h3>
      <div className="container">
        <form>
          <div className="row">
            <div className="mb-3 col 6">
              <label for="exampleInputEmail1" className="form-label">
                Año
              </label>
              <select
                className="form-select"
                onChange={(e) => setAnio(e.target.value)}
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
                onChange={(ev) => setMes(ev.target.value)}
              >
                {Meses.map((e) => {
                  return <option value={e.id}>{e.mes}</option>;
                })}
              </select>
            </div>
          </div>
        </form>
        <div id="render">
          <TablaCheck datos={datos} />
          {/* <div>{datos && <Tabla datos={datos} />}</div>
          <div>{datos && <Chart datos={datos} />}</div> */}
        </div>

        <div>
          <MontoFaltpdf />
        </div>
      </div>
    </div>
  );
}

export default GraficaChecklist;
