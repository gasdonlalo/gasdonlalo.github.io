import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import FormBuscarDetallesTiempo from "../../../forms/FormBuscarDetallesTiempo";
// import IconComponents from "../../../assets/IconComponents";
import Axios from "../../../../Caxios/Axios";
import format from "../../../assets/format";
import useGetData from "../../../../hooks/useGetData";

const HistorialRecursoDes = () => {
  const [data, setData] = useState(null);
  const [msgError, setMsgError] = useState(null);
  const [body, setBody] = useState(null);
  console.log(msgError);
  const buscarDatos = async () => {
    try {
      const res = await Axios.post(`/lista-recurso-despachador/buscar`, body);
      setData(res.data.response);
    } catch (err) {
      setMsgError("No se encontro registro");
      console.log(err);
    }
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluación recursos de despachador por tiempo"
        urlBack="../recurso-despachador/reporte"
        textUrlback="Regresar a reportes"
      >
        {/* <IconComponents icon="chart-simple text-warning"/> */}
      </HeaderComponents>
      <div>
        <FormBuscarDetallesTiempo
          bodyState={[body, setBody]}
          buscarDatos={buscarDatos}
        />
        {data && <GraficaSuccess data={data} />}
        {msgError && <p className="text-center text-danger">{msgError}</p>}
      </div>
    </div>
  );
};

const GraficaSuccess = ({ data }) => {
  const pasos = useGetData(`/lista-recurso-despachador/get-recurso`);
  console.log(data);
  return (
    <div>
      <div className="overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="border px-2 text-center">Fecha</th>
              {!pasos.error &&
                !pasos.isPending &&
                pasos.data.response.map((el) => (
                  <th key={el.idrecurso} className="border px-2 text-center">
                    {el.recurso}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((el, i) => (
                <tr key={i}>
                  <td className="border text-center px-2">
                    {el[0].quincena} qna {format.formatMes(el[0].fecha)} de{" "}
                    {format.formatYear(el[0].fecha)}
                  </td>
                  {el.map((sel) => (
                    <td key={sel.idrecurso} className="border text-center">
                      {sel.evaluacion ? 1 : 0}
                    </td>
                  ))}
                  <td className="btn btn-light d-table-cell">
                    <li className="fa-solid fa-trash text-danger"></li>
                  </td>
                  <td className="btn btn-light d-table-cell">
                    <li className="fa-solid fa-pen text-warning"></li>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialRecursoDes;
