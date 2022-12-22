import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Pastel from "../../charts/Pastel";

const OrdenTrabajo = () => {
  const { year, month, idEstacion } = useParams();
  const { data, error, isPending } = useGetData(
    `orden-trabajo-calidad/buscar-cantidad-tipo/${year}/${month}/${idEstacion}`
  );
  let dataPastel = {};

  console.log({ data });

  const navigate = useNavigate();

  if (!error && !isPending) {
    dataPastel = {
      labels: data.response.map((el) => el.mantenimiento),
      data: data.response.map((el) => el.cantidad),
    };
  }

  return (
    <>
      {!error && !isPending && (
        <div className="d-flex flex-wrap gap-5 justify-content-center mt-3">
          {data.response.map((el) => (
            <div
              className="bg-secondary p-3 rounded"
              key={el.idmantenimiento}
              onClick={(e) =>
                navigate(`${el.mantenimiento}/${el.idmantenimiento}`)
              }
            >
              <p className="text-center fw-bold">{el.mantenimiento}</p>
              <p>
                Cantidad de ordenes:
                <span className="fw-bold"> {el.cantidad}</span>
              </p>
            </div>
          ))}
        </div>
      )}
      {!error && !isPending && (
        <div className="container" style={{ width: "500px", height: "500px" }}>
          <Pastel data={dataPastel}></Pastel>
        </div>
      )}
      {isPending && <h2>Esperando el servidor</h2>}
      {error && <h2>No hay datos por ahora</h2>}
    </>
  );
};
export default OrdenTrabajo;
