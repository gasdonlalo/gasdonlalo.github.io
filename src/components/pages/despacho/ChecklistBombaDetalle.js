import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import gdl from "../../assets/img/GDL.png";

const ChecklistBombaDetalle = () => {
  const { idE, fecha } = useParams();
  const { data, error, isPending } = useGetData(
    `/bomba-check/findCheck/${idE}/${fecha}`
  );

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho/checklist-reporte">
        Volver a reportes checklist de bombas
      </Link>
      <h3 className="border-bottom">Detalle del check</h3>
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
    </div>
  );
};
export default ChecklistBombaDetalle;
