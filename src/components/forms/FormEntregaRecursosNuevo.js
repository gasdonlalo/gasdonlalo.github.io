import { useRef, useState } from "react";
//import InputFecha from "./InputFecha";
import HeaderForm from "../../GUI/HeaderForm";
import InputSelectEmpleado from "./InputSelectEmpleado";
import useGetData from "../../hooks/useGetData";
import Loader from "../assets/Loader";
import InputFechaC from "./Controlado/InputFechaC";

const FormEntregaRecurso = ({ enviar, formPending, body, setBody }) => {
  const empleados = useGetData(`/empleado`);
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [head, setHead] = useState(null);

  const handleHead = (e) => {
    setHead({ ...head, [e.target.name]: e.target.value });
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

  return (
    <div className="shadow p-2 w-50 m-auto mt-2">
      <form onSubmit={enviar}>
        <HeaderForm />
        <div className="row">
          <div className="col-6">
            <label className="form-label mb-0">Fecha</label>
            <InputFechaC name="fecha" handle={handleHead} value={head} />
          </div>
          <div className="col-6">
            <label>Empleado</label>
            {!empleados.error && !empleados.isPending && (
              <InputSelectEmpleado
                empleados={empleados.data.response}
                name="idEmpleado"
                handle={handleId}
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
            dataHead={head}
            body={body}
            setBody={setBody}
          />
        )}

        <button
          type="submit"
          className="btn btn-primary mx-auto d-block"
          //disabled={formPending}
        >
          {formPending ? <Loader size="1.5" /> : "Guardar"}
        </button>
      </form>
    </div>
  );
};
const Recurso = ({ recursos, empleados, id, dataHead, setBody, body }) => {
  //const [datos, setDatos] = useState([]);
  const [temporal, setTemporal] = useState({}); //guarda los datos de las propiedades de los recursos de manera temporal

  let deptSeleccionado = empleados.filter((el) => el.idempleado === Number(id));
  let recursosFiltrados = [];
  //refparacontrlar campos del formulario
  const refCantidad = useRef([]);
  const refEstado = useRef([]);
  const refEntrega = useRef([]);
  /////////////////////////////////

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
  ///////////////////////////////////////////
  const handleSwitch = (e, index, recurso) => {
    if (e.target.checked) {
      refCantidad.current[index].removeAttribute("disabled");
      refEstado.current[index].removeAttribute("disabled");
      refEntrega.current[index].removeAttribute("disabled");
    } else {
      refCantidad.current[index].setAttribute("disabled", true);
      refEstado.current[index].setAttribute("disabled", true);
      refEntrega.current[index].setAttribute("disabled", true);
      let cuerpo = body.filter((el) => el.recurso !== recurso);
      setBody(cuerpo);
    }
  }; //activa los campos de los formularios y al desactivarlo los datos de dicho recurso se eliminan

  const handleDatos = (e, recurso) => {
    let { name, value } = e.target;
    let cuerpo = body.filter((el) => el.recurso !== recurso);
    setTemporal({ ...temporal, [name]: value, ...dataHead });
    cuerpo.push({
      ...temporal,
      recurso: recurso,
    });
    setBody(cuerpo);
  }; //guarda los datos de los campos del formulario
  console.log(temporal, "entemp");

  return (
    <>
      {recursosFiltrados.length !== 0 ? (
        recursosFiltrados[0].recursos.map((el, i) => {
          return (
            <div key={i} className="mt-2 mb-2">
              <div className="d-flex flex-column border-bottom pb-3 mx-auto">
                <div className="d-flex align-items-center">
                  <label>
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      onClick={(e) => handleSwitch(e, i, el.nombre)}
                    />
                    {el.nombre}
                  </label>
                </div>
                <div className="row">
                  <div className="col-4">
                    <label>Cantidad </label>
                    <input
                      className="form-control"
                      type="number"
                      min="0"
                      name="cantidad"
                      onChange={(e) => handleDatos(e, el.nombre)}
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
                      onChange={(e) => handleDatos(e, el.nombre)}
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
                      onChange={(e) => handleDatos(e, el.nombre)}
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
