import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGetData from "../../../hooks/useGetData";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import ModalAddIncumplimiento from "../../assets/ModalAddIncumplimiento";

const SalidaNoConforme = () => {
  const empleadoS = useGetData("/empleado?departamento");
  const empleadoA = useGetData("/empleado?departamento=2");
  const incumplimiento = useGetData("/incumplimiento/1");
  const [show, setShow] = useState(false);

  console.log(empleadoA);

  const changeSelectIncumplimiento = (e) => {
    if (e.target.value === "add") {
      setShow(true);
    }
  };

  const cerrarModal = () => {
    setShow(false);
  };

  return (
    <div>
      <ModalAddIncumplimiento show={show} close={cerrarModal} />
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Captura de salidas no conformes</h4>
      </div>
      <form style={{ width: "300px" }}>
        <div className="mb">
          <label className="form-label">Descripcion de la falla</label>
          <textarea
            name="descripcionFalla"
            className="form-control"
            placeholder="Motivo de la inconformidad"
          ></textarea>
        </div>
        <div className="mb">
          <label className="form-label">Acciones a corregir</label>
          <textarea
            name="accionesCorregir"
            className="form-control"
            placeholder="..."
          ></textarea>
        </div>
        <div className="mb">
          <label>Concesiones</label>
          <textarea
            name="concesiones"
            className="form-control"
            placeholder="..."
          ></textarea>
        </div>
        {!empleadoS.error && !empleadoS.isPending && (
          <div className="m-b">
            <label className="label-form">
              Seleccionar empleado que incumple
            </label>
            <InputSelectEmpleado
              empleados={empleadoS.data.response}
              name="empleadoIncumple"
            />
          </div>
        )}
        {!empleadoA.error && !empleadoA.isPending && (
          <div className="m-b">
            <label className="label-form">
              Seleccionar empleado que autoriza
            </label>
            <InputSelectEmpleado
              empleados={empleadoA.data.response}
              name="empleadoAutoriza"
            />
          </div>
        )}
        {!incumplimiento.error && !incumplimiento.isPending && (
          <div className="m-b">
            <label className="label-form">Seleccionar incumplimiento</label>
            <select
              name="idincumplimiento"
              className="form-select form-select"
              onChange={changeSelectIncumplimiento}
            >
              <option value="0">-- Seleccionar incumplimiento --</option>
              {incumplimiento.data.response.map((el) => (
                <option key={el.idincumplimiento} value={el.idincumplimiento}>
                  {el.incumplimiento}
                </option>
              ))}
              <option value="add" className="bg-success">
                Añadir otro
              </option>
            </select>
          </div>
        )}
        <div className="mt-2 mb-5 w-100">
          <button className="btn btn-primary d-block m-auto">
            Crear salida no corforme
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalidaNoConforme;
