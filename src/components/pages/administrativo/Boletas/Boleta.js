import { Link } from "react-router-dom";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../assets/Loader";

function Boleta() {
  const empleados = useGetData("/empleado?departamento=1");

  return (
    <div className="Main">
      <HeaderComponents title="Resumen de evaluaciones de los despachadores" />
      {/* Tabla */}
      {empleados.isPending && <Loader />}
      {!empleados.isPending && !empleados.error && (
        <Tabla datos={empleados.data.response} />
      )}
    </div>
  );
}
const Tabla = ({ datos }) => {
  return (
    <div className="container w-50 mt-3 ">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre del despachador</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((el, i) => {
            return (
              <tr key={i}>
                <td>{el.idempleado}</td>
                <td>
                  <Link
                    to={`detalles/${el.idempleado}`}
                  >{`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`}</Link>
                </td>
                <td>{el.departamento}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Boleta;
