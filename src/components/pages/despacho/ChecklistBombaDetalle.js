import { useState } from "react";
import { Link } from "@react-pdf/renderer";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import useGetData from "../../../hooks/useGetData";
import Loader from "../../assets/Loader";
import format from "../../assets/format";
import Scale from "../../charts/Scale";

const ChecklistBombaDetalle = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const totalChkB = useGetData(`/bomba-check/total/${year}/${month}`);

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  return (
    <div className="Main">
      <Link className="link-primary" to="/despacho">
        Volver al despacho
      </Link>
      <h3 className="border-bottom">
        Total de checklist de bomba por empleado
      </h3>
      <div className="row w-75 mx-auto">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!totalChkB.error && !totalChkB.isPending && (
        <Success data={totalChkB.data.response} />
      )}
      {totalChkB.isPending && <Loader />}
    </div>
  );
};

const Success = ({ data }) => {
  const dataScale = {
    labels: data.map((el) => el.nombre_completo),
    datasets: [
      {
        label: "Empleados",
        data: data.map((el) => el.total_checklist),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Minimo",
        data: data.map((el) => 28),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="mt-4">
      <div className="d-flex ">
        <table className="table table-bordered" style={{ width: "500px" }}>
          <thead>
            <tr>
              <th>Nombre del Despachador</th>
              <th>Total</th>
              <th>Limite Minimo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.idempleado}>
                <td className="p-0 ps-1">
                  {format.formatTextoMayusPrimeraLetra(el.nombre_completo)}
                </td>
                <td className="p-0 text-center">{el.total_checklist}</td>
                <td className="p-0 text-center">28</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ maxWidth: "max-content" }}>
          <Scale data={dataScale}></Scale>
        </div>
      </div>
    </div>
  );
};

export default ChecklistBombaDetalle;
