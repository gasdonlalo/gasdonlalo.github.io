import { useEffect, useState } from "react";
import ModalError from "../../../modals/ModalError";
import ModalSuccess from "../../../modals/ModalSuccess";
import Delete from "../../../modals/Delete";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";
import TableCustom from "../../../tablas/TableCustom";
import Filtrador from "../../../filtrador/Filtrador";
import ErrorHttp from "../../../assets/ErrorHttp";
import Axios from "../../../../Caxios/Axios";
import { Modal } from "react-bootstrap";
import InputSelectEmp from "../../../forms/Controlado/InputSelectEmp";
import InputFechaC from "../../../forms/Controlado/InputFechaC";
import Loader from "../../../assets/Loader";

const OctanosoRegistros = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [del, setDel] = useState({ status: false, id: null });
  const [actualizador, setActualizador] = useState(false);

  const { data, error, isPending, dataError } = useGetData(
    `/octanoso/${year}/${month}}`,
    actualizador
  );
  const empleados = useGetData("/empleado");
  const estacion = useGetData("/estaciones-servicio");

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const close = () => setDel({ status: false, msg: "" });

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Atras"
        title="Registros octanoso "
      />

      <div className="row">
        <div className="mb-3 col 6">
          <label>Año</label>
          <InputChangeYear defaultYear={year} handle={changeYear} />
        </div>
        <div className="mb-3 col-6">
          <label>Mes</label>
          <InputChangeMes defaultMes={month} handle={changeMes} />
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
              data={data.response.sort(
                (a, b) => new Date(a.fecha) - new Date(b.fecha)
              )}
              setDel={setDel}
              actualizador={actualizador}
              setActualizador={setActualizador}
              showCorrecto={setModalSuccess}
              showError={setModalError}
              empleados={empleados.data.response}
              estacion={estacion.data.response}
            />
          )}
      </div>
      {isPending && <Loader />}
      {error && <ErrorHttp msg={dataError.msg} />}

      {del.id && (
        <Delete
          stateShow={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          close={close}
          toogle={[actualizador, setActualizador]}
        />
      )}
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
};

const Success = ({
  data,
  setDel,
  setActualizador,
  actualizador,
  showCorrecto,
  showError,
  empleados,
  estacion,
}) => {
  const [registros, setRegistros] = useState(data); //problema aqui no se detecta el cambio en el estado

  useEffect(() => {
    setRegistros(data);
  }, [data]); // solucion al error anterior

  const [showUpdate, setShowUpdate] = useState(false);
  const [datosActualizar, setDatosActualizar] = useState({});
  const [idRegistro, setIdRegistro] = useState(null);
  const [pendienteAct, setPendienteAct] = useState(false);

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
    { name: "Cantidad en pesos", selector: (row) => row.cantidad },
    //{ name: "Descalificado", selector: (row) => row.descalificado },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-4">
          <i
            role="button"
            className="fa-solid fa-trash text-danger"
            onClick={() => setDel({ status: true, id: row.id })}
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
  const datosTabla = registros.map((el) => ({
    id: el.idventa_litros,
    fecha: format.formatFechaDB(el.fecha),
    nombre: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    estacion: el.idestacion_servicio,
    cantidad: el.cantidad,
    descalificado: el.descalificado ? 1 : 0,
    idempleado: el.idempleado,
  }));
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
    setDatosActualizar({
      ...datosActualizar,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarRegistro = async (e) => {
    setPendienteAct(true);
    e.preventDefault();
    try {
      await Axios.put(`/octanoso/edit/${idRegistro}`, datosActualizar);
      setShowUpdate(false);
      showCorrecto(true);
      setTimeout(() => {
        showCorrecto(false);
      }, 500);
      setActualizador(!actualizador);
      setPendienteAct(false);
      e.target.reset();
    } catch (error) {
      setShowUpdate(false);
      showError(true);
    }
  };

  return (
    <div className="container-fluid">
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
      <Filtrador datosFiltrar={data} guardarFiltro={setRegistros} />
      <TableCustom
        columnas={columnas}
        datos={datosTabla}
        conditionalRow={conditionalRow}
      />
    </div>
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

export default OctanosoRegistros;
