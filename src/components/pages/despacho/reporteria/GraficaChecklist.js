import { useState } from "react";
import { Link } from "react-router-dom";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../assets/Loader";
import format from "../../../assets/format";
import Scale from "../../../charts/Scale";

/* function GraficaChecklist() {
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
        </div>

        <div>
          <MontoFaltpdf />
        </div>
      </div>
    </div>
  );
}
        </div>

        <div>
          <MontoFaltpdf />
        </div>
      </div>
    </div>
  );
} */
function GraficaChecklist() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const checkBomba = useGetData(`/bomba-check/${year}/${month}`);
  console.log(checkBomba);

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">Registro mensual de checklist</h3>
      <div className="row w-75 mx-auto">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!checkBomba.error && !checkBomba.isPending && (
        <Success data={checkBomba.data.response} />
      )}
      {checkBomba.isPending && <Loader />}
    </div>
  );
}

const Success = ({ data }) => {
  const validarInserciones = (el) => {
    if (el.cumple) {
      return <span className="text-success m-0 p-0">1</span>;
    } else {
      if (!el.fecha_db) {
        return null;
      } else {
        return <span className="text-danger m-0 p-0">0</span>;
      }
    }
  };

  return (
    <div>
      <table className="table table-bordered w-75 m-auto mt-4" border="1px">
        <tr>
          <th className="m-0 p-0">Nombre del despachador</th>
          {data.map((el) => (
            <th key={format.obtenerDiaMes(el.fecha)}>
              {format.obtenerDiaMes(el.fecha)}
            </th>
          ))}
        </tr>
        {data[0].data.map((el, i) => (
          <tr>
            <td className="m-0 p-0">{el.nombre_completo}</td>
            {data.map((da) => (
              <td>{validarInserciones(da.data[i])}</td>
            ))}
          </tr>
        ))}
      </table>
      <Scale></Scale>
    </div>
  );
};

export default GraficaChecklist;
