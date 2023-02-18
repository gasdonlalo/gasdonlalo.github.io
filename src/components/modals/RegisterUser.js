import { useState } from "react";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";
import ModalCustomer from "./ModalCustomer";

export const RegisterUser = ({
  stateEdit, //Estado para mostras el modald
  setModalSuccess, //Modal De exito
  setModalError, //Modal de error
  toggle,
}) => {
  new Date();
  const [show, setShow] = stateEdit;
  const [body, setBody] = useState();
  const [formPending, setFormPending] = useState(false);
  const [actualizador, setActualizador] = toggle;

  const close = () => setShow({ status: false, id: null });

  const register = async (e) => {
    e.preventDefault();
    setFormPending(true);

    try {
      e.target.reset();
      setShow({ status: false, id: null });
      setModalSuccess(true);
      await Axios.post(`/auth/registrar`, { ...body, idEmpleado: show.id });
      setShow({ status: false, id: null });
      setActualizador(!actualizador);
      setTimeout(() => {
        setModalSuccess(false);
      }, 800);
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
    }
    setFormPending(false);
  };

  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  return (
    <ModalCustomer title="Registrar usuario" show={show.status} close={close}>
      <form onSubmit={register}>
        <div className="w-50 mx-auto">
          <div>
            <div className="col-12 mb-3">
              <label className="form-label mb-0">Usuario</label>
              <input
                type="text"
                placeholder="Usuario"
                className="form-control"
                name="user"
                onChange={handle}
                autoComplete="off"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label mb-0">Contraseña</label>
              <input
                type="text"
                placeholder="Password"
                className="form-control"
                name="password"
                onChange={handle}
                autoComplete="off"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className="btn btn-warning mx-auto d-block mt-2"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.25" /> : "Registrar usuario"}
          </button>
        </div>
      </form>
    </ModalCustomer>
  );
};

export const DeleteCB = ({
  stateDel,
  setModalSuccess,
  setModalError,
  toogle,
}) => {
  const [show, setShow] = stateDel;
  const [formPending, setFormPending] = useState(false);
  const [actualizador, setActualizador] = toogle;
  const close = () => setShow({ status: false, id: null });

  const del = async () => {
    setFormPending(true);
    try {
      await Axios.delete(`/bomba-check/${show.id}`);
      setModalSuccess(true);
      setActualizador(!actualizador);
      close();
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
    }
    setFormPending(false);
  };

  return (
    <ModalCustomer
      title="Eliminar Registro de checklist bomba"
      show={show.status}
      close={close}
    >
      <div className="d-flex justify-content-end gap-3">
        <button className="btn btn-secondary" onClick={close}>
          Cancelar
        </button>
        <button className="btn btn-danger" disabled={formPending} onClick={del}>
          {formPending ? <Loader size="1.5" /> : "Eliminar"}
        </button>
      </div>
    </ModalCustomer>
  );
};
