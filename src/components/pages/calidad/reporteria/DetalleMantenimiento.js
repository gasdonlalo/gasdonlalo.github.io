/* import useGetData from "../../../../hooks/useGetData";
import Pastel from "../../../charts/Pastel"; */

const DetalleMantenimiento = () => {
  /*  const { year, month, idEstacion, idMantenimiento, mantenimiento } =
    useParams();
    */
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [idEstacion, setIdEstacion] = useState(null);
  const { data, error, isPending } = useGetData(
    `orden-trabajo-calidad/buscar-area/${year}/${month}/${idEstacion}/${idMantenimiento}`
  );

  let dataPastel = {};

  console.log(data);

  /* if (!error && !isPending) {
    dataPastel = {
      labels: data.response.map((el) => el.area),
      data: data.response.map((el) => el.cantidad),
    };
  } */
  return <h1>hola</h1>;
  /* return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="bg-secondary p-3 rounded">
          <p className="text-center fw-bold">{mantenimiento}</p>
        </div>
      </div>
      {!error && !isPending && (
        <div className="d-flex flex-wrap gap-5 justify-content-center mt-3">
          {data.response.map((el) => (
            <div className="bg-warning p-3 rounded text-center">
              <p>{el.area}</p>
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
          <Pastel data={dataPastel} />
        </div>
      )}
    </>
  ); */
};

export default DetalleMantenimiento;
