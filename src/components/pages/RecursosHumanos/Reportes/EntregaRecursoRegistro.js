import { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import format from "../../../assets/format";
import Loader from "../../../assets/Loader";
import ErrorHttp from "../../../assets/ErrorHttp";
import { ModalEditRecursoEntrega } from "../../../modals/ModalEditRecursoEntrega";
import Filtrador from "../../../filtrador/Filtrador";
import DataTable from "react-data-table-component";

const EntregaRecursoRegistro = () => {
  const [modalDel, setModalDel] = useState({ status: false, idrecurso: "" });
  const [actualizador, setActualizador] = useState(false);
  const recursos = useGetData(`/entrega-recursos`, actualizador);
  const actualizar = () => setActualizador(!actualizador);
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos/entrega-recursos"
        textUrlback="Regresar a capturas de recursos"
        title="Registros de entrega de recursos"
      />
      {recursos.error && !recursos.isPending && (
        <div className="mt-5">
          <ErrorHttp
            msg={recursos.dataError.response.msg}
            code={recursos.dataError.response.code}
          />
        </div>
      )}
      {!recursos.error && !recursos.isPending && (
        <Success data={recursos.data.response} setModalDel={setModalDel} />
      )}
      {recursos.isPending && <Loader />}
      <ModalEditRecursoEntrega
        state={[modalDel, setModalDel]}
        actualizador={actualizar}
      />
    </div>
  );
};

const Success = ({ data, setModalDel }) => {
  data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const [datos, setDatos] = useState(data);
  const sortFechas = (rowA, rowB) => {
    let a = new Date(rowA.fecha);
    let b = new Date(rowB.fecha);
    if (a > b) {
      return 1;
    }
    if (b > a) {
      return -1;
    }
    return 0;
  };
  const customStyle = {
    headCells: {
      style: {
        fontSize: "14pt",
        fontWeight: "bold",
        backgroundColor: "silver",
      },
    },
    cells: {
      style: {
        fontSize: "12pt",
        padding: "5px",

        textAlign: "center",
      },
    },
  };
  const columns = [
    { name: "Empleado", selector: (row) => row.nombre, wrap: true },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      sortFunction: sortFechas,
    },
    {
      name: "Recurso",
      selector: (row) => row.recurso,
      wrap: true,
    },
    {
      name: "Estado del recurso",
      selector: (row) => row.estado,
    },
    {
      name: "Cantidad entregada",
      selector: (row) => row.cantidad,
    },
    {
      name: "Acciones",
      cell: (row) => <Eliminar id={row.id} />,
    },
  ];

  const dataTable = datos.map((el) => ({
    nombre: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    fecha: format.formatFechaDB(el.fecha),
    recurso: el.recurso,
    estado: el.estado,
    cantidad: el.cantidad,
    id: el.idrecurso_entrega,
  }));

  const Eliminar = ({ id }) => {
    return (
      <button
        className="btn btn-danger"
        onClick={() =>
          setModalDel({
            status: true,
            idrecurso: id,
          })
        }
      >
        <li className="fa-regular fa-trash-can text-white" />
      </button>
    );
  };

  return (
    <>
      <div className="mt-4 container">
        <Filtrador datosFiltrar={data} guardarFiltro={setDatos} banderas="i" />
        {/* <table className="mx-auto table table-bordered">
          <thead>
            <tr>
              <th>Empleado</th>
              <th>Tipo de entrada</th>
              <th>Fecha</th>
              <th>Recurso</th>
              <th>Estado del recurso</th>
              <th>Cantidad</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((el) => (
              <tr key={el.idrecurso_entrega}>
                <td className="border px-2">
                  {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                </td>
                <td className="border px-2">{el.tipo_recibo}</td>
                <td className="border px-2">
                  {format.formatFechaComplete(el.fecha)}
                </td>
                <td className="border px-2">{el.recurso}</td>
                <td className="border px-2 text-center">{el.estado}</td>
                <td className="border px-2 text-center">{el.cantidad}</td>
                <td className="border px-2 text-center">
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setModalDel({
                        status: true,
                        idrecurso: el.idrecurso_entrega,
                      })
                    }
                  >
                    <li className="fa-regular fa-trash-can text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <DataTable
          columns={columns}
          data={dataTable}
          pagination
          customStyles={customStyle}
        />
      </div>
    </>
  );
};
export default EntregaRecursoRegistro;
