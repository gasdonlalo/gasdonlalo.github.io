import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import FormSolEmpleo from "../../forms/FormSolEmpleo";
import ModalSuccess from "../../assets/ModalSuccess";
import ModalError from "../../assets/ModalError";

function SolicitudesEmpleo() {
  const [datos, setDatos] = useState([]);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [pendiente, setPendiente] = useState(false);

  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    setPendiente(true);
    e.preventDefault();
    enviarDatos();
    e.target.reset();
  };

  const enviarDatos = async () => {
    try {
      await Axios.post("/solicitudes/nuevo", datos);
      setModalSuccess(true);
      setPendiente(false);
      setTimeout(() => {
        cerrarModal();
      }, "1500"); //cierra el modal automaticamente
    } catch (err) {
      console.log(err);
      if (err.hasOwnProperty("response")) {
        setModalError({ status: true, msg: err.response.data.msg });
      } else {
        setModalError({ status: true, msg: "Error en la conexión" });
      }
      setPendiente(false);
    }
  };
  return (
    <div className="Main">
      <ModalSuccess show={modalSuccess} close={cerrarModal} />
      <ModalError
        show={modalError.status}
        close={cerrarModal}
        text={modalError.msg}
      />
      <div>
        <Link className="link-primary" to="/recursos-humanos">
          Volver a recursos humanos
        </Link>
        <h4 className="border-bottom">Control de solicitudes de empleo</h4>
      </div>
      <div>
        <FormSolEmpleo handle={handle} enviar={enviar} pendiente={pendiente} />
      </div>
    </div>
  );
}

export default SolicitudesEmpleo;
