import { createRef, forwardRef, useRef, useState } from "react";
//import InputFecha from "./InputFecha";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import InputFechaC from "./Controlado/InputFechaC";
import { Button } from "bootstrap/dist/js/bootstrap.bundle";

//uniforme: playera y pantalón
//opción nueva: nuevo o semi-usado
//opción nueva: por área

const FormEntregaRecurso = ({ enviar, formPending, body, setBody }) => {
  const empleados = useGetData(`/empleado`);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [save, setSave] = useState({});
  const [head, setHead] = useState(null);
  let data = [];

  const handleRecursos = (e) => {
    if (e.target.checked) {
      setHead({ ...head, recurso: e.target.name });
    }
  };
  const handleHead = (e) => {
    setHead({ ...head, [e.target.name]: e.target.value });
  };

  const handleProps = (e) => {
    setSave({ ...save, [e.target.name]: e.target.value });
    data.push({ ...head, ...save });
  };

  const handleId = (e) => {
    setIdEmpleado(e.target.value);
    handleHead(e);
  };

  const recursos = [
    {
      id: 1,
      recursos: [
        { nombre: "Plumon detector" },
        { nombre: "Tabla portapapeles" },
        { nombre: "Caja de metal para monedas y documentos" },
        { nombre: "Sobre de plastico" },
        { nombre: "Hoja de liquidación" },
        { nombre: "Sobres de recolección parcial" },
        { nombre: "Gafete" },
        { nombre: "Cartera para vales" },
        { nombre: "Playera de despachador" },
        { nombre: "Pantalon de despachador" },
        { nombre: "Gorra" },
        { nombre: "Impermeable" },
      ],
    },
    {
      id: 2,
      recursos: [
        { nombre: "Playera de despachador" },
        { nombre: "Pantalon de despachador" },
      ],
    },
    {
      id: 3,
      recursos: [
        { nombre: "Playera de supervisor" },
        { nombre: "Camisa de supervisor" },
      ],
    },
    {
      id: 4,
      recursos: [
        { nombre: "Playera de  supervisor" },
        { nombre: "Camisa de supervisor" },
        { nombre: "Tabla portapapeles" },
      ],
    },
    {
      id: 5,
      recursos: [{ nombre: "Playera de despachador" }],
    },
  ];
  console.log(head);

  return (
    <div className="shadow p-2 w-50 m-auto mt-2">
      <form onSubmit={enviar}>
        <HeaderForm />
        <div className="row">
          <div className="col-6">
            <label className="form-label mb-0">Fecha</label>
            {/*       <InputFecha
              name="fecha"
              handle={handleHead}
              data={head}
              setData={setHead}
            /> */}
            <InputFechaC name="fecha" handle={handleHead} value={head} />
          </div>
          <div className="col-6">
            <label>Empleado</label>
            {!empleados.error && !empleados.isPending && (
              <InputSelectEmpleado
                empleados={empleados.data.response}
                name="idEmpleado"
                handle={handleId}
                handleProps={handleProps}
              />
            )}
          </div>
        </div>

        {/* Recursos */}

        {!empleados.isPending && !empleados.error && (
          <Recurso
            recursos={recursos}
            id={idEmpleado}
            empleados={empleados.data.response}
            handle={handleRecursos}
            handleProps={handleProps}
            dataHead={head}
          />
        )}

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
const Recurso = ({
  recursos,
  empleados,
  id,
  handle,
  handleProps,
  dataHead,
}) => {
  const [datos, setDatos] = useState();
  const [temporal, setTemporal] = useState([]);
  const [recurso, setRecurso] = useState(null);

  let deptSeleccionado = empleados.filter((el) => el.idempleado === Number(id));
  let recursosFiltrados = [];
  //refparacontrlar campos del formulario
  const refCantidad = useRef([]);
  const refEstado = useRef([]);
  const refEntrega = useRef([]);

  //Asigna los recursos de acuerdo al departamentos

  switch (deptSeleccionado.length !== 0 && deptSeleccionado[0].departamento) {
    case "Despacho":
      recursosFiltrados = recursos.filter((el) => el.id === 1);
      break;
    case "Mantenimiento":
    case "Almacen":
      recursosFiltrados = recursos.filter((el) => el.id === 2);
      break;
    case "Administrativo":
    case "Recursos Humanos":
      recursosFiltrados = recursos.filter((el) => el.id === 3);
      break;
    case "Calidad":
      recursosFiltrados = recursos.filter((el) => el.id === 4);
      break;
    case "Servicios Complementarios":
      recursosFiltrados = recursos.filter((el) => el.id === 5);
      break;
    default:
      recursosFiltrados = [];
      break;
  }
  const handleSwitch = (e, index, recurso) => {
    if (e.target.checked) {
      setRecurso(recurso);
      refCantidad.current[index].removeAttribute("disabled");
      refEstado.current[index].removeAttribute("disabled");
      refEntrega.current[index].removeAttribute("disabled");
    } else {
      refCantidad.current[index].setAttribute("disabled", true);
      refEstado.current[index].setAttribute("disabled", true);
      refEntrega.current[index].setAttribute("disabled", true);
    }
  };

  const handleDatos = (e) => {
    setTemporal({
      ...temporal,
      ...dataHead,
      [e.target.name]: e.target.value,
      recurso: recurso,
    });
  };

  return (
    <>
      {recursosFiltrados.length !== 0 ? (
        recursosFiltrados[0].recursos.map((el, i) => {
          return (
            <div key={i} className="mt-2 mb-2">
              <div className="d-flex flex-column border-bottom pb-3 mx-auto">
                <div className="d-flex align-items-center">
                  <label className="flex-fill">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      onClick={(e) => handleSwitch(e, i, el.nombre)}
                    />
                    {el.nombre}
                  </label>
                </div>
                <div className="d-flex">
                  <div className="col-4">
                    <label>Cantidad</label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      name="cantidad"
                      onChange={handleDatos}
                      required
                      ref={(el) => (refCantidad.current[i] = el)}
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <label>Estado</label>
                    <select
                      className="form-select"
                      name="estado"
                      onChange={handleDatos}
                      required
                      ref={(el) => (refEstado.current[i] = el)}
                      disabled
                    >
                      <option value="">--Seleccionar estado---</option>
                      <option value={1}>Nuevo</option>
                      <option value={2}>Usado</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label>Tipo de entrega</label>
                    <select
                      className="form-select"
                      name="tipoRecibo"
                      onChange={handleDatos}
                      required
                      disabled
                      ref={(el) => (refEntrega.current[i] = el)}
                    >
                      <option value="">--Seleccionar tipo de entrega---</option>
                      <option value={1}>Entrega</option>
                      <option value={2}>Devolucion</option>
                      <option value={3}>Cambio</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h4 className="text-center mt-3 fst-italic">
          Selecciona un empleado...
        </h4>
      )}
    </>
  );
};

const AddRecurso = () => {
  return (
    <div className="row">
      <div className="col-3">
        <label>Nombre del recurso</label>
        <input type="text" className="form-control" name="recurso" />
      </div>
      <div className="col-3">
        <label>Cantidad</label>
        <input type="text" className="form-control" name="cantidad" />
      </div>
      <div className="col-3">
        <label>Tipo de entrega</label>
        <input type="text" className="form-control" name="tipoRecibo" />
      </div>
      <div className="col-3">
        <label>Estado</label>
        <input type="text" className="form-control" name="estado" />
      </div>
    </div>
  );
};

export default FormEntregaRecurso;
