import { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../assets/Loader";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import ErrorHttp from "../../assets/ErrorHttp";
import format from "../../assets/format";
import InputChangeYear from "../../forms/InputChangeYear";
import InputChangeMes from "../../forms/InputChangeMes";
import Bar from "../../charts/Bar";

const MontoFaltanteEmpleado = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  let url = `/monto-faltante-despachador/total-mes-empleado/${year}/${month}`;
  const empleados = useGetData(url);

  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div>
      <div className="Main">
        <div>
          <Link
            className="link-primary"
            to="/despacho/montos-faltantes/detalles"
          >
            Volver a detalles de despacho
          </Link>
          <h4 className="border-bottom">
            Buscar Montos Faltantes por empleado
          </h4>
        </div>
      </div>
      {empleados.isPending && <Loader />}
      <div className="my-4 w-25 m-auto">
        <label className="mb-2 w-100 text-center">
          Selecciona el periodo de tiempo
        </label>
        <div className="row w-100">
          <div className="col-md-6">
            <InputChangeYear handle={changeYear} defaultYear={year} />
          </div>
          <div className="col-md-6">
            <InputChangeMes handle={changeMonth} defaultMes={month} />
          </div>
        </div>
      </div>
      {!empleados.error && !empleados.isPending && (
        <Success
          empleados={empleados.data.response}
          url={url}
          date={[year, month]}
        />
      )}
      {empleados.error && !empleados.isPending && (
        <div className="w-100 vh-100 d-flex">
          <div className="m-auto">
            <ErrorHttp
              code={empleados.dataError.code}
              msg={empleados.dataError.msg}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Success = ({ empleados, url, date }) => {
  const [idEmpleado, setIdEmpleado] = useState(null);
  const dEmpleado = useGetData(`${url}/${idEmpleado}`);

  console.log(dEmpleado);
  let dataBar = {};
  const setEmpleado = (e) => {
    setIdEmpleado(e.target.value);
  };
  if (!dEmpleado.error && !dEmpleado.isPending) {
    dataBar = {
      labels: dEmpleado.data.response.map((el) =>
        format.obtenerDiaMes(el.fecha)
      ),
      dataset: [
        {
          data: dEmpleado.data.response.map((el) => el.cantidad),
          label: "Mes de " + format.formatMes(new Date(date[0], date[1], 0)),
        },
      ],
    };

    console.log(dataBar);
  }

  return (
    <div className="">
      <div className="w-25 m-auto">
        <label>Selecciona el empleado</label>
        <InputSelectEmpleado empleados={empleados} handle={setEmpleado} />
      </div>
      {!dEmpleado.error && !dEmpleado.isPending && (
        <div className="d-flex justify-content-center">
          <div className="d-flex mt-4 ms-2">
            <table
              className="table table-bordered m-auto"
              style={{ width: "300px" }}
            >
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {dEmpleado.data.response.map((el, i) => (
                  <tr key={i}>
                    <td>{format.formatFecha(el.fecha)}</td>
                    <td>{format.formatDinero(el.cantidad)}</td>
                  </tr>
                ))}
                <tr>
                  <th>Total</th>
                  <th>
                    {format.formatDinero(
                      dEmpleado.data.response
                        .map((el) => el.cantidad)
                        .reduce((a, b) => a + b, 0)
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="w-50">
            <Bar
              datos={dataBar}
              text={format.formatTextoMayusPrimeraLetra(
                dEmpleado.data.response[0].nombre_completo
              )}
            ></Bar>
          </div>
        </div>
      )}
      {dEmpleado.error && !dEmpleado.isPending && (
        <div className="mt-5">
          <ErrorHttp code={404} msg="Selecciona un despachador" />
        </div>
      )}
    </div>
  );
};

export default MontoFaltanteEmpleado;
