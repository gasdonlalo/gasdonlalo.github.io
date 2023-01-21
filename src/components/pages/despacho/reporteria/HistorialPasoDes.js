import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import FormBuscarDetallesTiempo from "../../../forms/FormBuscarDetallesTiempo";
import Axios from "../../../../Caxios/Axios";
import ModalSuccess from "../../../modals/ModalSuccess";
import ModalError from "../../../modals/ModalError";
import format from "../../../assets/format";
import { EditED } from "../../../modals/EditED";

const HistorialPasoDes = () => {
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Evaluaciones pasos de despacho por empleado"
        urlBack="/despacho/pasos-despachar/reporte"
        textUrlback="Regresar a reportes de evaluaciones"
      ></HeaderComponents>
      <div>
        {!data && (
          <FormBuscarDetallesTiempo
            setData={setData}
            url="/pasos-despachar/buscar"
            toggle={[actualizador, setActualizador]}
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
      </div>
      {edit.id && (
        <EditED
          stateEdit={[edit, setEdit]}
          setModalError={setModalError}
          setModalSuccess={setModalSuccess}
          toggle={[actualizador, setActualizador]}
        />
      )}
      {/*{del.id && (
        <DeleteEU
          stateDel={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          actualizar={buscarDatos}
        />
      )} */}
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

const GraficaSuccess = ({ data, setData, setEdit }) => {
  const dataMerge = [];
  data.forEach((el) => dataMerge.push(...el));
  const suma = dataMerge
    .map((el) => (el.evaluacion ? 1 : 0))
    .reduce((a, b) => a + b, 0);
  const promedio = (suma / data.length).toFixed(2);

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
        <p>
          <b>Promedio historico: </b>
          <span className="fw-semibold">{promedio}</span>
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
                <td
                  className="px-1"
                  // onClick={() => setDel({ status: true, id: eu.identificador })}
                >
                  <li
                    role="button"
                    className="fa-solid fa-trash text-danger"
                    title="Eliminar"
                  ></li>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorialPasoDes;
