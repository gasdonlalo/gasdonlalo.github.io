import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormRetardos from "../../forms/FormRetardos";
import useGetData from "../../../hooks/useGetData";
import ModalError from "../../assets/ModalError";
import ModalSuccess from "../../assets/ModalSuccess";
import HeaderComponents from "../../../GUI/HeaderComponents";

function FaltasRetardos() {
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  //recibe los datos del formulario
  const handle = (e) => {
    //Esta condicion evita el craseho del formulario
    if (e.target.name === "idTurno" || e.target.name === "horaEntrada") {
      if (e.target.value === "") {
        let delTurno = body;
        delete delTurno[e.target.name];
        setBody(delTurno);
        return;
      }
    }
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  const navigate = useNavigate();

  const empleado = useGetData("/empleado");
  const turnos = useGetData("/estaciones-servicio/turnos");

  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    let form = e.target;
    const cuerpo = {
      idEmpleado: Number(form.idEmpleado.value),
      horaEntrada: form.horaEntrada.value,
      fecha: form.fecha.value,
      idTurno: Number(form.idTurno.value),
      idTipoFalta: form.idTipoFalta.value || 1,
    };
    try {
      await Axios.post("/entrada/captura", cuerpo);
      setModalSuccess(true);
      setFormPending(false);
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

  return (
    <div>
      <HeaderComponents
        title="Faltas y Retardos"
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
      >
        <div
          className="rounded p-2 btn-select m-1 d-flex flex-column align-items-center mt-0 pt-0"
          onClick={() => navigate("reportes")}
        >
          <i
            className="fa-regular fa-chart-line text-success"
            style={{ fontSize: "50px" }}
          ></i>
          <p className="p-0 m-0 text-nowrap">Reportes</p>
        </div>
      </HeaderComponents>
      <FormRetardos
        emp={empleado}
        handle={handle}
        enviar={enviar}
        turnos={turnos}
        body={body}
        setBody={setBody}
        formPending={formPending}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
}
export default FaltasRetardos;
