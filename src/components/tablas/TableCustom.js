import DataTable from "react-data-table-component";

function TableCustom({ columnas, datos, nameFecha, conditionalRow }) {
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
  const fixHeader = {
    fixedHeader: true,
    fixedHeaderScrollHeight: "300px",
  };
  const opcionesPaginacion = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
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
  const addSortable = () => {
    const indexOfFecha = columnas.findIndex((el) => el.name === nameFecha); //obtiene el indice de la fecha en el arreglo original
    const nuevaColumna = columnas.filter((el) => el.name !== nameFecha); //filtra los datos sin la columna fecha
    const fecha = columnas.filter((el) => el.name === nameFecha);
    return [
      ...nuevaColumna.splice(0, indexOfFecha),
      { ...fecha[0], sortFunction: sortFechas },
      ...nuevaColumna,
    ];
  }; //añade la funcion de ordenamiento de fechas automaticamente

  return (
    <DataTable
      customStyles={customStyle}
      data={datos}
      columns={addSortable()}
      pagination
      paginationComponentOptions={opcionesPaginacion}
      noDataComponent={<Nodata />}
      fixedHeader={fixHeader}
      conditionalRowStyles={conditionalRow}
    />
  );
}
TableCustom.defaultProps = {
  nameFecha: "Fecha",
};
const Nodata = () => {
  return (
    <h4 className="fst-italic text-danger">
      Sin datos para mostrar <i className="fa-regular fa-face-frown" /> ...
    </h4>
  );
};

export default TableCustom;
