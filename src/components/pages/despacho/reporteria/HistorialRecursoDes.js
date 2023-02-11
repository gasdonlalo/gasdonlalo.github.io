import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import FormHistorialEmpleado from "../../../forms/FormHistorialEmpleado";
import { EditER, DeleteER } from "../../../modals/EditER";
import Axios from "../../../../Caxios/Axios";
import format from "../../../assets/format";
import useGetData from "../../../../hooks/useGetData";
import Decimal from "decimal.js-light";
import Scale from "../../../charts/Scale";
import ModalSuccess from "../../../modals/ModalSuccess";
import IconComponents from "../../../assets/IconComponents";
import ModalError from "../../../modals/ModalError";
import { Per } from "../../../Provider/Auth";

const HistorialRecursoDes = () => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });
  const [msgError, setMsgError] = useState(null);
  const [body, setBody] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

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
        <IconComponents
          icon="stapler text-info"
          text="Evaluar"
          url="../recurso-despachador"
        />
      </HeaderComponents>
      <div>
        {!data && (
          <FormHistorialEmpleado
            state={[body, setBody]}
            msgError={msgError}
            buscarDatos={buscarDatos}
          />
        )}
        {edit.id && (
          <EditER
            stateEdit={[edit, setEdit]}
            setModalError={setModalError}
            setModalSuccess={setModalSuccess}
            buscarDatos={buscarDatos}
          />
        )}
        {del.id && (
          <DeleteER
            stateDel={[del, setDel]}
            setModalSuccess={setModalSuccess}
            setModalError={setModalError}
            buscarDatos={buscarDatos}
          />
        )}
        {data && (
          <GraficaSuccess
            data={data}
            setData={setData}
            setEdit={setEdit}
            setDel={setDel}
          />
        )}
        <ModalSuccess
          show={modalSuccess}
          text="Se actualizaron los datos correctamente"
          close={closeModal}
        />
        <ModalError
          show={modalError.status}
          text={modalError.msg}
          close={closeModal}
        />
      </div>
    </div>
  );
};

const GraficaSuccess = ({ data, setData, setEdit, setDel }) => {
  const dataMerge = [],
    total = [],
    promedioR = [];
  let dataScale;
  data.forEach((el) => el.forEach((els) => dataMerge.push(els)));
  const filterRecurso = (idRecurso) =>
    dataMerge.filter((el) => el.idrecurso === idRecurso);

  for (let i = 0; i < 20; i++) {
    let suma = filterRecurso(i + 1)
      .map((el) => (el.evaluacion ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    promedioR.push(Number(((suma / data.length) * 10).toFixed(2)));
    total.push(suma);
  }

  const pasos = useGetData(`/lista-recurso-despachador/get-recurso`);
  if (!pasos.error && !pasos.isPending) {
    dataScale = {
      text: `${data[0][0].nombre} ${data[0][0].apellido_paterno} ${data[0][0].apellido_materno}`,
      labels: pasos.data.response.map((el) => el.recurso),
      datasets: [
        {
          data: promedioR,
          borderColor: "orange",
          backgroundColor: "silver",
        },
      ],
    };
  }

  console.log(dataScale);
  return (
    <div>
      <div className="mt-2">
        <button className="btn btn-success" onClick={() => setData(null)}>
          Buscar otro despachador
        </button>
      </div>
      <div>
        <p className="fw-bold mb-0">
          Nombre completo:{" "}
          <span className="fw-semibold">
            {data[0][0].nombre} {data[0][0].apellido_paterno}{" "}
            {data[0][0].apellido_materno}
          </span>
        </p>
        <p className="fw-bold">
          Promedio Historico:{" "}
          <span className="fw-semibold">
            {(
              promedioR.reduce((a, b) => new Decimal(a).add(b).toNumber(), 0) /
              20
            ).toFixed(2)}
          </span>
        </p>
      </div>
      <div className="overflow-scroll">
        <table>
          <thead>
            <tr>
              <th className="border px-2 text-center">Fecha</th>
              <th className="border px-2 text-center">Qna.</th>
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
                    {format.formatFechaComplete(el[0].fecha)}
                  </td>
                  <td className="border text-center px-2">{el[0].quincena}</td>
                  {el.map((sel) => (
                    <td key={sel.idrecurso} className="border text-center">
                      {sel.evaluacion ? 1 : 0}
                    </td>
                  ))}
                  {Per(19) && (
                    <td
                      className="btn btn-light d-table-cell"
                      onClick={() =>
                        setDel({ status: true, id: el[0].identificador })
                      }
                    >
                      <li className="fa-solid fa-trash text-danger"></li>
                    </td>
                  )}
                  {Per(18) && (
                    <td
                      className="btn btn-light d-table-cell"
                      onClick={() =>
                        setEdit({ status: true, id: el[0].identificador })
                      }
                    >
                      <li className="fa-solid fa-pen text-warning"></li>
                    </td>
                  )}
                </tr>
              ))}
            <tr className="bg-secondary text-white text-center fw-semibold">
              <td colSpan={2}>Total</td>
              {total.map((el, i) => (
                <td key={i} className="border">
                  {el}
                </td>
              ))}
            </tr>
            <tr className="bg-info text-center fw-semibold">
              <td colSpan={2}>Promedio</td>
              {promedioR.map((el, i) => (
                <td key={i} className="border">
                  {el}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        {!pasos.error && !pasos.isPending && (
          <div className="w-100">
            <div className="mx-auto w-75">
              <Scale
                data={dataScale}
                text={dataScale.text}
                legend={false}
                optionsCustom={{
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Promedio",
                        font: {
                          size: "20",
                        },
                      },
                      ticks: {
                        stepSize: 1,
                      },
                      min: 0,
                      max: 11,
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Recursos evaluados",
                        font: {
                          size: "20",
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialRecursoDes;
