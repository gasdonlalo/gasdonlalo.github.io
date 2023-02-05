import { Fragment, useState } from "react";
import Loader from "../../assets/Loader";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import InputFecha from "../../forms/InputFecha";
import useGetData from "../../../hooks/useGetData";
import Axios from "../../../Caxios/Axios";
import Grafica from "../../charts/Bar";
import ModalError from "../../modals/ModalError";
import ErrorHttp from "../../assets/ErrorHttp";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import { Per } from "../../Provider/Auth";

function MontoFaltante() {
  const empleados = useGetData(`/empleado?departamento=1`);

  return (
    <Fragment>
      <div className="Main">
        <HeaderComponents
          urlBack="/despacho"
          textUrlback="Volver a despacho"
          title="Captura montos faltantes"
        >
          <div className="d-flex">
            <IconComponents
              icon="chart-simple text-danger"
              text="MF reporte"
              url="/despacho/montos-faltantes/reporte"
            />
            {Per(4) && (
              <IconComponents
                icon="file-lines text-success"
                text="MF empleado"
                url="reportes/empleados"
              />
            )}
            <IconComponents
              icon="calendar-days text-warning"
              text="MF tiempo"
              url="historial"
            />
          </div>
        </HeaderComponents>
      </div>
      {!empleados.error && !empleados.isPending && (
        <Success empleados={empleados.data.response} />
      )}
      {empleados.isPending && <Loader />}
      {empleados.error && !empleados.isPending && (
        <ErrorHttp
          code={empleados.dataError.response.code}
          msg={empleados.dataError.response.msg}
        />
      )}
    </Fragment>
  );
}

const Success = ({ empleados }) => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [body, setBody] = useState(null);
  const [pendingForm, setPendingForm] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizador, setActualizador] = useState(false);

  const montoFaltante = useGetData(
    `/monto-faltante-despachador/semanas/${year}/${month}`,
    actualizador
  );

  let dataBar = {};

  const seleccionarMes = (e) => {
    setMonth(e.target.value);
  };

  const seleccionarYear = (e) => {
    setYear(e.target.value);
  };

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setPendingForm(false);
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const enviar = async (event) => {
    event.preventDefault();
    setPendingForm(true);
    try {
      setActualizador(!actualizador);
      await Axios.post("/monto-faltante-despachador", body);
      setPendingForm(false);
      setBody(null);
      event.target.reset();
    } catch (err) {
      if (err.hasOwnProPerty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
    }
  };

  if (!montoFaltante.error && !montoFaltante.isPending) {
    dataBar = {
      labels: montoFaltante.data.response.map((el) =>
        el.nombre_completo.split(" ")
      ),
      dataset: montoFaltante.data.response[0].semanas.map((el, i) => ({
        data: montoFaltante.data.response.map((eld) => eld.semanas[i].cantidad),
        label: `semana ${i + 1}`,
      })),
    };
  }

  return (
    <div>
      <div className="d-flex w-75 justify-content-evenly m-auto">
        <div>
          <label>Escoje el mes de los datos</label>
          <InputChangeMes defaultMes={month} handle={seleccionarMes} />
        </div>
        <div>
          <label>Escoje el año de los datos</label>
          <InputChangeYear defaultYear={year} handle={seleccionarYear} />
        </div>
      </div>
      <div className="d-flex flex- align-items-center">
        <form className="w-25 ms-5 rounded p-3 shadow" onSubmit={enviar}>
          <div className="w-100">
            <div className="p-2">
              <label>Selecciona el despachador</label>
              <InputSelectEmpleado
                reset={body} //Le paso el body para validar si esta null limpiar el input
                empleados={empleados}
                handle={handle}
                name="empleado"
              />
            </div>
            <div className="p-2">
              <label className="form-label">Fecha</label>
              <InputFecha
                handle={handle}
                data={body}
                setData={setBody}
                name="fecha"
              />
            </div>
            <div className="p-2">
              <label>Ingresa el monto</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.00"
                  className="form-control"
                  name="cantidad"
                  onChange={handle}
                  required
                />
              </div>
            </div>
          </div>
          <div className="d-block m-auto">
            <button
              type="submit"
              className="btn btn-primary d-block m-auto align-items-center"
              disabled={pendingForm}
            >
              {pendingForm && <Loader size="1.5rem" />}
              {!pendingForm && "Crear Monto"}
            </button>
          </div>
        </form>
        {!montoFaltante.error && !montoFaltante.isPending && (
          <div className="w-75">
            <Grafica
              datos={dataBar}
              text="Gráfica semanal de monto faltante de despachador"
              customObj={{
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
            <ModalError
              show={modalError.status}
              close={closeModal}
              text={modalError.msg}
            />
          </div>
        )}
        {montoFaltante.error && !montoFaltante.isPending && (
          <div className="w-75">
            <ErrorHttp
              code={montoFaltante.dataError.code}
              msg={montoFaltante.dataError.msg}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MontoFaltante;
