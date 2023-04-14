import { useEffect, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import { ModalEditRecursoEntrega } from "../../../modals/ModalEditRecursoEntrega";
import Filtrador from "../../../filtrador/Filtrador";
import TableCustom from "../../../tablas/TableCustom";
import { Modal } from "react-bootstrap";
import InputFechaC from "../../../forms/Controlado/InputFechaC";
import InputSelectEmp from "../../../forms/Controlado/InputSelectEmp";
import ModalSuccess from "../../../modals/ModalSuccess";
import ModalError from "../../../modals/ModalError";
import Axios from "../../../../Caxios/Axios";

const EntregaRecursoRegistro = () => {
  const [modalDel, setModalDel] = useState({ status: false, idrecurso: "" });
  const [actualizador, setActualizador] = useState(false);
  const recursos = useGetData(`/entrega-recursos`, actualizador);
  const actualizar = () => setActualizador(!actualizador);
  const empleados = useGetData("/empleado");
  const [showCorrecto, setShowCorrecto] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos/entrega-recursos"
        textUrlback="Regresar a capturas de recursos"
        title="Registros de entrega de recursos"
      />
      {recursos.error && !recursos.isPending && (
        <div className="mt-5">
          <ErrorHttp
            msg={recursos.dataError.response.msg}
            code={recursos.dataError.response.code}
          />
        </div>
      )}
      {!recursos.error &&
        !recursos.isPending &&
        !empleados.isPending &&
        !empleados.error && (
          <Success
            data={recursos.data.response.sort(
              (a, b) => new Date(a.fecha) - new Date(b.fecha)
            )}
            setModalDel={setModalDel}
            empleados={empleados.data.response}
            actualizador={actualizador}
            setActualizador={setActualizador}
            showCorrecto={setShowCorrecto}
            showError={setShowError}
          />
        )}
      {recursos.isPending && <Loader />}
      <ModalEditRecursoEntrega
        state={[modalDel, setModalDel]}
        actualizador={actualizar}
      />
      <ModalSuccess show={showCorrecto} close={() => setShowCorrecto(false)} />
      <ModalError show={showError} close={() => setShowError(false)} />
    </div>
  );
};

const Success = ({
  data,
  setModalDel,
  empleados,
  showCorrecto,
  showError,
  actualizador,
  setActualizador,
}) => {
  const [datos, setDatos] = useState(data);
  const [showUpdate, setShowUpdate] = useState(false);
  const [datosActualizar, setDatosActualizar] = useState({});
  const [idRegistro, setIdRegistro] = useState(null);
  const [pendienteAct, setPendienteAct] = useState(false);

  useEffect(() => {
    setDatos(data);
  }, [data]);

  const columns = [
    { name: "Empleado", selector: (row) => row.nombre, wrap: true },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "Recurso",
      selector: (row) => row.recurso,
      wrap: true,
    },
    {
      name: "Estado del recurso",
      selector: (row) => row.estado,
    },
    {
      name: "Cantidad entregada",
      selector: (row) => row.cantidad,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-4">
          <i
            role="button"
            className="fa-regular fa-trash-can text-danger"
            onClick={() =>
              setModalDel({
                status: true,
                idrecurso: row.id,
              })
            }
          />
          <i
            role="button"
            className="fa-regular fa-pen-to-square text-warning"
            onClick={() => mostrarModal(row)}
          />
        </div>
      ),
    },
  ];
  const dataTable = datos.map((el) => ({
    nombre: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    fecha: format.formatFechaDB(el.fecha),
    recurso: el.recurso,
    estado: el.estado,
    cantidad: el.cantidad,
    id: el.idrecurso_entrega,
    idempleado: el.idempleado_recibe,
    tipoentrega: el.tipo_recibo,
  }));
  const mostrarModal = (el) => {
    setIdRegistro(el.id);
    setDatosActualizar({
      idEmpleado: el.idempleado,
      recurso: el.recurso,
      fecha: el.fecha,
      cantidad: el.cantidad,
      estado: el.estado === "Nuevo" ? 1 : 2,
      tipoRecibo:
        el.tipoentrega === "Entrega"
          ? 1
          : el.tipoentrega === "Devolución"
          ? 2
          : 3,
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
      await Axios.put(`/entrega-recursos/edit/${idRegistro}`, datosActualizar);
      setShowUpdate(false);
      showCorrecto(true);
      setTimeout(() => {
        showCorrecto(false);
      }, 500);
      setActualizador(!actualizador);

      e.target.reset();
    } catch (error) {
      if (error.hasOwnProperty("response")) {
        setPendienteAct(false);
        setShowUpdate(false);
        showError(true);
      }
    }
  };

  return (
    <>
      <div className="mt-4 container">
        <ModalActualizar
          empleados={empleados}
          show={showUpdate}
          handleClose={() => setShowUpdate(false)}
          datos={datosActualizar}
          handle={handle}
          enviar={actualizarRegistro}
          pendiente={pendienteAct}
        />
        <Filtrador datosFiltrar={data} guardarFiltro={setDatos} banderas="i" />
        {/* <table className="mx-auto table table-bordered">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Tipo de entrada</th>
              <th>Fecha</th>
              <th>Recurso</th>
              <th>Estado del recurso</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((el) => (
              <tr key={el.idrecurso_entrega}>
                <td className="border px-2">
                  {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                </td>
                <td className="border px-2">{el.tipo_recibo}</td>
                <td className="border px-2">
                  {format.formatFechaComplete(el.fecha)}
                </td>
                <td className="border px-2">{el.recurso}</td>
                <td className="border px-2 text-center">{el.estado}</td>
                <td className="border px-2 text-center">{el.cantidad}</td>
                <td className="border px-2 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setModalDel({
                        status: true,
                        idrecurso: el.idrecurso_entrega,
                      })
                    }
                  >
                    <li className="fa-regular fa-trash-can text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <TableCustom datos={dataTable} columnas={columns} />
      </div>
    </>
  );
};
const ModalActualizar = ({
  show,
  handleClose,
  empleados,
  datos,
  handle,
  enviar,
  pendiente,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar entrega de recursos</Modal.Title>
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
            <label>Recurso</label>
            <input
              type="text"
              className="form-control"
              name="recurso"
              value={datos["recurso"]}
              onChange={handle}
            />
          </div>
          <div>
            <label>Cantidad entregada</label>
            <input
              type="number"
              className="form-control"
              name="cantidad"
              value={datos["cantidad"]}
              min="0"
              onChange={handle}
            />
          </div>
          <div>
            <label>Fecha</label>
            <InputFechaC name="fecha" value={datos} handle={handle} />
          </div>
          <div>
            <label>Estado</label>
            <select
              className="form-select"
              name="estado"
              value={datos["estado"]}
              onChange={handle}
            >
              <option value={Number(1)}>Nuevo</option>
              <option value={Number(2)}>Medio uso</option>
            </select>
          </div>
          <div>
            <label>Tipo de entrega</label>
            <select
              className="form-select"
              name="tipoRecibo"
              value={datos["tipoRecibo"]}
              onChange={handle}
            >
              <option value={Number(1)}>Entrega</option>
              <option value={Number(2)}>Devolución</option>
              <option value={Number(3)}>Cambio</option>
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

export default EntregaRecursoRegistro;
