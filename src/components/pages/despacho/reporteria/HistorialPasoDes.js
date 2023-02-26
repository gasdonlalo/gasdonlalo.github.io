import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import FormBuscarDetallesTiempo from "../../../forms/FormBuscarDetallesTiempo";
import Axios from "../../../../Caxios/Axios";
import ModalSuccess from "../../../modals/ModalSuccess";
import ModalError from "../../../modals/ModalError";
import format from "../../../assets/format";
import { EditED, DeleteED } from "../../../modals/EditED";
import Decimal from "decimal.js-light";
import Scale from "../../../charts/Scale";
import IconComponents from "../../../assets/IconComponents";
import { Per } from "../../../Provider/Auth";

const HistorialPasoDes = () => {
  const [body, setBody] = useState(null);
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  const buscarDatos = async () => {
    try {
      const res = await Axios.post("/pasos-despachar/buscar", body);
      setData(res.data.response);
    } catch (err) {
      setModalError({
        status: true,
        msg: "No se encontraron datos en el intervalo de tiempo",
      });
      console.log(err);
    }
  };
  console.log(data);

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluaciones pasos de despacho por empleado"
        urlBack="/despacho/pasos-despachar/reporte"
        textUrlback="Regresar a reportes de evaluaciones"
      >
        <IconComponents
          icon="list-check text-info"
          text="Evaluar"
          url="../pasos-despachar"
        />
      </HeaderComponents>
      <div>
        {!data && (
          <FormBuscarDetallesTiempo
            buscarDatos={buscarDatos}
            bodyState={[body, setBody]}
          />
        )}
        {data && (
          <GraficaSuccess
            data={data}
            setData={setData}
            setEdit={setEdit}
            setDel={setDel}
            fechas={body}
          />
        )}
      </div>
      {edit.id && (
        <EditED
          stateEdit={[edit, setEdit]}
          setModalError={setModalError}
          setModalSuccess={setModalSuccess}
          buscarDatos={buscarDatos}
        />
      )}
      {del.id && (
        <DeleteED
          stateDel={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          buscarDatos={buscarDatos}
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
  );
};

const GraficaSuccess = ({ data, setData, setDel, setEdit, fechas }) => {
  const dataMerge = [],
    total = [],
    promedioP = [];

  const filterPasos = (idPaso) =>
    dataMerge.filter((el) => el.idpaso_despachar === idPaso);

  data.forEach((el) => dataMerge.push(...el));

  for (let i = 0; i < 9; i++) {
    const suma = filterPasos(i + 1)
      .map((el) => (el.evaluacion ? 1 : 0))
      .reduce((a, b) => a + b, 0);
    total.push(suma);
    promedioP.push(((suma / data.length) * 10).toFixed(2));
  }

  const promedio = (
    promedioP.reduce(
      (a, b) => new Decimal(Number(a)).add(Number(b)).toNumber(),
      0
    ) / 9
  ).toFixed(2);

  const dataScale = {
    labels: data[0].map((el) => el.paso.split(" ")),
    datasets: [
      {
        data: promedioP.map((el) => Number(el)),
        label: "Promedio",
        borderColor: "orange",
        backgroundColor: "silver",
      },
    ],
  };

  return (
    <div>
      <div className="mt-2">
        <button className="btn btn-success" onClick={() => setData(null)}>
          Buscar otro despachador
        </button>
      </div>
      <div>
        <p className="mb-0 mt-4">
          <b>Nombre Completo: </b>
          <span className="fw-semibold">{data[0][0].nombre_completo}</span>
        </p>
        <p className="mb-0">
          <b>Promedio acumulado: </b>
          <span className="fw-semibold">{promedio}</span>
        </p>
        <p className="mb-0">
          <b>Fecha Inicial: </b>
          <span className="fw-semibold">
            {format.formatFechaComplete(fechas.fechaInicio)}
          </span>
        </p>
        <p>
          <b>Fecha Final: </b>
          <span className="fw-semibold">
            {format.formatFechaComplete(fechas.fechaFinal)}
          </span>
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th className="border px-2">Evaluación</th>
              <th className="border px-2 text-center">Fecha</th>
              {data[0].map((el) => (
                <th
                  key={el.idpaso_despachar}
                  className="border px-2 text-center"
                >
                  {el.paso}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td className="border fw-semibold text-center">{i + 1}</td>
                <td className="border fw-semibold text-center px-2">
                  {format.formatFechaComplete(el[0].fecha)}
                </td>
                {el.map((sel, j) => (
                  <td key={j} className="border text-center fw-semibold">
                    {sel.evaluacion ? 1 : 0}
                  </td>
                ))}
                {Per(16) && (
                  <td
                    className="px-1"
                    onClick={() =>
                      setDel({ status: true, id: el[0].identificador })
                    }
                  >
                    <li
                      role="button"
                      className="fa-solid fa-trash text-danger"
                      title="Eliminar"
                    ></li>
                  </td>
                )}
                {Per(15) && (
                  <td
                    className="px-1"
                    onClick={() =>
                      setEdit({ status: true, id: el[0].identificador })
                    }
                  >
                    <li
                      role="button"
                      className="fa-solid fa-pen text-warning"
                      title="Actualizar"
                    ></li>
                  </td>
                )}
              </tr>
            ))}
            <tr className="bg-secondary text-white text-center fw-semibold">
              <th colSpan={2}>Total</th>
              {total.map((el, i) => (
                <td key={i}>{el}</td>
              ))}
            </tr>
            <tr className="bg-info text-center fw-semibold">
              <th colSpan={2}>Promedio</th>
              {promedioP.map((el, i) => (
                <td key={i}>{el}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-50 mx-auto">
        <Scale
          data={dataScale}
          legend={false}
          text="Promedio por pasos"
          optionsCustom={{
            scales: {
              y: {
                title: {
                  display: true,
                  text: "Promedio",
                },
                min: 0,
                max: 12,
              },
              x: {
                title: {
                  display: true,
                  text: "Pasos",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HistorialPasoDes;
