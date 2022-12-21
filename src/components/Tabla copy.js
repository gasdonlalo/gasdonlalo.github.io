import { Fragment } from "react";

function Tabla({ datos }) {
  console.log(datos);

  const TablaSemana = () => {
    const semana = [];
    for (let i = 0; i < datos.totalSemanas; i++) {
      semana.push(<th>Semana {i + 1}</th>);
    }
    return semana.map((el) => el);
  };

  const TableCantidad = ({ data }) => {
    console.log(data);
    return (
      <Fragment>
        <th scope="row">{data.cantidad}</th>
      </Fragment>
    );
  };

  const TableEmpleados = ({ data }) => {
    const empleados = [];
    empleados.push(
      <tr>
        <th scope="row">{data.nombre_completo}</th>
        {data.semanas.map((el) => {
          return <TableCantidad data={el}></TableCantidad>;
        })}
      </tr>
    );
    return empleados.map((el) => el);
  };

  return (
    <div>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col">Nombre completo del despachador</th>
            <TablaSemana />
          </tr>
        </thead>
        <tbody>
          {datos.response.map((el) => (
            <TableEmpleados data={el} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabla;
