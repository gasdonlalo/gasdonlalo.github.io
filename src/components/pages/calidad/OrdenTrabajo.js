import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../../Caxios/Axios";
import FormOrdtrabajo from "../../forms/FormOrdtrabajo";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import HeaderComponents from "../../../GUI/HeaderComponents";

function OrdenTrabajo() {
  const [data, setData] = useState([]);
  const [pendingForm, setPendingForm] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });

  //recibe los datos del formulario
  const handle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const enviar = async (e) => {
    e.preventDefault();
    setPendingForm(true);
    try {
      let res = await Axios.post(`/orden-trabajo-calidad`, data);
      console.log(res);
      setModalSuccess(true);
      setPendingForm(false);
      e.target.reset();
    } catch (err) {
      console.log(err);
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setPendingForm(false);
    }
  };

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ success: false, msg: "" });
  };

  const navigate = useNavigate();

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="volver a calidad"
        title="Captura orden de trabajo"
      >
        <div
          className="rounded p-2 btn-select m-1 d-flex flex-column align-items-center mt-0 pt-0"
          onClick={() => navigate("reportes")}
        >
          <i
            className="fa-regular fa-chart-pie text-success"
            style={{ fontSize: "50px" }}
          ></i>
          <p className="p-0 m-0 text-nowrap">Reportes</p>
        </div>
      </HeaderComponents>
      <div>
        <FormOrdtrabajo
          handle={handle}
          enviar={enviar}
          pendingForm={pendingForm}
        />
      </div>
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
    </div>
  );
}
export default OrdenTrabajo;
