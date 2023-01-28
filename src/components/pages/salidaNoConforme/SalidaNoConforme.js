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

const SalidaNoConforme = () => {
  const empleadoS = useGetData("/empleado?departamento=1");
  const incumplimiento = useGetData("/incumplimiento");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  //recupera la id del formulario enviado para generar el pdf
  const [idsalida, setIdsalida] = useState(null);

  const [show, setShow] = useState(false);

  const [datos, setDatos] = useState([]);
  const enviar = (e) => {
    e.preventDefault();
    enviarDatos(datos);
  };

  const { departamento } = useParams();

  const enviarDatos = async (x) => {
    try {
      const req = await Axios.post("/salida-no-conforme", x);
      setIdsalida(req.data.response);
      setShowAlertSuccess(true);
      setTimeout(() => {
        setShowAlertSuccess(false);
      }, 800);
    } catch {
      setShowAlert(true);
    }
  };

  const handle = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };
  const changeSelectIncumplimiento = (e) => {
    if (e.target.value === "add") {
      setShow(true);
    }
  };

  const cerrarModal = () => {
    setShow(false);
  };

  return (
    <div className="Main">
      <ModalAddIncumplimiento show={show} close={cerrarModal} />
      <HeaderComponents
        title="Captura de salidas no conformes"
        urlBack={`/${departamento}`}
        textUrlback="Regresar"
      >
        <IconComponents
          icon="file-pdf text-danger"
          text="Archivos"
          url="files"
        />
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
                />
              </div>
              <div className="mb">
                <label className="form-label">Descripcion de la falla</label>
                <textarea
                  name="descripcionFalla"
                  className="form-control"
                  placeholder="Motivo de la inconformidad"
                  rows={5}
                  onChange={handle}
                ></textarea>
              </div>
              <div className="mb">
                <label className="form-label">Acciones a corregir</label>
                <textarea
                  name="accionesCorregir"
                  className="form-control"
                  placeholder="..."
                  onChange={handle}
                />
              </div>
              <div className="mb">
                <label>Concesiones</label>
                <textarea
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
                      <option value="add" className="bg-success">
                        Añadir otro
                      </option>
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
      {consultarPdf.isPending && <Loader />}
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
    </div>
  );
};

export default SalidaNoConforme;
