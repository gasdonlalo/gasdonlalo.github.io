import { useState } from "react";
import HeaderComponents from "../../GUI/HeaderComponents";
import ModalConfirmacion from "../modals/ModalConfirmacion";
import InputChangeYear from "../forms/InputChangeYear";
import InputChangeMes from "../forms/InputChangeMes";
import useGetData from "../../hooks/useGetData";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import ErrorHttp from "../assets/ErrorHttp";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";
import format from "../assets/format";
import Filtrador from "../filtrador/Filtrador";
import TableCustom from "./TableCustom";
import { Modal } from "react-bootstrap";
import InputSelectEmp from "../forms/Controlado/InputSelectEmp";
import InputFechaC from "../forms/Controlado/InputFechaC";

function RegistrosAceitoso() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [confirmacion, setConfirmacion] = useState(false);
  const [showCorrecto, setShowCorrecto] = useState(false);
  const [showError, setshowError] = useState(false);

  const [actualizar, setActualizar] = useState(false);
  const { data, error, isPending, dataError } = useGetData(
    `/aceitoso/${year}/${month}`,
    actualizar
  );
  const empleados = useGetData("/empleado");
  const estacion = useGetData("/estaciones-servicio");
  const [idAceite, setIdAceite] = useState(null);

  const changeMonth = (e) => setMonth(e.target.value);
  const changeYear = (e) => setYear(e.target.value);

  const closeModal = () => {
    setConfirmacion(false);
    setShowCorrecto(false);
  };
  const closeError = () => {
    setshowError(false);
  };

  const eliminar = (id) => {
    setIdAceite(id);
    setConfirmacion(true);
  };
  const EnviarEliminar = async () => {
    setConfirmacion(false);
    try {
      await Axios.delete(`/aceitoso/delete/${idAceite}`);
      setActualizar(!actualizar);
      setShowCorrecto(true);
      setTimeout(() => {
        setShowCorrecto(false);
      }, 800);
    } catch {}
  };

  return (
    <div className="Main">
      <ModalSuccess show={showCorrecto} close={closeModal} />
      <ModalError
        show={showError}
        close={closeError}
        text="Error en la conexion"
      />
      <ModalConfirmacion
        show={confirmacion}
        handleClose={closeModal}
        enviar={EnviarEliminar}
      />
      <HeaderComponents
        urlBack="../"
        title="Registros aceitoso"
        textUrlback="Atras"
      />
      <div className="row">
        <div className="col-6">
          <label>Mes</label>
          <InputChangeMes handle={changeMonth} defaultMes={month} />
        </div>
        <div className="col-6">
          <label>Año</label>
          <InputChangeYear handle={changeYear} defaultYear={year} />
        </div>
      </div>
      <div className="mt-3">
        {!error &&
          !isPending &&
          !empleados.isPending &&
          !empleados.error &&
          !estacion.isPending &&
          !estacion.error && (
            <Success
              datos={data.response}
              eliminar={eliminar}
              empleados={empleados.data.response}
              estacion={estacion.data.response}
              actualizar={actualizar}
              setActualizar={setActualizar}
              showCorrecto={setShowCorrecto}
              showError={setshowError}
            />
          )}
        {error && !isPending && (
          <div>
            <ErrorHttp msg={dataError.msg} />
          </div>
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}
const Success = ({
  datos,
  eliminar,
  empleados,
  estacion,
  actualizar,
  setActualizar,
  showCorrecto,
  showError,
}) => {
  datos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const [data, setData] = useState(datos);
  const [showUpdate, setShowUpdate] = useState(false);
  const [datosActualizar, setDatosActualizar] = useState({});
  const [idRegistro, setIdRegistro] = useState(null);
  const [pendienteAct, setPendienteAct] = useState(false);

  const mostrarActualizar = (el) => {
    setIdRegistro(el.id);
    setDatosActualizar({
      idEmpleado: el.idempleado,
      litrosVendidos: Number(el.cantidad),
      fecha: el.fecha,
      idEstacionServicio: el.estacion,
      descalificado: el.descalificado,
    });
    setShowUpdate(true);
  };

  const handle = (e) => {
    setDatosActualizar({ ...datosActualizar, [e.target.name]: e.target.value });
  };

  const actualizarRegistro = async (e) => {
    setPendienteAct(true);
    e.preventDefault();
    try {
      await Axios.put(`/aceitoso/edit/${idRegistro}`, datosActualizar);
      setShowUpdate(false);
      showCorrecto(true);
      setTimeout(() => {
        showCorrecto(false);
      }, 500);
      setActualizar(!actualizar);
      setPendienteAct(false);
      e.target.reset();
    } catch (error) {
      setShowUpdate(false);
      showError(true);
    }
  };
  const conditionalRow = [
    {
      when: (row) => row.descalificado === 1,
      style: {
        backgroundColor: "#ff808b",
      },
    },
  ];
  const columnas = [
    {
      name: "ID registro",
      selector: (row) => row.id,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    { name: "Empleado", selector: (row) => row.nombre, wrap: true },
    { name: "Estación de servicio", selector: (row) => row.estacion },
    { name: "Cantidad en litros", selector: (row) => row.cantidad },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex justify-content-center gap-4 ">
          <i
            role="button"
            className="fa-solid fa-trash text-danger"
            onClick={() => eliminar(row.id)}
          />
          <i
            role="button"
            className="fa-regular fa-pen-to-square text-warning"
            onClick={() => mostrarActualizar(row)}
          />
        </div>
      ),
    },
  ];
  const datosTabla = data.map((el) => ({
    id: el.idventa_aceite,
    fecha: format.formatFechaDB(el.fecha),
    nombre: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    estacion: el.idestacion_servicio,
    cantidad: el.cantidad,
    idempleado: el.idempleado,
    descalificado: el.descalificado ? 1 : 0,
  }));

  return (
    <>
      <ModalActualizar
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        empleados={empleados}
        estacion={estacion}
        datos={datosActualizar}
        handle={handle}
        enviar={actualizarRegistro}
        pendiente={pendienteAct}
      />
      <Filtrador datosFiltrar={datos} guardarFiltro={setData} />
      <TableCustom
        columnas={columnas}
        datos={datosTabla}
        conditionalRow={conditionalRow}
      />
    </>
  );
};
const ModalActualizar = ({
  show,
  handleClose,
  empleados,
  estacion,
  datos,
  handle,
  enviar,
  pendiente,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar venta de aceite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={enviar}>
          <div>
            <label>Empleado</label>
            <InputSelectEmp
              name="idEmpleado"
              empleados={empleados}
              value={datos}
              handle={handle}
            />
          </div>
          <div>
            <label>Litros vendidos</label>
            <input
              type="number"
              className="form-control"
              name="litrosVendidos"
              value={datos["litrosVendidos"]}
              min="0"
              onChange={handle}
            />
          </div>
          <div>
            <label>Fecha</label>
            <InputFechaC name="fecha" value={datos} handle={handle} />
          </div>
          <div>
            <label>Estacion de servicio</label>
            <select
              className="form-select"
              name="idEstacionServicio"
              value={datos["idEstacionServicio"]}
              onChange={handle}
            >
              {estacion.map((el) => (
                <option
                  value={Number(el.idestacion_servicio)}
                  key={el.idestacion_servicio}
                >
                  {el.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Descalificado</label>
            <select
              className="form-select"
              name="descalificado"
              value={datos["descalificado"]}
              onChange={handle}
            >
              <option value={Number(1)}>Sí</option>
              <option value={Number(0)}>No</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={pendiente}
          >
            {pendiente ? <Loader size="1.5rem" /> : "Actualizar"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default RegistrosAceitoso;
