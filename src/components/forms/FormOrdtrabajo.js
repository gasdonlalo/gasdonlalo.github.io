import { useState } from "react";
import useGetData from "../../hooks/useGetData";

function FormOrdtrabajo({ datos, handle, enviar }) {
  const [bomba, setBomba] = useState(1);


  const estacion = useGetData("/estaciones-servicio");

  const changeEstacion = (e) => {
    setBomba(e.target.value);
  }

  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              fecha de Inicio
            </label>
            <input
              type="date"
              className="form-control"
              aria-describedby="emailHelp"
              name="fechaInicio"
              onChange={handle}
              onDoubleClickCapture={handle}
            />
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                fecha de Termino
              </label>
              <input
                type="date"
                className="form-control"
                aria-describedby="emailHelp"
                name="fechaTermino"
                onChange={handle}
                onDoubleClickCapture={handle}
              ></input>
            </div>

            {/* PRIMER CUADRO */}
            <div className="row border mb-3">
              <div className="mb-3 col-6">
                <label for="exampleInputEmail1" className="form-label">
                  Area
                </label>
                <select className="form-select" name="idArea" onChange={handle}>
                  <option value={null}>--Selecciona un área--</option>
                  <option value="1">Area despacho</option>
                  <option value="2">Area descarga</option>
                  <option value="3">Cuarto electrico/maquina</option>
                  <option value="4">Baños publicos</option>
                  <option value="5">Estacionamiento</option>
                  <option value="6">Oficinas</option>
                  <option value="7">Otros</option>
                </select>
              </div>

              <div className="mb-3 col-6">
                <label>Empleado</label>
                <select
                  className="form-control"
                  name="idEmpleadoSolicita"
                  onChange={handle}
                >
                  <option value="0">--Selecciona un empleado--</option>
                  {!datos.data
                    ? false
                    : datos.data.response.map((e) => {
                        return (
                          <option
                            value={e.idempleado}
                          >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                        );
                      })}
                </select>
              </div>
            </div>

            {/* SEGUNDO CUADRO */}
            <div className=" row border mb-3">
        <div className="col-md-6">
          <label className="form-label">Escoje la estacion de servicio</label>
          <select
            name="estacionServicio"
            className="form-select"
            onChange={changeEstacion}
            defaultValue={1}
          >
            {!estacion.error &&
              !estacion.isPending &&
              estacion.data.response.map((el) => (
                <option
                  value={el.idestacion_servicio}
                  key={el.idestacion_servicio}
                >
                  {el.nombre}
                </option>
              ))}
          </select>
        </div>

              <div className="mb-3 col-6">
                <label for="exampleInputEmail1" className="form-label">
                  Tipo de Mantenimiento
                </label>
                <select
                  className="form-select"
                  name="tipoMantenimiento"
                  onChange={handle}
                >
                  <option value={null}>--Elige una opción--</option>
                  <option value="1">Preventivo</option>
                  <option value="2">Correctivo</option>
                </select>
              </div>
            </div>

            <label for="exampleInputEmail1" className="form-label">
              Descripcion de la falla
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="descripcionFalla"
              onChange={handle}
            ></input>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormOrdtrabajo;
