import { useState } from "react";
import ModalError from "../../../modals/ModalError";
import ModalSuccess from "../../../modals/ModalSuccess";
import Delete from "../../../modals/Delete";

import HeaderComponents from "../../../../GUI/HeaderComponents";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";
import TableCustom from "../../../tablas/TableCustom";
import Filtrador from "../../../filtrador/Filtrador";

const OctanosoRegistros = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [del, setDel] = useState({ status: false, id: null });
  const [actualizador, setActualizador] = useState(false);

  const { data, error, isPending } = useGetData(
    `/octanoso/${year}/${month}}`,
    actualizador
  );

  const changeMes = (e) => {
    setMonth(e.target.value);
  };
  const changeYear = (e) => {
    setYear(e.target.value);
  };

  const close = () => setDel({ status: false, msg: "" });

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false });
  };
  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Atras"
        title="Registros octanoso "
      />

      <div className="row">
        <div className="mb-3 col 6">
          <label>Año</label>
          <InputChangeYear defaultYear={year} handle={changeYear} />
        </div>
        <div className="mb-3 col-6">
          <label>Mes</label>
          <InputChangeMes defaultMes={month} handle={changeMes} />
        </div>
      </div>

      <div className="mt-3">
        {!error && !isPending && (
          <Success data={data.response} setDel={setDel} />
        )}
      </div>

      {del.id && (
        <Delete
          stateShow={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          close={close}
          toogle={[actualizador, setActualizador]}
        />
      )}
      <ModalSuccess show={modalSuccess} close={closeModal} />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
};

const Success = ({ data, setDel }) => {
  data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const [registros, setRegistros] = useState(data);
  const conditionalRow = [
    {
      when: (row) => row.descalificado === "Si",
      style: {
        backgroundColor: "#ff808b",
      },
    },
  ];
  const columnas = [
    {
      name: "ID registro",
      selector: (row) => row.id,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
    },
    { name: "Empleado", selector: (row) => row.nombre, wrap: true },
    { name: "Estación de servicio", selector: (row) => row.estacion },
    { name: "Cantidad", selector: (row) => row.cantidad },
    { name: "Descalificado", selector: (row) => row.descalificado },
    {
      name: "Acciones",
      cell: (row) => (
        <i
          role="button"
          className="fa-solid fa-trash text-danger"
          onClick={() => setDel({ status: true, id: row.id })}
        />
      ),
    },
  ];
  const datosTabla = registros.map((el) => ({
    id: el.idventa_litros,
    fecha: format.formatFechaDB(el.fecha),
    nombre: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
    estacion: el.estacion_servicio,
    cantidad: `$${el.cantidad}`,
    descalificado: el.descalificado ? "Si" : "No",
  }));
  return (
    <div className="container-fluid">
      <Filtrador datosFiltrar={data} guardarFiltro={setRegistros} />
      {/* <table className="table table-bordered shadow">
        <thead>
          <tr className="table-secondary">
            <th>Estacion Servicio</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Descalificado</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((el) => (
            <tr key={el.idventa_litros}>
              <td>{el.estacion_servicio}</td>
              <td>
                {el.nombre} {el.apellido_paterno} {el.apellido_materno}
              </td>
              <td>{format.formatFechaComplete(el.fecha)}</td>
              <td>{el.descalificado ? "Si" : "No"}</td>
              <td
                onClick={() => setDel({ status: true, id: el.idventa_litros })}
              >
                <li
                  role="button"
                  className="fa-solid fa-trash text-danger"
                  title="Eliminar"
                ></li>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <TableCustom
        columnas={columnas}
        datos={datosTabla}
        conditionalRow={conditionalRow}
      />
    </div>
  );
};

export default OctanosoRegistros;
