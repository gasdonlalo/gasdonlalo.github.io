import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAltaBaja from "../modals/ModalAltaBaja";
import ModalConfirmacion from "../modals/ModalConfirmacion";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import Axios from "../../Caxios/Axios";
import ButtonDropDown from "../forms/ButtonDropdown";
import ErrorHttp from "../assets/ErrorHttp";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import ActualizarEmpleado from "../modals/ActualizarEmpleado";
import PdfEmpleados from "../pdf_generador/PdfEmpleados";
import Loader from "../assets/Loader";

const TablaEmpleados = ({ id }) => {
  const [show, setShow] = useState(false);
  const [encabezado, setEncabezado] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [mostrarIdForm, setMostrarIdForm] = useState(false);
  const [idReincorporar, setIdReincorporar] = useState(false);
  const [idEmp, setIdEmp] = useState(); //idsolicitud relativa a la tabla
  const [motivo, setMotivo] = useState([]);
  const [actualizaEmpleado, setActualizaEmpleado] = useState(false); //muestra modal de actualzacion de empleados
  const [datosEmpleado, setDatosEmpleado] = useState(null);
  const [actualizar, setActualizar] = useState(false); //actualiza la informacion
  const [tipoEnvio, setTipoEnvio] = useState(0);
  const { data, error, isPending, dataError } = useGetData(
    `/solicitudes/estatus/${id}`,
    actualizar
  );

  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };

  const handleClose = () => {
    setShow(false);
    setMostrarIdForm(false);
  };

  const changeMotivo = (e) => {
    setMotivo({ ...motivo, [e.target.name]: e.target.value });
  };

  //funcion para acciones
  const action = (idchecador, idempleado, encabezado, estatus) => {
    setMotivo({ ...motivo, idChecador: idempleado, estatus: Number(estatus) });
    setIdEmp(idempleado);
    setEncabezado(encabezado);
    setIdReincorporar(false);
    if (estatus === 1 && !idchecador) {
      setMostrarIdForm(true);
    }
    if (estatus === 1 && idchecador === "despido") {
      setIdReincorporar(true);
    }
    setShow(true);
    setTipoEnvio(0);
  };
  const mostrarActualizarEmpleado = (datos) => {
    setDatosEmpleado({
      nombre: datos.nombre,
      apellidoPaterno: datos.apellido_paterno,
      apellidoMaterno: datos.apellido_materno,
      idDepartamento: datos.iddepartamento,
      idChecador: Number(datos.idchecador),
    });
    setIdEmp(datos.idempleado);
    setActualizaEmpleado(true);
    setTipoEnvio(1);
  };
  const cerrarActualizarEmpleado = () => {
    setActualizaEmpleado(false);
  };
  const enviar = (e) => {
    e.preventDefault();
    handleClose();
    cerrarActualizarEmpleado();
    setConfirmacion(true);
  };
  const handleActualizar = (e) => {
    setDatosEmpleado({ ...datosEmpleado, [e.target.name]: e.target.value });
  };
  const enviarDatos = async () => {
    try {
      await Axios.put(`/solicitudes/control/${idEmp}`, motivo);
      setConfirmacion(false);
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, 500); //cierra automaticamente el modal
      setActualizar(!actualizar);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setConfirmacion(false);
        setModalError({ status: true, msg: err.response.data.msg });
      } else {
        setConfirmacion(false);
        setModalError({ status: true, msg: "Error en la conexión" });
      }
    }
  };
  const enviarActualizar = async () => {
    try {
      await Axios.put(`/empleado/${idEmp}`, datosEmpleado);
      setConfirmacion(false);
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, 500); //cierra automaticamente el modal
      setActualizar(!actualizar);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setConfirmacion(false);
        setModalError({ status: true, msg: err.response.data.msg });
      } else {
        setConfirmacion(false);
        setModalError({ status: true, msg: "Error en la conexión" });
      }
    }
  };
  return (
    <div>
      <ModalSuccess show={modalSuccess} close={cerrarModal} />
      <ModalError
        show={modalError.status}
        close={cerrarModal}
        text={modalError.msg}
      />
      <ModalConfirmacion
        handleClose={() => setConfirmacion(false)}
        show={confirmacion}
        enviar={tipoEnvio === 0 ? enviarDatos : enviarActualizar}
      />
      <ModalAltaBaja
        show={show}
        handleClose={handleClose}
        enviar={enviar}
        changeMotivo={changeMotivo}
        encabezado={encabezado}
        mostrarId={mostrarIdForm}
        idReincorporar={idReincorporar}
      />
      <ActualizarEmpleado
        show={actualizaEmpleado}
        handleClose={cerrarActualizarEmpleado}
        idEmpleado={idEmp}
        data={datosEmpleado}
        enviar={enviar}
        handle={handleActualizar}
      />
      {!error && !isPending && (
        <Success
          solicitud={data.response}
          estatus={id}
          action={action}
          mostrar={mostrarActualizarEmpleado}
        />
      )}
      {error && !isPending && (
        <ErrorHttp msg={dataError.msg} code={dataError.code} />
      )}
      {isPending && <Loader />}
    </div>
  );
};

const Success = ({ solicitud, estatus, action, mostrar }) => {
  const [solicitudes, setSolicitudes] = useState(solicitud);

  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, "gi");
    const search = solicitud.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno } = el;
      return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
    });
    setSolicitudes(search);
  };

  //Importante para el completo PDF
  const titulosPDFTabla = [
    "Empleados Contratados",
    "Empleados Prácticantes",
    "Empleados Despedidos",
    "Empleados Rechazados",
    "Empleados Pendientes",
    "Empleados Contratados",
  ];
  let id = Number(estatus);

  const practicantes = solicitud.filter((el) => el.estatus === "Practica");

  return (
    <div>
      {estatus === "6" && practicantes.length > 0 && (
        <div>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={<Tooltip id="asd">Haz Click para verlos</Tooltip>}
          >
            <a
              href={`#sinvalidar${practicantes[0].idchecador}`}
              className="btn btn-primary"
            >
              Empleados sin validar{" "}
              <span className="badge text-bg-secondary">
                {practicantes.length}
              </span>
            </a>
          </OverlayTrigger>
        </div>
      )}
      {/* Buscador */}
      <div className="pt-0">
        <div className="row">
          <div className="offset-md-6 col-md-6">
            <div className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                name="buscador"
                id="buscador"
                onChange={filterEmp}
                placeholder="Buscar un empleado..."
              ></input>
              <div title="Imprimir lista de empleados">
                <PdfEmpleados
                  data={solicitud}
                  title={titulosPDFTabla[id - 1]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabla */}
      <div>
        <table className="table align-middle table-bordered mt-2 shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Estatus</th>
              {estatus === "5" && <th>Motivo de la solicitud</th>}
              {estatus === "4" && <th>Motivo de rechazo</th>}
              {estatus === "3" && <th>Motivo de inactividad</th>}
              {estatus === "6" && <th>Departamento</th>}
              {estatus === "6" && <th>Fecha Alta</th>}
              {(estatus === "3" || estatus === "4") && <th>Fecha Baja</th>}
              {(estatus === "5" || estatus === "6") && (
                <th className="text-center"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((el, i) => (
              <tr key={i} id={`sinvalidar${el.idchecador || i}`}>
                <td>{el.idchecador || "--"}</td>
                <td
                  onDoubleClick={(e) => (e.target.contentEditable = true)}
                  onBlur={(e) => (e.target.contentEditable = false)}
                  onInput={(e) => console.log(e.target.textContent)}
                >
                  {el.nombre}
                </td>
                <td>{el.apellido_paterno}</td>
                <td>{el.apellido_materno}</td>
                <td>{el.estatus}</td>
                {(estatus === "5" || estatus === "4" || estatus === "3") && (
                  <td>{el.motivo}</td>
                )}
                {estatus === "6" && <td>{el.departamento}</td>}
                {estatus === "6" && (
                  <td>
                    {format.formatFechaComplete(el.fecha_registro, false)}
                  </td>
                )}
                {(estatus === "3" || estatus === "4") && (
                  <td>{format.formatFechaComplete(el.update_time, false)}</td>
                )}
                <SetBotones
                  estatus={el.estatus}
                  element={el}
                  action={action}
                  mostrar={mostrar}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function SetBotones({ estatus, element, action, mostrar }) {
  switch (estatus) {
    case "Practica":
      return (
        <td>
          <ButtonDropDown>
            <span
              variant="danger"
              onClick={() =>
                action(
                  element.idchecador,
                  element.idempleado,
                  "Dar de baja empleado practicante",
                  3
                )
              }
            >
              Dar de baja
            </span>
            <span
              variant="success"
              onClick={() =>
                action(element.idchecador, element.idempleado, "Contratar", 1)
              }
            >
              Contratar
            </span>
            <span variant="info" onClick={() => mostrar(element)}>
              Modificar
            </span>
          </ButtonDropDown>
        </td>
      );
    case "Contrato":
      return (
        <td>
          <ButtonDropDown>
            <span
              variant="danger"
              onClick={() =>
                action(
                  element.idchecador,
                  element.idempleado,
                  "Dar de baja empleado",
                  3
                )
              }
            >
              Dar de baja
            </span>
            <span variant="info" onClick={() => mostrar(element)}>
              Modificar
            </span>
          </ButtonDropDown>
        </td>
      );
    case "Pendiente":
      return (
        <td>
          <ButtonDropDown>
            <span
              variant="danger"
              onClick={() =>
                action(
                  element.idchecador,
                  element.idempleado,
                  "Rechazar la solicitud",
                  4
                )
              }
            >
              Rechazar solicitud
            </span>
            <span
              variant="success"
              onClick={() =>
                action(
                  element.idchecador,
                  element.idempleado,
                  "Dar de alta al empleado",
                  1
                )
              }
            >
              Dar de alta
            </span>
          </ButtonDropDown>
        </td>
      );
    case "Despido":
      return (
        <td>
          <ButtonDropDown>
            <DropdownItem
              type="button"
              variant="warning"
              onClick={() =>
                action(
                  "despido",
                  element.idempleado,
                  "Reincorporar empleado",
                  1
                )
              }
            >
              Reincorporar
            </DropdownItem>
          </ButtonDropDown>
        </td>
      );
    default:
      return;
  }
}

export default TablaEmpleados;
