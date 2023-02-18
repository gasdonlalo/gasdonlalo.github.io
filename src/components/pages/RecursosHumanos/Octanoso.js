import FormOctanoso from "../../forms/FormOctanoso";
import HeaderComponents from "../../../GUI/HeaderComponents";
import { useState } from "react";
import Axios from "../../../Caxios/Axios";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import IconComponents from "../../assets/IconComponents";

function Octanoso() {
  const [datos, setDatos] = useState({ descalificado: 0 });
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

  const handleSwitch = (e) => {
    if (e.target.checked) {
      setDatos({ ...datos, descalificado: 1 });
    } else {
      setDatos({ ...datos, descalificado: 0 });
    }
  };

  const enviar = (e) => {
    setPendiente(true);
    e.preventDefault();
    console.log(datos);
    enviarDatos();
    e.target.reset();
    setDatos({ descalificado: 0 });
  };

  const enviarDatos = async () => {
    try {
      const req = await Axios.post("/octanoso/registro", datos);
      console.log(req);
      setModalSuccess(true);
      setPendiente(false);
      setTimeout(() => {
        cerrarModal();
      }, 500); //cierra el modal automaticamente
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
          title="Registro de litros combustible vendidos"
        >
          <div className="d-flex">
            <IconComponents
              text="Reporte"
              icon="chart-simple text-success"
              url="reporte"
            />
            <IconComponents
              text="Registros"
              icon="file-lines text-warning"
              url="registros"
            />
          </div>
        </HeaderComponents>
      </div>
      <FormOctanoso
        enviar={enviar}
        handle={handle}
        data={datos}
        setData={setDatos}
        pendiente={pendiente}
        handleSwitch={handleSwitch}
      />
    </div>
  );
}

export default Octanoso;
