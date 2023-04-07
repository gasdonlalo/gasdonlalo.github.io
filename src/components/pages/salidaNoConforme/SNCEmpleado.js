import { useState } from "react";
import useGetData from "../../../hooks/useGetData";
import ErrorHttp from "../../assets/ErrorHttp";
import format from "../../assets/format";
import Loader from "../../assets/Loader";
import Select from "react-select";
import HeaderComponents from "../../../GUI/HeaderComponents";
import HeaderForm from "../../../GUI/HeaderForm";
import DataTable from "react-data-table-component";
import PdfHistorialSNC from "../../pdf_generador/PdfHistorialSNC";

const SNCEmpleado = () => {
  const [idChecador, setIdChecador] = useState(null);
  const handleChecador = (e) => setIdChecador(Number(e.value));
  const { data, error, isPending } = useGetData("/empleado");

  const datosEmp =
    !error &&
    !isPending &&
    data.response.map((el) => ({
      value: el.idchecador,
      label: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    }));

  return (
    <div className="Main">
      <HeaderComponents
        title="SNC por empleados"
        urlBack="../"
        textUrlback="Regresar"
      />
      <div className="container-sm ">
        <div className="row">
          <div className="col-5 shadow p-2 mt-4">
            <HeaderForm />
            <label className="label-form fw-semibold">Empleado</label>
            <Select
              options={datosEmp}
              isLoading={isPending}
              onChange={handleChecador}
            />
          </div>
        </div>
      </div>
      {idChecador === null ? (
        <div className="bg-secondary fw-semibold text-center container-sm text-white">
          <p>Digite el id del empleado para ver sus salidas no conformes</p>
        </div>
      ) : (
        <FindData idChecador={idChecador} />
      )}
    </div>
  );
};

const FindData = ({ idChecador }) => {
  const { data, error, isPending } = useGetData(
    `salida-no-conforme/detalleEmpleado/${idChecador}`
  );

  return (
    <div className="mt-4">
      {error && !isPending && <ErrorHttp msg={"No se encontraron SNC"} />}
      {!error && !isPending && <Success data={data.response} />}
      {isPending && <Loader />}
    </div>
  );
};

const Success = ({ data }) => {
  data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const conditionalRow = [
    {
      when: (row) => row.autorizo === "Pendiente",
      style: {
        backgroundColor: "#ff808b",
      },
    },
  ];

  const customStyle = {
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: 900,
        textAling: "center",
        backgroundColor: "silver",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        padding: "8px",
      },
    },
  };

  const columnas = [
    {
      name: "Folio",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    {
      name: "Descripción de la falla",
      selector: (row) => row.descripcion,
      wrap: true,
    },
    {
      name: "Correcciones",
      selector: (row) => row.correcciones,
      wrap: true,
    },
    {
      name: "Concesiones",
      selector: (row) => row.concesiones,
      wrap: true,
    },
    {
      name: "Autorizo",
      selector: (row) => row.autorizo,
      wrap: true,
    },
    {
      name: "Tema",
      selector: (row) => row.tema,
      wrap: true,
    },
  ];

  const datas = data.map((el) => ({
    id: el.idsalida_noconforme,
    fecha: format.formatFechaComplete(el.fecha),
    descripcion: el.descripcion_falla,
    correcciones: el.acciones_corregir,
    concesiones: el.concesiones,
    autorizo: el.empleadoAutoriza
      ? `${el.empleadoAutoriza.nombre} ${el.empleadoAutoriza.apellido_paterno} ${el.empleadoAutoriza.apellido_materno}`
      : "Pendiente",
    tema: el.incumplimiento,
  }));

  return (
    <div>
      <p className="text-center fw-semibold">
        {data[0].empleado.nombre} {data[0].empleado.apellido_paterno}{" "}
        {data[0].empleado.apellido_materno}
      </p>
      <div className="container-sm">
        <DataTable
          columns={columnas}
          data={datas}
          pagination
          conditionalRowStyles={conditionalRow}
          customStyles={customStyle}
        />
        <PdfHistorialSNC datos={data} />
      </div>
    </div>
  );
};

export default SNCEmpleado;
