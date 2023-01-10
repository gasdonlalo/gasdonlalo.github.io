import FormOctanoso from "../../forms/FormOctanoso";
import HeaderComponents from "../../../GUI/HeaderComponents";
import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import ModalSuccess from "../../assets/ModalSuccess";
import ModalError from "../../assets/ModalError";

function Octanoso() {
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
      const req = await Axios.post("/octanoso/registro", datos);
      console.log(req);
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
        <HeaderComponents
          urlBack="/recursos-humanos"
          textUrlback="Volver a recursos humanos"
          title="Registro de litros vendidos"
        />
      </div>
      <FormOctanoso
        enviar={enviar}
        handle={handle}
        data={datos}
        setData={setDatos}
        pendiente={pendiente}
      />
    </div>
  );
}

export default Octanoso;
