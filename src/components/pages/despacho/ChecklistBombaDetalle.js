import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import { DeleteCB, EditCB } from "../../modals/EditCB";
import gdl from "../../assets/img/GDL.png";
import { Per } from "../../Provider/Auth";
import { Datos } from "../../Provider/Checklist";
import { useContext } from "react";
import Grafica from "../../charts/Bar";

const ChecklistBombaDetalle = () => {
  const { year, month, idEmpleado } = useParams();
  const [datas] = useContext(Datos);

  const datosFiltrados =
    datas === null
      ? null
      : Object.values(datas[0]).filter(
          (el) => el.empleado.idempleado === Number(idEmpleado)
        );

  const [mEdit, setMEdit] = useState({ status: false, id: null });
  const [mDel, setMDel] = useState({ status: true, id: null });
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);

  const { data, error, isPending } = useGetData(
    `/bomba-check/findCheck/${year}/${month}/${idEmpleado}`,
    actualizador
  );
  const close = () => {
    setModalSucces(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Detalles Checklist de Bomba"
        urlBack="/despacho/checklist/reporte"
        textUrlback="Volver a reportes"
      ></HeaderComponents>
      {isPending && (
        <div className="mt-5">
          <Loader />
        </div>
      )}
      {!isPending && !error && (
        <Success
          data={data}
          setMDel={setMDel}
          setMEdit={setMEdit}
          datosGrafica={datosFiltrados}
        />
      )}
      {!isPending && error && (
        <div>
          <div>
            <p
              style={{ fontSize: "60px" }}
              className="text-danger fw-bold text-center"
            >
              Sin resultados :(
            </p>
            <img src={gdl} alt="gdl" className="w-25 m-auto d-block" />
          </div>
        </div>
      )}
      {mEdit.id && (
        <EditCB
          stateEdit={[mEdit, setMEdit]}
          toogle={[actualizador, setActualizador]}
          setModalError={setModalError}
          setModalSuccess={setModalSucces}
        />
      )}
      {mDel.id && (
        <DeleteCB
          stateDel={[mDel, setMDel]}
          toogle={[actualizador, setActualizador]}
          setModalError={setModalError}
          setModalSuccess={setModalSucces}
        />
      )}
      <ModalSuccess
        text="Se actualizaron los datos correctamente"
        show={modalSucces}
        close={close}
      />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={close}
      />
    </div>
  );
};

const Success = ({ data, setMDel, setMEdit, datosGrafica }) => {
  const dataBar = datosGrafica !== null && {
    labels: datosGrafica[0].fechas.map((el) => el.fecha),
    dataset: [
      {
        data: datosGrafica[0].fechas.map((el) =>
          el.cumple === 1 ? 1 : el.cumple === 0 ? 0 : 0
        ),
        label: "Correctos",
      },
    ],
  };
  return (
    <div>
      <h4 className="text-center">
        <b>Empleado: </b>

        {format.formatTextoMayusPrimeraLetra(
          `${data.response.empleado.nombre} ${data.response.empleado.apellido_paterno} ${data.response.empleado.apellido_materno}`
        )}
      </h4>

      <table className="m-auto">
        <thead>
          <tr>
            <th className="border px-2 text-center">Fecha</th>
            <th className="border px-2 text-center">Fecha check</th>
            <th className="border px-2 text-center">Estación servicio</th>
            <th className="border px-2 text-center">Turno</th>
            <th className="border px-2 text-center">Bomba</th>
            <th className="border px-2 text-center">Isla limpia</th>
            <th className="border px-2 text-center">Aceites completos</th>
            <th className="border px-2 text-center">Incidente</th>
            <th className="border px-2 text-center">
              Empleado empleado entrante
            </th>
            <th className="border px-2 text-center">Empleado saliente check</th>
            <th className="border px-2 text-center">Empleado saliente</th>
          </tr>
        </thead>

        <tbody>
          {data.response.data.map((el) => (
            <tr key={el.idchecklist_bomba}>
              <td className="border text-center px-2">
                {format.formatFechaComplete(el.fecha)}
              </td>
              <td className="border text-center px-2">
                {el.fechac ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.estacion_servicio ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.turno ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.bomba ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.isla_limpia ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.aceites_completos ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.incidentes || "-----"}
              </td>
              <td className="border text-center px-2">
                {el.empleado_entrante ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>
              <td className="border text-center px-2">
                {el.empleado_saliente ? (
                  <span className="text-success fw-semibold">Cumple</span>
                ) : (
                  <span className="text-danger fw-semibold">No cumple</span>
                )}
              </td>

              <td className="border text-center px-2">
                {format.formatTextoMayusPrimeraLetra(
                  `${el.empSaliente.nombre} ${el.empSaliente.apellido_paterno} ${el.empSaliente.apellido_materno}`
                )}
              </td>

              {Per(7) && (
                <td
                  className="btn"
                  onClick={() =>
                    setMDel({ status: true, id: el.idchecklist_bomba })
                  }
                >
                  <li
                    role="button"
                    className="fa-solid fa-trash text-danger"
                    title="Eliminar"
                  ></li>
                </td>
              )}
              {Per(6) && (
                <td
                  className="btn"
                  onClick={() => {
                    setMEdit({
                      status: true,
                      id: el.idchecklist_bomba,
                      nombreEntrante: `${data.response.empleado.nombre} ${data.response.empleado.apellido_paterno} ${data.response.empleado.apellido_materno}`,
                      nombreSaliente: `${el.empSaliente.nombre} ${el.empSaliente.apellido_paterno} ${el.empSaliente.apellido_materno}`,
                    });
                  }}
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
        </tbody>
      </table>
      {datosGrafica !== null && (
        <div className="m-auto">
          <Grafica
            text={`Checklists correctos de ${format.formatTextoMayusPrimeraLetra(
              `${data.response.empleado.nombre} ${data.response.empleado.apellido_paterno} ${data.response.empleado.apellido_materno}`
            )} `}
            datos={dataBar}
            optionsCustom={{
              scales: {
                y: {
                  title: { display: true, text: "Cumple" },
                  ticks: {
                    stepSize: 1,
                    callback: (value) => (value === 1 ? "Cumple" : "No cumple"),
                  },
                },
                x: { title: { display: true, text: "Fecha" } },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};
export default ChecklistBombaDetalle;
