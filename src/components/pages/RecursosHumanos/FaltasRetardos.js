import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormRetardos from "../../forms/FormRetardos";
import useGetData from "../../../hooks/useGetData";
import ModalError from "../../modals/ModalError";
import ModalSuccess from "../../modals/ModalSuccess";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";
import { Offcanvas } from "react-bootstrap";
import format from "../../assets/format";

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

  //recibe los datos del formulario
  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  const empleado = useGetData("/empleado");
  const turnos = useGetData("/estaciones-servicio/turnos");

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
        title="Faltas y Retardos"
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
        <Turnos />
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

const Turnos = () => {
  const { data, error, isPending } = useGetData("/entrada/turnos");
  return (
    <div>
      <table className="table table-bordered w-25 mt-5 mx-auto">
        <thead>
          <tr>
            <th>Horario</th>
            <th>Hr. Empiezo</th>
            <th>Hr. Termino</th>
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default FaltasRetardos;
