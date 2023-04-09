import { useState } from "react";
//import InputFecha from "./InputFecha";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./Controlado/InputSelectEmp";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import InputFechaC from "./Controlado/InputFechaC";

const recursos = [
  {
    nombre: "Plumón detector",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Tabla portapapeles",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1, 4],
  },
  {
    nombre: "Caja de metal para monedas y documentos",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Sobre de plástico",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Hoja de liquidación",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Sobres de recolección parcial",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  { nombre: "Gafete", cantidad: 0, estado: 1, tipo: 1, iddepartamentos: [1] },
  {
    nombre: "Cartera para vales",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Playera de despachador",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1, 2, 5],
  },
  {
    nombre: "Pantalón de despachador",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1, 2],
  },
  { nombre: "Gorra", cantidad: 0, estado: 1, tipo: 1, iddepartamentos: [1] },
  {
    nombre: "Impermeable",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [1],
  },
  {
    nombre: "Playera de supervisor",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [3, 4],
  },
  {
    nombre: "Camisa de supervisor",
    cantidad: 0,
    estado: 1,
    tipo: 1,
    iddepartamentos: [3],
  },
];

const FormEntregaRecurso = ({ enviar, formPending, body, setBody }) => {
  const [recursosFil, setRecursosFil] = useState([]);
  const empleados = useGetData(`/empleado`);

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleDepartamento = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    const filterRecursos = recursos.filter((el) =>
      el.iddepartamentos.some((r) => r === e.target.iddepartamento)
    );
    setRecursosFil(filterRecursos);
  };

  const save = async (e) => {
    e.preventDefault();
    const recursosF = recursosFil.filter((el) => el.cantidad > 0);
    const cuerpo = recursosF.map((el) => ({
      fecha: body.fecha,
      idEmpleado: body.idEmpleado,
      cantidad: el.cantidad,
      recurso: el.nombre,
      estado: el.estado,
      tipoRecibo: el.tipo,
    }));
    setRecursosFil([]);
    enviar(e, cuerpo);
  };

  return (
    <div className="shadow p-2 w-50 m-auto mt-5">
      <form onSubmit={save}>
        <HeaderForm />
        <div className="row">
          <div className="col-6">
            <label className="form-label mb-0">Fecha</label>
            <InputFechaC name="fecha" handle={handle} value={body} />
          </div>
          <div className="col-6">
            <label>Empleado</label>
            {!empleados.error && !empleados.isPending && (
              <InputSelectEmpleado
                empleados={empleados.data.response}
                name="idEmpleado"
                handle={handleDepartamento}
                value={body}
              />
            )}
          </div>
        </div>
        <div>
          <Recursos recursos={recursosFil} setRecursos={setRecursosFil} />
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-primary mx-auto d-block"
            disabled={formPending}
          >
            {formPending ? <Loader size="1.5" /> : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Recursos = ({ recursos, setRecursos }) => {
  const handle = (e, i) => {
    let newRecurso = [...recursos];
    newRecurso[i][e.target.name] = Number(e.target.value);
    setRecursos(newRecurso);
  };

  const addRecurso = (e) => {
    let espacioBlanco = new RegExp("^\\s*$", "g");
    if (!espacioBlanco.test(e.target.value)) {
      setRecursos([
        ...recursos,
        { nombre: e.target.value, estado: 1, cantidad: 1, tipo: 1 },
      ]);
    }
    e.target.value = "";
  };

  const deleteRecurso = (i) => {
    let newRecurso = [...recursos];
    newRecurso.splice(i, 1);
    setRecursos(newRecurso);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Recurso</th>
            <th className="text-center">Cantidad</th>
            <th className="text-center">Estado del recurso</th>
            <th className="text-center">Tipo Entrega</th>
          </tr>
        </thead>
        <tbody>
          {recursos &&
            recursos.map((el, i) => (
              <tr key={i}>
                <th>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => deleteRecurso(i)}
                  >
                    <li className="fa-solid fa-trash text-white" />
                  </button>
                </th>
                <th>
                  <input
                    type="text"
                    value={el.nombre || ""}
                    className="form-control"
                    readOnly
                  />
                </th>
                <th>
                  <input
                    type="number"
                    value={el.cantidad}
                    className="form-control"
                    name="cantidad"
                    onChange={(e) => handle(e, i)}
                  />
                </th>
                <th>
                  <select
                    className="form-select"
                    name="estado"
                    value={el.estado}
                    onChange={(e) => handle(e, i)}
                  >
                    <option value="1">Nuevo</option>
                    <option value="2">Medio uso</option>
                  </select>
                </th>
                <th>
                  <select
                    className="form-select"
                    name="tipo"
                    value={el.tipo}
                    onChange={(e) => handle(e, i)}
                  >
                    <option value="1">Entrega</option>
                    <option value="2">Devolución</option>
                    <option value="3">A cambio</option>
                  </select>
                </th>
              </tr>
            ))}
          <tr>
            <th></th>
            <th>
              <input
                type="text"
                className="form-control"
                placeholder="Otro Recurso"
                onBlur={addRecurso}
              />
            </th>
            <th>
              <input type="text" value={0} className="form-control" disabled />
            </th>
            <th>
              <select className="form-select" disabled>
                <option value="1">Nuevo</option>
                <option value="1">Usado</option>
              </select>
            </th>
            <th>
              <select className="form-select" disabled>
                <option value="1">Entrega</option>
                <option value="2">Devolución</option>
                <option value="3">A cambio</option>
              </select>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default FormEntregaRecurso;
