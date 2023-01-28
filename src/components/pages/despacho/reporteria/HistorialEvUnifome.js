import { useState } from "react";
import Axios from "../../../../Caxios/Axios";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Scale from "../../../charts/Scale";
import ModalSuccess from "../../../modals/ModalSuccess";
import ModalError from "../../../modals/ModalError";
import { DeleteEU, EditEU } from "../../../modals/EditEU";
import IconComponents from "../../../assets/IconComponents";
import FormHistorialEmpleado from "../../../forms/FormHistorialEmpleado";
import format from "../../../assets/format";

const HistorialEvUnifome = () => {
  const [data, setData] = useState(null);
  const [body, setBody] = useState(null);
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [msgError, setMsgError] = useState(null);

  const buscarDatos = async () => {
    try {
      const res = await Axios.post(`/evaluacion-uniforme/buscar`, body);
      setData(res.data.response);
      setMsgError(null);
    } catch (err) {
      setData(null);
      setMsgError("!No se encontraron datos");
    }
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluaciones de uniforme por Despachador"
        urlBack="/despacho/evaluacion-uniforme/reporte"
        textUrlback="Regresar a reportes"
      >
        <IconComponents
          icon="shirt text-info"
          text="Registros"
          url="/despacho/evaluacion-uniforme"
        />
      </HeaderComponents>
      {data && (
        <div className="m-2">
          <button className="btn btn-success" onClick={() => setData(null)}>
            Buscar otro despachador
          </button>
        </div>
      )}
      {!data && (
        <FormHistorialEmpleado
          buscarDatos={buscarDatos}
          state={[body, setBody]}
          msgError={msgError}
        />
      )}
      {data && <GraficaSuccess data={data} setEdit={setEdit} setDel={setDel} />}
      {edit.id && (
        <EditEU
          stateEdit={[edit, setEdit]}
          setModalError={setModalError}
          setModalSuccess={setModalSuccess}
          actualizar={buscarDatos}
        />
      )}
      {del.id && (
        <DeleteEU
          stateDel={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          actualizar={buscarDatos}
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

const GraficaSuccess = ({ data, setEdit, setDel }) => {
  const totalPuntos = data
    .map((el) => el.total_evaluacion)
    .reduce((a, b) => a + b);
  const promedioGeneral = (totalPuntos / data.length).toFixed(2);
  const dataBar = {
    labels: data.map((el) => {
      if (data.length > 20) {
        return `${el.quincena} Qna ${format
          .formatMes(el.fecha)
          .slice(0, 3)} ${format
          .formatFechaLocale(el.fecha)
          .getFullYear()
          .toString()
          .slice(2, 4)}`;
      } else {
        return `${el.quincena}\rquincena ${format.formatMes(el.fecha)} ${format
          .formatFechaLocale(el.fecha)
          .getFullYear()}`.split(" ");
      }
    }),
    datasets: [
      {
        data: data.map((el) => el.total_evaluacion),
        backgroundColor: "rgba(214, 93, 15, 1)",
        borderColor: "rgba(214, 93, 15, 1)",
      },
    ],
  };
  return (
    <div>
      <p className="fw-bold mb-0">
        Nombre: <span className="fw-semibold">{data[0].nombre_completo}</span>
      </p>
      <p className="fw-bold mb-0">
        Promedio Historico:{" "}
        <span className="fw-semibold">{promedioGeneral}</span>
      </p>
      <table>
        <thead>
          <tr>
            <th className="border px-2">N°</th>
            <th className="border px-2">Fecha Evaluación</th>
            <th className="border px-2">Quincena</th>
            <th className="border px-1">Puntos Obtenidos</th>
          </tr>
        </thead>
        <tbody>
          {data.map((eu, i) => (
            <tr key={eu.idevaluacion_uniforme}>
              <td className="fw-semibold border text-center">{i + 1}</td>
              <td className="fw-semibold border text-center">
                {format.formatFechaComplete(eu.fecha)}
              </td>
              <td className="fw-semibold border text-center">{eu.quincena}</td>
              <td className="fw-semibold border text-center">
                {eu.total_evaluacion}
              </td>
              <td
                className="btn btn-light"
                onClick={() => setDel({ status: true, id: eu.identificador })}
              >
                <li
                  role="button"
                  className="fa-solid fa-trash text-danger"
                  title="Eliminar"
                ></li>
              </td>
              <td
                className="btn btn-light"
                onClick={() => setEdit({ status: true, id: eu.identificador })}
              >
                <li
                  role="button"
                  className="fa-solid fa-pen text-warning"
                  title="Actualizar"
                ></li>
              </td>
            </tr>
          ))}
          <tr>
            <th colSpan={3} className="border text-center">
              Total
            </th>
            <th className="border text-center">{totalPuntos}</th>
          </tr>
        </tbody>
      </table>
      <div className="w-75 mx-auto mt-4">
        <Scale
          data={dataBar}
          legend={false}
          text={`Evaluaciones de ${format.formatTextoMayusPrimeraLetra(
            data[0].nombre_completo
          )}`}
          optionsCustom={{
            scales: {
              y: {
                min: 0,
                max: 8,
                ticks: {
                  stepSize: 1,
                },
                title: {
                  display: true,
                  text: "Puntos",
                  font: {
                    size: "20px",
                    weight: "bold",
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Quincenas",
                  font: {
                    size: "20px",
                    weight: "bold",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HistorialEvUnifome;
