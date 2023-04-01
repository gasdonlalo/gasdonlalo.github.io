import { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import InputChangeYear from "../../../forms/InputChangeYear";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import Bar from "../../../charts/Bar";
import ModalSuccess from "../../../modals/ModalSuccess";
import ModalError from "../../../modals/ModalError";
import { EditMF, DeleteMF } from "../../../modals/EditMF";
import IconComponents from "../../../assets/IconComponents";

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
        <HeaderComponents
          urlBack="/despacho/montos-faltantes"
          textUrlback="regresar a capturas de montos faltantes"
          title="Montos faltantes Mensuales por despachador"
        >
          <IconComponents
            icon="chart-simple text-danger"
            url="/despacho/montos-faltantes/reporte"
            text="Reportes"
          />
        </HeaderComponents>
      </div>
      {empleados.isPending && <Loader />}
      <div className="ms-2 my-4 w-25">
        <label className="ms-2 mb-2 w-100">
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
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);
  const dEmpleado = useGetData(`${url}/${idEmpleado}`, actualizador);

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
  }

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  return (
    <div>
      <div className="w-25 ms-2">
        <label>Selecciona el empleado</label>
        <InputSelectEmpleado empleados={empleados} handle={setEmpleado} />
      </div>
      {!dEmpleado.error && !dEmpleado.isPending && (
        <div className="d-flex justify-content-center">
          <div className="d-flex mt-4 ms-2 ">
            <table className="m-auto" style={{ width: "300px" }}>
              <thead>
                <tr>
                  <th className="border">Fecha</th>
                  <th className="border">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {dEmpleado.data.response.map((el, i) => (
                  <tr key={i}>
                    <td className="border px-2">
                      {format.formatFecha(el.fecha)}
                    </td>
                    <td className="border px-2">
                      {format.formatDinero(el.cantidad)}
                    </td>
                    <td
                      className="btn btn-light"
                      onClick={() =>
                        setDel({ status: true, id: el.idmonto_faltante })
                      }
                    >
                      <li
                        role="button"
                        className="fa-solid fa-trash text-danger"
                        title="Eliminar"
                      ></li>
                    </td>
                    <td
                      className="btn btn-light"
                      onClick={() =>
                        setEdit({ status: true, id: el.idmonto_faltante })
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
                <tr>
                  <th className="border">Total</th>
                  <th className="text-center border">
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
            />
          </div>
        </div>
      )}
      {dEmpleado.error && !dEmpleado.isPending && (
        <div className="mt-5">
          <ErrorHttp code={404} msg="Selecciona un despachador" />
        </div>
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
      {edit.id && (
        <EditMF
          stateEdit={[edit, setEdit]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          toogle={[actualizador, setActualizador]}
        />
      )}
      {del.id && (
        <DeleteMF
          stateDel={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          toogle={[actualizador, setActualizador]}
        />
      )}
    </div>
  );
};

export default MontoFaltanteEmpleado;
