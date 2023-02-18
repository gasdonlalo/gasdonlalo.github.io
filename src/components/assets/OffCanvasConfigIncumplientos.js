import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import Axios from "../../Caxios/Axios";
import ModalError from "../modals/ModalError";
import ModalSuccess from "../modals/ModalSuccess";

const OffCanvasConfigIncumplimientos = ({
  show,
  close,
  categorizacion,
  departamento,
  toogle,
}) => {
  //Se puede usar este mismo componente solo cambiar la categorizacion por el id de cada concurso comentado en los siguientes comentarios, lo demas es exacamente igual
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [iconErr, setIconErr] = useState(false);
  const [iconSuccess, setIconSuccess] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  //catagorizacion es el id del concurso, 1 = madrugrador, 2= octanoso, 3 = aceitoso
  const [actualiza, setActualiza] = toogle;

  let url = `/incumplimiento/categorizar/${categorizacion}`;

  if (departamento) url += `/${departamento}`;

  const { data, error, isPending } = useGetData(url, actualizador);
  console.log(url);

  const handle = async (e) => {
    try {
      if (e.target.checked) {
        await Axios.post(`/incumplimiento/categorizar`, {
          idConcurso: Number(categorizacion),
          idIncumplimiento: Number(e.target.value),
        });
      } else {
        await Axios.put(`/incumplimiento/descategorizar`, {
          idConcurso: Number(categorizacion),
          idIncumplimiento: Number(e.target.value),
        });
      }
      setActualiza(!actualiza);
      setActualizador(!actualizador);
      setModalSuccess(true);
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
  };

  const handleCantidad = async (e) => {
    try {
      await Axios.put(`/incumplimiento/cantidad`, {
        idConcurso: Number(categorizacion),
        idIncumplimiento: Number(e.target.name),
        cantidad: Number(e.target.value),
      });
      setActualizador(!actualizador);
      setActualiza(!actualiza);
      setIconSuccess(Number(e.target.name));
      setTimeout(() => {
        setIconSuccess(false);
      }, 400);
    } catch (err) {
      setIconErr(Number(e.target.name));
      setTimeout(() => {
        setIconErr(false);
      }, 400);
    }
  };

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  return (
    <>
      <Offcanvas show={show} onHide={close} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Configurar salidas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <p>
              Configurar las salidas no conformes que afectan a este concurso
            </p>
            {!error &&
              !isPending &&
              data.response.map((el) => (
                <div key={el.idincumplimiento}>
                  <div className="form-check  form-switch">
                    <label>{el.incumplimiento}</label>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={el.idincumplimiento}
                      onChange={handle}
                      defaultChecked={el.idconcurso}
                    />
                    {departamento && (
                      <div className="d-flex align-items-center gap-2">
                        <input
                          type="number"
                          name={el.idincumplimiento}
                          placeholder="cantidad puntos"
                          className="form-control w-50"
                          defaultValue={el.cantidad}
                          disabled={!el.cantidad}
                          onBlur={handleCantidad}
                          min="0"
                        />
                        {iconSuccess === el.idincumplimiento && (
                          <li className="fa-regular fa-check text-success"></li>
                        )}
                        {iconErr === el.idincumplimiento && (
                          <li className="fa-regular fa-xmark text-danger"></li>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </>
  );
};

export default OffCanvasConfigIncumplimientos;
