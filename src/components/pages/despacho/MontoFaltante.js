import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../assets/Loader";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import InputFecha from "../../forms/InputFecha";
import useGetData from "../../../hooks/useGetData";
import Axios from "../../../Caxios/Axios";
import Grafica from "../../charts/Bar";
import ModalError from "../../assets/ModalError";
import ErrorHttp from "../../assets/ErrorHttp";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";

function MontoFaltante() {
  const empleados = useGetData(`/empleado?departamento=1`);

  return (
    <Fragment>
      <div className="Main">
        <div>
          <Link className="link-primary" to="/despacho">
            Volver al despacho
          </Link>
          <h4 className="border-bottom">Insertar Montos faltantes</h4>
        </div>
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
  const [show, setShow] = useState(false);
  const [actualizador, setActualizador] = useState(false);

  const montoFaltante = useGetData(
    `/monto-faltante-despachador/semanas/${year}/${month}`,
    actualizador
  );

  let dataBar = {};

  let navigate = useNavigate();

  const seleccionarMes = (e) => {
    setMonth(e.target.value);
  };

  const seleccionarYear = (e) => {
    setYear(e.target.value);
  };

  const closeModal = () => {
    setShow(false);
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
      const establecer = await Axios.post("/monto-faltante-despachador", body);
      console.log(establecer);
      setPendingForm(false);
      setBody({});
      event.target.reset();
    } catch (error) {
      setShow(true);
      console.log(error.response.data.msg);
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
        <form
          className="w-25 ps-5"
          style={{ width: "300px" }}
          onSubmit={enviar}
        >
          <div className="w-100">
            <div className="p-2">
              <label>Selecciona el despachador</label>
              <InputSelectEmpleado
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
            />
            <ModalError show={show} close={closeModal} />
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
      <div className="d-flex justify-content-center">
        <span
          className="border rounded p-1 m-1"
          role="button"
          onClick={() => navigate("detalles")}
        >
          Mostrar detalles {">"}
        </span>
      </div>
    </div>
  );
};

export default MontoFaltante;
