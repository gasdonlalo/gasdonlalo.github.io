import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import InputSelectEmpleado from "../../forms/InputSelectEmpleado";
import ModalAddIncumplimiento from "../../modals/ModalAddIncumplimiento";
import Axios from "../../../Caxios/Axios";
import InputFecha from "../../forms/InputFecha";
import PDFSalidaNoConforme from "../despacho/PDFSalidaNoConforme";
import HeaderForm from "../../../GUI/HeaderForm";
import format from "../../assets/format";
import AlertError from "../../alerts/AlertError";
import Loader from "../../assets/Loader";
import AlertSuccess from "../../alerts/AlertSuccess";
import IconComponents from "../../assets/IconComponents";
import HeaderComponents from "../../../GUI/HeaderComponents";
import { useParams } from "react-router-dom";
import { Per } from "../../Provider/Auth";
import SNCPendienteCaptura from "../../modals/SNCPendienteCaptura";

const SalidaNoConforme = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [defaultIncumpliento, setDefaultIncumpliento] = useState(null);
  const [defaultEmpleado, setDefaultEmpleado] = useState(null);
  const [defaultFecha, setDefaultFecha] = useState(null);
  const [showPendientesCaptura, setShowPendientesCaptura] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  //recupera la id del formulario enviado para generar el pdf
  const [idsalida, setIdsalida] = useState(null);

  const [show, setShow] = useState(false);

  const [datos, setDatos] = useState({ accionesCorregir: null });
  const { departamento } = useParams();
  const incumplimiento = useGetData("/incumplimiento");
  let url = `/empleado`;
  if (departamento === "despacho") url += "?departamento=1";
  const empleadoS = useGetData(url);
  const LimpiarDefault = () => {
    setDefaultIncumpliento(null);
    setDefaultFecha(null);
    setDefaultEmpleado(null);
    setDatos(null);
  };
  const enviar = (e) => {
    e.preventDefault();
    console.log(datos);
    enviarDatos(datos);
    e.target.reset();
    setDatos(null);
    LimpiarDefault();
  };

  const enviarDatos = async (x) => {
    try {
      const req = await Axios.post("/salida-no-conforme", x);
      setIdsalida(req.data.response);
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 800);
      setActualizar(!actualizar);
    } catch {
      setShowAlert(true);
    }
  };

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleAcciones = (e) => {
    if (e.target.value.length === 0) {
      setDatos({ ...datos, accionesCorregir: null });
    } else {
      setDatos({ ...datos, accionesCorregir: e.target.value });
    }
  };
  const changeSelectIncumplimiento = (e) => {
    if (e.target.value === "add") {
      setShow(true);
    }
  };

  const cerrarModal = () => {
    setShow(false);
  };
  const closePendientesCaptura = () => {
    setShowPendientesCaptura(false);
  };
  const mostrarPendientesCaptura = () => {
    setShowPendientesCaptura(true);
  };

  return (
    <div className="Main">
      <ModalAddIncumplimiento show={show} close={cerrarModal} />
      <SNCPendienteCaptura
        show={showPendientesCaptura}
        handleClose={closePendientesCaptura}
        handleIncumplimiento={setDefaultIncumpliento}
        handleEmpleado={setDefaultEmpleado}
        handleFecha={setDefaultFecha}
        setDatos={setDatos}
        actualizar={actualizar}
      />
      <HeaderComponents
        title="Captura de salidas no conformes"
        urlBack={`/${departamento}`}
        textUrlback="Regresar"
      >
        <div className="d-flex">
          <IconComponents
            icon="plus text-success"
            text="Incumplimientos"
            url="incumplimientos"
          />
          <IconComponents
            icon="file-pdf text-danger"
            text="Archivos"
            url="files"
          />

          {Per(23) && (
            <IconComponents
              icon="clock text-warning"
              text="Por resolver"
              url="pendientes"
            />
          )}
          <div
            className="rounded btn-select m-1 d-flex flex-column align-items-center mt-0 pt-0"
            style={{ minWidth: "100px", maxWidth: "150px" }}
            onClick={mostrarPendientesCaptura}
          >
            <i
              className="fa-solid fa-file-pen text-info"
              style={{ fontSize: "40px" }}
            />
            <p className="p-0 m-0 text-nowrap">Pendientes de captura</p>
          </div>
        </div>
      </HeaderComponents>
      <div style={{ display: "flex", flexdirection: "column" }}>
        <div className="me-3">
          <form onSubmit={enviar} className="shadow p-2 ms-2 my-3">
            <div className="row" style={{ width: "500px" }}>
              <HeaderForm />
              <div className="col-md-5 mb-3">
                <label className="form-label">Fecha</label>
                <InputFecha
                  handle={handle}
                  data={datos}
                  setData={setDatos}
                  name="fecha"
                  defaultValue={defaultFecha}
                />
              </div>
              <div className="mb">
                <label className="form-label">Descripcion de la falla</label>
                <textarea
                  name="descripcionFalla"
                  className="form-control"
                  placeholder="Motivo de la inconformidad"
                  rows={5}
                  required
                  onChange={handle}
                ></textarea>
              </div>
              <div className="mb">
                <label className="form-label">Acciones/correcciones</label>
                <textarea
                  disabled={!Per(23)}
                  name="accionesCorregir"
                  className="form-control"
                  placeholder="..."
                  onChange={handleAcciones}
                />
              </div>
              <div className="mb">
                <label>Concesiones</label>
                <textarea
                  disabled={!Per(23)}
                  name="concesiones"
                  className="form-control"
                  placeholder="..."
                  onChange={handle}
                />
              </div>
              <div className="row">
                {!empleadoS.error && !empleadoS.isPending && (
                  <div className="col-6">
                    <label className="label-form">Empleado que incumple</label>
                    <InputSelectEmpleado
                      empleados={empleadoS.data.response}
                      name="idEmpleadoIncumple"
                      handle={handle}
                      reset={datos}
                      defaultData={{
                        nombre: !defaultEmpleado
                          ? null
                          : defaultEmpleado.nombre,
                        id: !defaultEmpleado ? null : defaultEmpleado.id,
                      }}
                    />
                  </div>
                )}
                {!incumplimiento.error && !incumplimiento.isPending && (
                  <div className="col-6">
                    <label className="label-form">Incumplimiento</label>
                    <select
                      name="idIncumplimiento"
                      className="form-select form-select"
                      onChange={(changeSelectIncumplimiento, handle)}
                      required
                      value={defaultIncumpliento}
                    >
                      <option value="">-- Seleccionar incumplimiento --</option>
                      {incumplimiento.data.response.map((el) => (
                        <option
                          key={el.idincumplimiento}
                          value={el.idincumplimiento}
                        >
                          {el.incumplimiento}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="mt-2 mb-5 w-100">
                <button
                  type="submit"
                  className="btn btn-primary d-block m-auto"
                >
                  Crear salida no conforme
                </button>
                {!defaultEmpleado &&
                !defaultFecha &&
                !defaultIncumpliento ? null : (
                  <button
                    type="button"
                    className="btn btn-danger d-block m-auto mt-2"
                    onClick={LimpiarDefault}
                  >
                    Cancelar captura
                  </button>
                )}
                <div className="mt-3">
                  <AlertError show={showAlert} setAlertError={setShowAlert} />
                  <AlertSuccess show={showAlertSuccess} />
                </div>
              </div>
            </div>
          </form>
        </div>
        {!idsalida ? null : <VerSNC idInsersion={idsalida} />}
      </div>
    </div>
  );
};

const VerSNC = ({ idInsersion }) => {
  const consultarPdf = useGetData(
    `/salida-no-conforme/${idInsersion.insertId}`
  );
  console.log(consultarPdf);
  return (
    <div className="d-flex flex-fill justify-content-center align-items-center">
      {!consultarPdf.isPending && !consultarPdf.error && (
        <PDFSalidaNoConforme
          title="salida no conforme"
          fecha={
            !consultarPdf.data
              ? false
              : format.formatFechaComplete(consultarPdf.data.response[0].fecha)
          }
          inconformidad={
            !consultarPdf.data
              ? false
              : consultarPdf.data.response[0].descripcion_falla
          }
          corregir={
            !consultarPdf.data
              ? false
              : consultarPdf.data.response[0].acciones_corregir
          }
          concesiones={
            !consultarPdf.data
              ? false
              : consultarPdf.data.response[0].concesiones
          }
        />
      )}
      {consultarPdf.error && <h4>¡Ups¡, algo salió mal</h4>}
      {consultarPdf.isPending && <Loader />}
    </div>
  );
};

export default SalidaNoConforme;
