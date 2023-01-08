import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import InputFecha from "./InputFecha";

function FormRetardos({ datos, enviar, dept }) {

  const [estacionS] = useState(null);
  const turnos = useGetData(`/estaciones-servicio/turnos/${estacionS}`);
  
  const [body, setBody] = useState({
    turno: "mañana" 
  })
   
  const handle = (e) => setBody({ ...body, [e.target.name]: e.target.value });

  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="row">
          <div className="mb-3">
            <div className="mb-3 col-6">
            <label for="exampleInputEmail1co" className="form-label">
              fecha
            </label>
          <InputFecha
            data={body}
            setData={setBody}
            handle={handle}
            name="fecha"
              />
            </div>

            {/* PRIMER CUADRO */}
            <div className="row border mb-3">
              <div className="mb-3 col-6">
                <label>Departamentos</label>
                <select
                  className="form-control"
                  name="iddepartamento"
                  onChange={handle}
                >
                  <option value="0">--Selecciona un departamento--</option>
                  {!datos.data
                    ? false
                    : dept.data.response.map((e) => {
                      return (
                        <option
                          value={e.iddepartamento}
                        >{`${e.departamento}`}</option>
                      );
                })}
                </select>
              </div>


              <div className="mb-3 col-6">
                <label>Empleados</label>
                <select
                  className="form-control"
                  name="idEmpleado"
                  onChange={handle}
                >
                  <option value="0"> --Selecciona un empleado--</option>
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
        <div className="mb-3 col-6">
          <label className="form-label">Turno</label>
          <select
            name="turno"
            className="form-select"
            defaultValue={1}
            onChange={handle}
          >
            {!turnos.error && !turnos.isPending && (
              <option value=""> -- Selecciona el turno -- </option>
                  )}
            {!turnos.error &&
              !turnos.isPending &&
              turnos.data.response.map((el) => (
                <option key={el.idturno} value={el.turno}>
                  {el.turno}
                </option>
              ))}
                  {turnos.isPending && <option value="">Cargando turnos</option>}
                  {turnos.error && !turnos.isPending && <option value=""></option>}
                </select>
              </div>

              <div className="mb-3 col-6">
                <label className="form-label">Hora</label>
                <input
                  type="time"
                  className="form-control"
                  data={body}
                  name="hora"
                />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormRetardos;
