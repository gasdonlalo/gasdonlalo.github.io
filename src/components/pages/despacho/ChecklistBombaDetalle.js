import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import useGetData from "../../../hooks/useGetData";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import gdl from "../../assets/img/GDL.png";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalSuccess";
import { DeleteCB, EditCB } from "../../modals/EditCB";

const ChecklistBombaDetalle = () => {
  const [mEdit, setMEdit] = useState({ status: false, id: null });
  const [mDel, setMDel] = useState({ status: true, id: null });
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);
  const { idE, fecha } = useParams();
  const { data, error, isPending } = useGetData(
    `/bomba-check/findCheck/${idE}/${fecha}`,
    actualizador
  );
  const close = () => {
    setModalSucces(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Reporte Checklist de Bomba"
        urlBack="/despacho/checklist-reporte"
        textUrlback="Volver a reportes"
      >
        <IconComponents icon="chart-simple" />
      </HeaderComponents>
      {isPending && (
        <div className="mt-5">
          <Loader />
        </div>
      )}
      {!isPending && !error && (
        <div>
          <div className="m-auto" style={{ width: "min-content" }}>
            <p className="text-nowrap">
              <span className="fw-bold">Empleado: </span>
              <span className="fw-semibold">
                {format.formatTextoMayusPrimeraLetra(
                  data.response[0].nombre_completo_entrante
                )}{" "}
              </span>
            </p>
          </div>

          <table className="m-auto">
            <thead>
              <tr>
                <th className="border px-2 text-center">Estación</th>
                <th className="border px-2 text-center">Bomba</th>
                <th className="border px-2 text-center">Turno</th>
                <th className="border px-2 text-center">Fecha</th>
                <th className="border px-2 text-center">Aceites completos</th>
                <th className="border px-2 text-center">Isla limpia</th>
                <th className="border px-2 text-center">Empleado saliente</th>
              </tr>
            </thead>
            <tbody>
              {console.log(data)}
              {data.response.map((el) => (
                <tr key={el.idchecklist_bomba}>
                  <td className="border text-center px-2">
                    {el.estacion_servicio}
                  </td>
                  <td className="border text-center px-2">{el.bomba}</td>
                  <td className="border text-center px-2">{el.turno}</td>
                  <td className="border text-center px-2">
                    {format.formatFechaComplete(el.fecha)}
                  </td>
                  <td className="border text-center px-2">
                    {el.aceites_completos ? (
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
                    {format.formatTextoMayusPrimeraLetra(
                      el.nombre_completo_saliente
                    )}
                  </td>
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
                  <td
                    className="btn"
                    onClick={() => {
                      setMEdit({ status: true, id: el.idchecklist_bomba });
                    }}
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
export default ChecklistBombaDetalle;
