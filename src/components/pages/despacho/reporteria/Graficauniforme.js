import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TablaUniforme from "../../../TablaUniforme";
import Meses from "../Meses.json";
import MontoFaltpdf from "../../../pdf_generador/MontoFaltpdf";
import Axios from "../../../../Caxios/Axios";
import useGetData from "../../../../hooks/useGetData";

function Graficauniforme() {
  const [datos, setDatos] = useState([]);
  const [anio, setAnio] = useState(null);
  const [mes, setMes] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const url = `/evaluacion-uniforme/periodo-mensual/${anio}/${mes}${
    empleado === "0" ? " " : `/${empleado}`
  }`;
  const peticion = useGetData("/empleado?departamento=1");

  useEffect(() => {
    consultarDatos(url);
  }, [url]);

  const consultarDatos = async (x) => {
    const req = await Axios.get(x);
    setDatos(req.data);
  };

  console.log(url);
  console.log(datos, "datos");
  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Grafica de uniforme</h3>
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
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Empleado
            </label>

            <select
              className="form-select"
              onChange={(ev) => {
                setEmpleado(ev.target.value);
              }}
            >
              <option value="0">Selecciona un empleado...</option>
              {/* {Meses.map((e) => {
                return <option value={e.id}>{e.mes}</option>;
              })} */}
              {!peticion.data
                ? false
                : peticion.data.response.map((e) => {
                    return (
                      <option
                        value={e.idempleado}
                      >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                    );
                  })}
            </select>
          </div>
        </form>
        <div id="render">
          <div>{datos && <TablaUniforme datos={datos} />}</div>
          {/* <div>{datos && <Chart datos={datos} />}</div> */}
        </div>

        <div>
          <MontoFaltpdf />
        </div>
      </div>
    </div>
  );
}

export default Graficauniforme;
