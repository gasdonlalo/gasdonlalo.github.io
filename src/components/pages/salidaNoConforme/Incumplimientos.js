import React, { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import Axios from "../../../Caxios/Axios";
import Loader from "../../assets/Loader";
import { Per } from "../../Provider/Auth";

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
                disabled={!Per(11)}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-success w-100"
                disabled={formPending || !Per(11)}
              >
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
                <TrTable el={el} key={i} toogle={[actualizar, setActualizar]} />
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

const TrTable = ({ el, toogle }) => {
  const [bodyC, setBodyC] = useState(null);
  const [editable, setEditable] = useState(false);
  const [pending, setPending] = useState(false);
  const [msgError, setMsgError] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(null);
  const [msgErrorDel, setMsgErrorDel] = useState(null);
  const [msgSuccessDel, setMsgSuccessDel] = useState(null);
  const [actualizador, setActualizador] = toogle;

  const validar = Per(11);

  const dblClick = () => setEditable(validar);

  const updateInc = (e, el) =>
    setBodyC({
      id: el.idincumplimiento,
      incumplimiento: e.target.textContent.toUpperCase(),
    });

  const update = async () => {
    setPending(true);
    try {
      await Axios.put(`/incumplimiento/${bodyC.id}`, bodyC);
      setMsgSuccess("Se actualizo correctamente");
      setTimeout(() => {
        setEditable(false);
        setMsgSuccess(null);
      }, 1000);
      setActualizador(!actualizador);
    } catch (err) {
      console.log(err);
      setMsgError("No se pudo actualizar el incumplimiento");
      setTimeout(() => {
        setMsgError(null);
      }, 1000);
    }
    setPending(false);
  };

  const eliminar = async () => {
    setPending(true);
    try {
      await Axios.delete(`/incumplimiento/${el.idincumplimiento}`);
      setMsgSuccessDel("Se elimino correctamente");
      setTimeout(() => {
        setEditable(false);
        setMsgSuccessDel(null);
      }, 1000);
      setActualizador(!actualizador);
    } catch (err) {
      console.log(err);
      setMsgErrorDel(
        err.response.data.msg || "Error al eliminar, intente de nuevo"
      );
      setTimeout(() => {
        setMsgErrorDel(null);
      }, 5000);
    }
    setPending(false);
  };

  return (
    <tr>
      <td>{el.idincumplimiento}</td>
      <td
        onDoubleClick={dblClick}
        onInput={(e) => updateInc(e, el)}
        contentEditable={Per(11) && editable}
      >
        {el.incumplimiento}
      </td>
      {editable && (
        <>
          <td className="d-flex flex-column">
            <button
              className="btn btn-info"
              onClick={update}
              disabled={pending}
            >
              {pending ? <Loader size="1.5" /> : "Actualizar"}
            </button>
            <br />
            {msgSuccess && <span className="text-success">{msgSuccess}</span>}
            {msgError && <span className="text-danger">{msgError}</span>}
          </td>
          <td>
            <button className="btn btn-danger" onClick={eliminar}>
              {pending ? <Loader size="1.5" /> : "Eliminar"}
            </button>
            <br />
            {msgSuccessDel && (
              <span className="text-success">{msgSuccessDel}</span>
            )}
            {msgErrorDel && <span className="text-danger">{msgErrorDel}</span>}
          </td>
        </>
      )}
    </tr>
  );
};

export default Incumplimientos;
