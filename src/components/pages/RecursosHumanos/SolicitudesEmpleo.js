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

  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
    enviarDatos();
    e.target.reset();
  };

  const enviarDatos = async () => {
    try {
      let req = await Axios.post("/solicitudes/nuevo", datos);
      console.log(req);
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, "1500"); //cierra el modal automaticamente
    } catch (err) {
      setModalError({ status: true, msg: err.response.data.msg });
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
        <FormSolEmpleo
          handle={handle}
          enviar={enviar}
          data={datos}
          setData={setDatos}
        />
      </div>
    </div>
  );
}

export default SolicitudesEmpleo;
