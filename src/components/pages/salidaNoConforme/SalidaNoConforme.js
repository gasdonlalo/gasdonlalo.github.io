import React, { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import InputSelectEmpleado from "../../forms/Controlado/InputSelectEmp";
import ModalAddIncumplimiento from "../../modals/ModalAddIncumplimiento";
import Axios from "../../../Caxios/Axios";
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
import InputFechaC from "../../forms/Controlado/InputFechaC";

const SalidaNoConforme = () => {
  const [showAlert, setShowAlert] = useState({ status: false, msg: "" });
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [defaultIncumpliento, setDefaultIncumpliento] = useState();
  const [defaultEmpleado, setDefaultEmpleado] = useState(null);
  // const [fecha, setFecha] = useState("");
  const [showPendientesCaptura, setShowPendientesCaptura] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  const [deshabilitar, setDeshabilitar] = useState({
    conseciones: false,
    correciones: false,
  });
  //recupera la id del formulario enviado para generar el pdf
  const [idsalida, setIdsalida] = useState(null);

  const [show, setShow] = useState(false);
  const date = new Date();

  const [datos, setDatos] = useState({ accionesCorregir: null });
  const { departamento } = useParams();
  const incumplimiento = useGetData("/incumplimiento");
  let url = `/empleado`;
  if (departamento === "despacho") url += "?departamento=1";
  const empleadoS = useGetData(url);
  const pendientesCaptura = useGetData(
    "/salida-no-conforme/pendientes",
    actualizar
  );
  const porResolver = useGetData(
    `salida-no-conforme/pendientes/${date.getFullYear()}/${
      date.getMonth() + 1
    }`,
    actualizar
  );

  const LimpiarDefault = () => {
    setDefaultIncumpliento(null);
    setDefaultEmpleado(null);
    setDatos(null);
    setDeshabilitar({
      conseciones: false,
      correciones: false,
    });
  };
  const enviar = (e) => {
    e.preventDefault();
    enviarDatos(datos, e);
  };

  const enviarDatos = async (x, e) => {
    try {
      const req = await Axios.post("/salida-no-conforme", x);
      setIdsalida(req.data.response);
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 800);
      setDatos(null);
      setActualizar(!actualizar);
      LimpiarDefault();
      e.target.reset();
    } catch (err) {
      setShowAlert({ status: true, msg: err.response.data.msg || false });
    }
  };

  const handle = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleAcciones = (e) => {
    if (e.target.value.length === 0) {
      setDatos({ ...datos, accionesCorregir: null });
      setDeshabilitar({ ...deshabilitar, conseciones: false });
    } else {
      setDeshabilitar({ ...deshabilitar, conseciones: true });
      setDatos({ ...datos, accionesCorregir: e.target.value });
    }
  };

  const handleConseciones = (e) => {
    if (e.target.value.length === 0) {
      setDeshabilitar({ ...deshabilitar, correciones: false });
      setDatos({ ...datos, [e.target.name]: null });
    } else {
      setDeshabilitar({ ...deshabilitar, correciones: true });
      setDatos({ ...datos, [e.target.name]: e.target.value });
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
        // handleFecha={setFecha}
        setDatos={setDatos}
        actualizar={actualizar}
        setActualizar={setActualizar}
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
              position="position-relative"
              span={
                (!porResolver.error && !porResolver.isPending && (
                  <span
                    className=" position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px" }}
                  >
                    {porResolver.data.response.length}
                  </span>
                )) ||
                (porResolver.error && !porResolver.isPending && (
                  <span
                    className=" position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "10px" }}
                  >
                    0
                  </span>
                ))
              }
            />
          )}
          <div
            className="rounded p-2 btn-select m-1 d-flex flex-column align-items-center mt-0 pt-0"
            style={{ minWidth: "100px", maxWidth: "150px" }}
            onClick={mostrarPendientesCaptura}
          >
            <i
              className="fa-solid fa-file-pen text-info position-relative"
              style={{ fontSize: "40px" }}
            >
              {!pendientesCaptura.error && !pendientesCaptura.isPending && (
                <span
                  className=" position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "10px" }}
                >
                  {pendientesCaptura.data.response.length}
                </span>
              )}
            </i>
            <p className="p-0 m-0 text-nowrap">Por capturar </p>
          </div>
        </div>
      </HeaderComponents>
      <div className="d-flex flex-md-row flex-column  ">
        {/* Formulario */}
        <div className="me-3 w-50 ">
          <form onSubmit={enviar} className="shadow p-2 ms-2 my-3">
            <div className="row">
              <HeaderForm />
              <div className="col-md-5 mb-3">
                <label className="form-label">Fecha</label>
                <InputFechaC
                  handle={handle}
                  name="fecha"
                  value={datos}
                  disabled={defaultEmpleado || false}
                />{" "}
              </div>
              <div className="mb">
                <label className="form-label">Descripcion de la falla</label>
                <textarea
                  name="descripcionFalla"
                  className="form-control"
                  placeholder="Motivo de la inconformidad"
                  rows={5}
                  required
                  value={
                    datos
                      ? datos.hasOwnProperty("descripcionFalla")
                        ? datos["descripcionFalla"]
                        : ""
                      : ""
                  }
                  onChange={handle}
                />
              </div>
              <div className="mb">
                <label className="form-label">Acciones/correcciones</label>
                <textarea
                  disabled={!Per(20) || deshabilitar.correciones}
                  name="accionesCorregir"
                  className="form-control"
                  placeholder="..."
                  onChange={handleAcciones}
                />
              </div>
              <div className="mb">
                <label>Concesiones</label>
                <textarea
                  disabled={!Per(20) || deshabilitar.conseciones}
                  name="concesiones"
                  className="form-control"
                  placeholder="..."
                  onChange={handleConseciones}
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
                      value={datos}
                      disabled={defaultEmpleado || false}
                      required
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
                      disabled={defaultEmpleado || false}
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
                {!defaultEmpleado && !defaultIncumpliento ? null : (
                  <button
                    type="button"
                    className="btn btn-danger d-block m-auto mt-2"
                    onClick={LimpiarDefault}
                  >
                    Cancelar captura
                  </button>
                )}
                <div className="mt-3">
                  <AlertError
                    show={showAlert.status}
                    setAlertError={setShowAlert}
                    text={showAlert.msg}
                  />
                  <AlertSuccess show={showAlertSuccess} />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Visor pdf */}
        {!idsalida ? null : <VerSNC idInsersion={idsalida} />}
      </div>
    </div>
  );
};

const VerSNC = ({ idInsersion }) => {
  const consultarPdf = useGetData(
    `/salida-no-conforme/${idInsersion.insertId}`
  );

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
