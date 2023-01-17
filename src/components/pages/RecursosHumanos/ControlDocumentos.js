import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import HeaderComponents from "../../../GUI/HeaderComponents";
import FormControlDoc from "../../forms/FormControlDoc";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";

function ControlDocumentos() {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [actualizar, setActualizar] = useState(false);
  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };
  const [datos, setDatos] = useState([]);

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: Number(e.target.value) });
  };

  const enviar = (e, tipo) => {
    e.preventDefault();
    enviarDatos(tipo);
  };

  const enviarDatos = async (tipoEntrega) => {
    if (tipoEntrega === "false") {
      try {
        const req = await Axios.post("/control-documento", datos);
        setModalSuccess(true);
        setActualizar(!actualizar);
        console.log(req);
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          setModalError({ status: true, msg: err.response.data.msg });
        } else {
          setModalError({ status: true, msg: "Error en la conexión" });
        }
      }
    } else {
      try {
        const req = await Axios.put("/control-documento", datos);
        setModalSuccess(true);
        setActualizar(!actualizar);
        console.log(req);
      } catch (err) {
        if (err.hasOwnProperty("response")) {
          setModalError({ status: true, msg: err.response.data.msg });
        } else {
          setModalError({ status: true, msg: "Error en la conexión" });
        }
      }
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
          title="Control de documentos"
        />
      </div>
      <div>
        <FormControlDoc
          handle={handle}
          enviar={enviar}
          actualizar={actualizar}
        />
      </div>
    </div>
  );
}

export default ControlDocumentos;
