import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormRetardos from "../../forms/FormRetardos";
import useGetData from "../../../hooks/useGetData";
import ModalError from "../../modals/ModalError";
import ModalSuccess from "../../modals/ModalSuccess";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import { Offcanvas, Modal } from "react-bootstrap";
import format from "../../assets/format";
import ModalConfirmacion from "../../modals/ModalConfirmacion";

function FaltasRetardos() {
  const [body, setBody] = useState({
    fecha: "",
    idDepartamento: "",
    idEmpleado: null,
    nombreEmpleado: null,
    horaEntrada: "",
    idTurno: null,
    hora_anticipo: "",
    index: null,
  });
  const [showOf, setShowOf] = useState(false);
  const [formPending, setFormPending] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [empleados, setEmpleados] = useState(null);
  const [defaultData, setDefaultData] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  const [actualizar, setActualizar] = useState(false);

  //recibe los datos del formulario
  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  const empleado = useGetData("/empleado");
  const turnos = useGetData("/estaciones-servicio/turnos", actualizar);

  const capture = (iddep, idemp, nombre) => {
    setDefaultData({ id: idemp, nombre });
    filtrarEmpleados(iddep);
  };

  const enviar = async (e) => {
    if (!body.hasOwnProperty("idEmpleado"))
      setModalError({ status: true, msg: "Falta el id de empleado" });
    e.preventDefault();

    setFormPending(true);

    let form = e.target;

    const cuerpo = {
      idEmpleado: Number(body.idEmpleado),
      horaEntrada: form.horaEntrada.value || null,
      fecha: form.fecha.value,
      idTurno: Number(form.idTurno.value) || null,
    };

    try {
      await Axios.post("/entrada/captura", cuerpo);
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
      setFormPending(false);
      const dataChecador = JSON.parse(localStorage.getItem("checador")) || [];
      const nuevoDato = dataChecador.filter((el) => el.index !== body.index);
      localStorage.setItem("checador", JSON.stringify(nuevoDato));
      setBody({
        fecha: "",
        idDepartamento: "",
        idEmpleado: null,
        nombreEmpleado: null,
        horaEntrada: "",
        idTurno: null,
        hora_anticipo: "",
      });
      e.target.reset();
      window.location.reload();
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setFormPending(false);
    }
  };

  const changeDep = (e) => {
    setBody({ ...body, idDepartamento: e.target.value });
    filtrarEmpleados(e.target.value);
  };

  const filtrarEmpleados = (idDep) => {
    const filEmp = empleado.data.response.filter(
      (emp) => emp.iddepartamento === Number(idDep)
    );
    setEmpleados(filEmp);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Captura de entradas"
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
      >
        <IconComponents
          url="reportes"
          text="Reportes"
          icon="chart-simple text-success"
        />
      </HeaderComponents>
      <div>
        <DataChecador
          show={showOf}
          setShow={setShowOf}
          bodyState={[body, setBody]}
          capture={capture}
        />
        <button className="m-2 btn btn-success" onClick={() => setShowOf(true)}>
          <li className="fa-solid fa-clock" /> Registros
        </button>
      </div>
      <FormRetardos
        handle={handle}
        enviar={enviar}
        turnos={turnos}
        body={body}
        setBody={setBody}
        formPending={formPending}
        changeDep={changeDep}
        empEstado={[empleados, setEmpleados]}
        defaultData={defaultData}
      />
      <div>
        <Turnos
          actualizar={actualizar}
          setActualizar={setActualizar}
          modalSuccess={setModalSuccess}
          modalError={setModalError}
        />
      </div>
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
}

const DataChecador = ({ show, setShow, bodyState, capture }) => {
  const { data, error, isPending } = useGetData("/departamento");
  const dataChecador = JSON.parse(localStorage.getItem("checador"));
  const [body, setBody] = bodyState;
  const [dataC, setDataC] = useState(dataChecador);

  const capturar = (el) => {
    let newBody = {
      fecha: format.formatFechaDB(el.fechaTiempo),
      idDepartamento: el.empleado.iddepartamento,
      idEmpleado: el.empleado.idempleado,
      nombreEmpleado: el.nombreCompleto,
      horaEntrada: format.formatHourMinute(el.fechaTiempo),
      index: el.index,
    };

    setBody({ ...body, ...newBody });
    setShow(false);
    capture(
      el.empleado.iddepartamento,
      el.empleado.idempleado,
      el.nombreCompleto
    );
    console.log(body);
  };

  const handleClose = () => setShow(false);

  const subir = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const ap = new FormData();
      ap.append("dataReloj", e.target.dataReloj.files[0]);
      const response = await Axios.post("/excel/relojChecador", ap, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("checador", JSON.stringify(response.data));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const filtrarData = (e) => {
    let filtrar = dataChecador.filter((el) => {
      let filtrar = false;
      if (el.hasOwnProperty("empleado")) {
        if (el.empleado.iddepartamento === Number(e.target.value))
          filtrar = true;
      }
      if (e.target.value) {
        return filtrar && el;
      } else {
        return el;
      }
    });

    setDataC(filtrar);
  };

  const descartar = (id) => {
    const dataChecador = JSON.parse(localStorage.getItem("checador")) || [];
    const nuevoDato = dataChecador.filter((el) => el.index !== id);
    localStorage.setItem("checador", JSON.stringify(nuevoDato));
    setDataC(nuevoDato);
  };

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Entradas del reloj checador</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div
          style={{ width: "300px", height: "100px" }}
          className="border mx-auto d-flex"
        >
          <form onSubmit={subir}>
            <input type="file" name="dataReloj" required />
            <button>cargar</button>
          </form>
        </div>
        <div>
          <div className="m-2">
            <select className="form-select" onChange={filtrarData}>
              <option value="">Todo</option>
              {!isPending &&
                !error &&
                data.response.map((el) => (
                  <option value={el.iddepartamento} key={el.iddepartamento}>
                    {el.departamento}
                  </option>
                ))}
            </select>
          </div>
          <table className="fs-6 table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Empleado</th>
                <th>Hora Entrada</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dataC &&
                dataC.map((el, i) => (
                  <tr key={i}>
                    <td>{el.idChecador}</td>
                    <td>{el.nombreCompleto}</td>
                    <td className="align-middle">
                      <div className="d-flex flex-column align-items-center">
                        <span>
                          {format.formatFechaComplete(el.fechaTiempo)}
                        </span>
                        <span>{format.formatHours(el.fechaTiempo)}</span>
                      </div>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-primary"
                        title="capturar"
                        onClick={() => capturar(el)}
                      >
                        <li className="fa-solid fa-pencil" />
                      </button>
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-danger"
                        title="descartar"
                        onClick={() => descartar(el.index)}
                      >
                        <li className="fa-solid fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const Turnos = ({ actualizar, setActualizar, modalSuccess, modalError }) => {
  const [modalConfig, setModalConfig] = useState({
    show: false,
    props: "",
    servicio: "",
  });
  const { data, error, isPending } = useGetData("/entrada/turnos", actualizar);
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [id, setId] = useState(null);

  const showConfigTurnos = (title, servicio, id) => {
    setModalConfig({ show: true, props: title, servicio: servicio, id: id });
  };

  const handleId = (x) => {
    setId(x);
    setShowConfirmacion(true);
  };

  const eliminar = async () => {
    try {
      await Axios.delete(`/entrada/eliminar/turno/${id}`);
      setActualizar(!actualizar);
      setShowConfirmacion(false);
      modalSuccess(true);
      setTimeout(() => {
        modalSuccess(false);
      }, 500);
    } catch (error) {
      setShowConfirmacion(false);
      modalError({ status: true, msg: error.code });
    }
  };

  return (
    <div className="w-25 mt-5 mx-auto">
      {!isPending && !error && (
        <Modales
          show={modalConfig.show}
          handleClose={() => setModalConfig({ show: false })}
          title={modalConfig.props}
          servicio={modalConfig.servicio}
          actualizar={actualizar}
          setActualizar={setActualizar}
          id={modalConfig.id}
          data={data.response}
          modalSuccess={modalSuccess}
          modalError={modalError}
        />
      )}
      <ModalConfirmacion
        show={showConfirmacion}
        handleClose={() => setShowConfirmacion(false)}
        enviar={eliminar}
      />
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>Horario</th>
            <th>Hr. Empiezo</th>
            <th>Hr. Termino</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {!isPending &&
            !error &&
            data.response.map((el) => (
              <tr key={el.idturno}>
                <td>{el.turno}</td>
                <td>{el.hora_anticipo}</td>
                <td>{el.hora_termino}</td>
                <td>
                  <i
                    role="button"
                    className="fa-solid fa-pen text-warning"
                    onClick={() =>
                      showConfigTurnos("Editar turno", "actualizar", el.idturno)
                    }
                  />
                </td>
                <td>
                  <i
                    role="button"
                    className="fa-regular fa-trash-can text-danger"
                    onClick={() => handleId(el.idturno)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-evenly">
        <button
          onClick={() => showConfigTurnos("Añadir turno", "añadir")}
          className="btn btn-success"
        >
          Añadir turno
        </button>
      </div>
    </div>
  );
};

const Modales = ({
  show,
  handleClose,
  title,
  servicio,
  actualizar,
  setActualizar,
  id,
  data,
  modalSuccess,
  modalError,
}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormTurnos
            servicio={servicio}
            actualizar={actualizar}
            setActualizar={setActualizar}
            cerrar={handleClose}
            id={id}
            dataTurnos={data}
            modalSuccess={modalSuccess}
            modalError={modalError}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

const FormTurnos = ({
  servicio,
  actualizar,
  setActualizar,
  cerrar,
  id,
  dataTurnos,
  modalSuccess,
  modalError,
}) => {
  const [datos, setDatos] = useState(null); //datos de envio de formulario
  const filtrar = dataTurnos.filter((el) => {
    return el.idturno === id;
  });
  const [defaultDatos, setDefaultDatos] = useState({
    idTurno: filtrar.length !== 0 ? filtrar[0].idturno : "",
    turno: filtrar.length !== 0 ? filtrar[0].turno : null,
    hora_empiezo: filtrar.length !== 0 ? filtrar[0].hora_empiezo : null,
    hora_termino: filtrar.length !== 0 ? filtrar[0].hora_termino : null,
    hora_anticipo: filtrar.length !== 0 ? filtrar[0].hora_anticipo : null,
  });

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleActualizar = (e) => {
    setDefaultDatos({ ...defaultDatos, [e.target.name]: e.target.value });
  };
  const actualizarTurno = async (e) => {
    e.preventDefault();
    try {
      await Axios.put("entrada/editar/turno", defaultDatos);
      setActualizar(!actualizar);
      cerrar();
      modalSuccess(true);
      setTimeout(() => {
        modalSuccess(false);
      }, 500);
    } catch (error) {
      cerrar();
      modalError({ status: true, msg: error.code });
    }
  };
  const add = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("entrada/turno", datos);
      setActualizar(!actualizar);
      cerrar();
      modalSuccess(true);
      setTimeout(() => {
        modalSuccess(false);
      }, 500);
    } catch (error) {
      cerrar();
      modalError({ status: true, msg: error.code });
    }
  };

  return (
    <>
      {" "}
      <form onSubmit={servicio === "actualizar" ? actualizarTurno : add}>
        {servicio === "actualizar" && (
          <div>
            <label>Turno</label>
            <select
              className="form-select"
              name="idTurno"
              onChange={servicio === "actualizar" ? handleActualizar : handle}
              defaultValue={defaultDatos.idTurno}
              disabled
            >
              <option value="">---Selecciona un turno---</option>
              {dataTurnos.map((el, i) => {
                return (
                  <option value={Number(el.idturno)} key={i}>
                    {el.turno}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div>
          <label>Nombre del turno</label>
          <input
            type="text"
            className="form-control"
            name="turno"
            onChange={servicio === "actualizar" ? handleActualizar : handle}
            defaultValue={defaultDatos.turno}
            required
          />
        </div>
        <div>
          <label>Hora de tolerancia</label>
          <input
            type="time"
            className="form-control"
            name="hora_anticipo"
            onChange={servicio === "actualizar" ? handleActualizar : handle}
            defaultValue={defaultDatos.hora_anticipo}
            required
          />
        </div>
        <div>
          <label>Hora de inicio de turno</label>
          <input
            type="time"
            className="form-control"
            name="hora_empiezo"
            onChange={servicio === "actualizar" ? handleActualizar : handle}
            defaultValue={defaultDatos.hora_empiezo}
            required
          />
        </div>
        <div>
          <label>Hora de fin de turno</label>
          <input
            type="time"
            className="form-control"
            name="hora_termino"
            onChange={servicio === "actualizar" ? handleActualizar : handle}
            defaultValue={defaultDatos.hora_termino}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>
      </form>
    </>
  );
};
export default FaltasRetardos;
