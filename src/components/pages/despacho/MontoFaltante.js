import { Fragment, useState } from "react";
import Loader from "../../assets/Loader";
import InputSelectEmpleado from "../../forms/Controlado/InputSelectEmp";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import InputFechaC from "../../forms/Controlado/InputFechaC";
import useGetData from "../../../hooks/useGetData";
import Axios from "../../../Caxios/Axios";
import Grafica from "../../charts/Bar";
import ModalError from "../../modals/ModalError";
import ErrorHttp from "../../assets/ErrorHttp";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import { Per } from "../../Provider/Auth";
import ModalSuccess from "../../modals/ModalSuccess";

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
              text="Reportes"
              url="/despacho/montos-faltantes/reporte"
            />
            {Per(4) && (
              <IconComponents
                icon="file-lines text-success"
                text="Detalles"
                url="/despacho/montos-faltantes/reportes/empleados"
              />
            )}
            <IconComponents
              icon="calendar-days text-warning"
              text="Historial"
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
  const [modalSuccess, setModalSuccess] = useState(false);
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
      await Axios.post("/monto-faltante-despachador", body);
      setPendingForm(false);
      setBody(null);
      event.target.reset();
      setModalSuccess(true);
      setActualizador(!actualizador);
      setTimeout(() => {
        setModalSuccess(false);
      }, 500);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      event.target.reset();
      setPendingForm(false);
    }
  };

  if (!montoFaltante.error && !montoFaltante.isPending) {
    dataBar = {
      labels: montoFaltante.data.response.map((el) =>
        el.nombre_completo.split(" ")
      ),
      dataset: montoFaltante.data.response[0].semanas.map((el, i) => ({
        data: montoFaltante.data.response.map((eld) => eld.semanas[i].cantidad),
        label: `Semana ${i + 1}`,
      })),
    };
  }

  return (
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
      <ModalSuccess show={modalSuccess} close={() => setModalSuccess(false)} />
      {/*Formulario */}
      <div className="lg-w-25 m-3">
        <form className="rounded p-3 shadow" onSubmit={enviar}>
          <div className="p-2">
            <label>Selecciona el despachador</label>
            <InputSelectEmpleado
              empleados={empleados}
              handle={handle}
              required
              value={body}
              name="empleado"
            />
          </div>
          <div className="p-2">
            <label className="form-label">Fecha</label>
            <InputFechaC handle={handle} name="fecha" value={body} />
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
      </div>

      <div className="flex-fill m-3 p-3">
        <h3 className="text-center fst-italic">Vista previa</h3>
        {/* Selects */}
        <div className="row">
          <div className="col-6">
            <label>Escoje el mes de los datos</label>
            <InputChangeMes defaultMes={month} handle={seleccionarMes} />
          </div>
          <div className="col-6">
            <label>Escoje el año de los datos</label>
            <InputChangeYear defaultYear={year} handle={seleccionarYear} />
          </div>
        </div>

        {!montoFaltante.error && !montoFaltante.isPending && (
          <div className="m-auto">
            <Grafica
              datos={dataBar}
              text="Gráfica semanal de monto faltante de despachador"
              optionsCustom={{
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                    title: {
                      display: true,
                      text: "Cantidad en pesos",
                      font: {
                        size: "12pt",
                      },
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Empleados",
                      font: {
                        size: "15pt",
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
        {montoFaltante.error && !montoFaltante.isPending && (
          <div className="m-auto mt-5">
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
