import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import ErrorHttp from "../../assets/ErrorHttp";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import Select from "react-select";
import HeaderComponents from "../../../GUI/HeaderComponents";
import HeaderForm from "../../../GUI/HeaderForm";

const SNCEmpleado = () => {
  const [idChecador, setIdChecador] = useState(null);
  const handleChecador = (e) => setIdChecador(Number(e.value));
  const { data, error, isPending } = useGetData("/empleado");

  const datosEmp =
    !error &&
    !isPending &&
    data.response.map((el) => ({
      value: el.idchecador,
      label: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    }));

  return (
    <div className="Main">
      <HeaderComponents
        title="SNC por empleados"
        urlBack="../"
        textUrlback="Regresar"
      />
      <div className="container-sm ">
        <div className="row">
          <div className="col-5 shadow p-2 mt-4">
            <HeaderForm />
            <label className="label-form fw-semibold">Empleado</label>
            <Select
              options={datosEmp}
              isLoading={isPending}
              onChange={handleChecador}
            />
          </div>
        </div>
      </div>
      {idChecador === null ? (
        <div className="bg-secondary fw-semibold text-center container-sm text-white">
          <p>Digite el id del empleado para ver sus salidas no conformes</p>
        </div>
      ) : (
        <FindData idChecador={idChecador} />
      )}
    </div>
  );
};

const FindData = ({ idChecador }) => {
  const { data, error, isPending } = useGetData(
    `salida-no-conforme/detalleEmpleado/${idChecador}`
  );
  console.log(data);
  return (
    <div className="mt-4">
      {error && !isPending && <ErrorHttp msg={"No se encontraron SNC"} />}
      {!error && !isPending && <Success data={data.response} />}
      {isPending && <Loader />}
    </div>
  );
};

const Success = ({ data }) => {
  return (
    <div>
      <p className="text-center fw-semibold">
        {data[0].empleado.nombre} {data[0].empleado.apellido_paterno}{" "}
        {data[0].empleado.apellido_materno}
      </p>
      <div className="container-sm">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Folio</th>
              <th>Fecha</th>
              <th>Descripcion de la falla</th>
              <th>Correciones</th>
              <th>Concesiones</th>
              <th>Autorizo</th>
              <th>Tema</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr
                key={el.idsalida_noconforme}
                className={`${
                  !el.empleadoAutoriza && "bg-danger bg-opacity-25"
                }`}
              >
                <td>{el.idsalida_noconforme}</td>
                <td>{format.formatFechaComplete(el.fecha)}</td>
                <td>{el.descripcion_falla}</td>
                <td>{el.acciones_corregir}</td>
                <td>{el.concesiones}</td>
                {el.empleadoAutoriza ? (
                  <td>
                    {el.empleadoAutoriza.nombre}{" "}
                    {el.empleadoAutoriza.apellido_paterno}{" "}
                    {el.empleadoAutoriza.materno}
                  </td>
                ) : (
                  <td>Pendiente</td>
                )}
                <td>{el.incumplimiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SNCEmpleado;
