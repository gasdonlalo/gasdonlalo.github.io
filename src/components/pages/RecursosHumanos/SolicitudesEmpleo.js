import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import FormSolEmpleo from "../../forms/FormSolEmpleo";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import HeaderComponents from "../../../GUI/HeaderComponents";
import IconComponents from "../../assets/IconComponents";

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
    enviarDatos(e);
  };

  const enviarDatos = async (e) => {
    try {
      await Axios.post("/solicitudes/nuevo", datos);
      setModalSuccess(true);
      setPendiente(false);
      setDatos([]);
      setTimeout(() => {
        cerrarModal();
      }, "1500"); //cierra el modal automaticamente
      e.target.reset();
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
      <HeaderComponents
        title="Captura de solicitudes de empleo"
        urlBack="/recursos-humanos"
        textUrlback="Regresar a RH"
      >
        <IconComponents
          icon="table text-danger"
          url="../alta-baja-empleados"
          text="Solicitudes"
        />
      </HeaderComponents>
      <div>
        <FormSolEmpleo handle={handle} enviar={enviar} pendiente={pendiente} />
      </div>
    </div>
  );
}

export default SolicitudesEmpleo;
