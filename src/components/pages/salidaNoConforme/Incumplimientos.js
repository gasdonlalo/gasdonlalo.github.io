import React, { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import Axios from "../../../Caxios/Axios";
import Loader from "../../assets/Loader";

const Incumplimientos = () => {
  const [inc, setInc] = useState(null);
  const [actualizar, setActualizar] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [formPending, setFormPending] = useState(false);
  const { data, error, isPending } = useGetData(`/incumplimiento`, actualizar);

  const enviar = async (e) => {
    e.preventDefault();
    try {
      await Axios.post(`incumplimiento`, { incumplimiento: inc });
      setActualizar(!actualizar);
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
      e.target.reset();
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

  const handleInc = (e) => setInc(e.target.value);

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Incumplimientos"
        urlBack="../"
        textUrlback="Regresar"
      ></HeaderComponents>
      <div className="w-50 mx-auto">
        <div className="my-3">
          <form className="row" onSubmit={enviar}>
            <div className="col-10">
              <input
                type="text"
                placeholder="Incumplimiento"
                className="form-control"
                onChange={handleInc}
              />
            </div>
            <div className="col-2">
              <button className="btn btn-success w-100" disabled={formPending}>
                {formPending ? <Loader size="1.5" /> : "Añadir"}
              </button>
            </div>
          </form>
        </div>
        {!error && !isPending && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Incumplimiento</th>
              </tr>
            </thead>
            <tbody>
              {data.response.map((el, i) => (
                <tr key={i}>
                  <td>{el.idincumplimiento}</td>
                  <td>{el.incumplimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        close={closeModal}
        text={modalError.msg}
      />
    </div>
  );
};

export default Incumplimientos;
