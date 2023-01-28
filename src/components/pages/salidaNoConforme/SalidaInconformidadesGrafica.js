import { Fragment, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import InputChangeMes from "../../forms/InputChangeMes";
import InputChangeYear from "../../forms/InputChangeYear";
import Loader from "../../assets/Loader";
import Bar from "../../charts/Bar";
import ErrorHttp from "../../assets/ErrorHttp";
import HeaderComponents from "../../../GUI/HeaderComponents";
import PdfV2 from "../../pdf_generador/PdfV2";

const SalidaInconformidadesGrafica = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);

  const incumplimientos = useGetData(
    `salida-no-conforme/inconformidad/${year}/${month}/1`
  );

  const handleMonth = (e) => {
    setMonth(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="Main">
      <HeaderComponents
        title="Reporte mensual Salidas No Conformes por inconformidad"
        textUrlback="Regresar a archivos"
        urlBack="../files"
      ></HeaderComponents>
      <div className="row w-75 mx-auto mt-4">
        <div className="col-md-6">
          <InputChangeMes defaultMes={month} handle={handleMonth} />
        </div>
        <div className="col-md-6">
          <InputChangeYear defaultYear={year} handle={handleYear} />
        </div>
      </div>
      {!incumplimientos.error && !incumplimientos.isPending && (
        <Success
          data={incumplimientos.data.response}
          year={year}
          month={month}
        />
      )}
      {incumplimientos.isPending && <Loader />}
      {incumplimientos.error && !incumplimientos.isPending && (
        <div className="mt-5">
          <ErrorHttp
            code={incumplimientos.dataError.code}
            msg={incumplimientos.dataError.msg}
          />
        </div>
      )}
    </div>
  );
};

const Success = ({ data, year, month }) => {
  console.log(data);
  const dataBar = {
    labels: data.map((el) => el.incumplimiento),
    dataset: [
      {
        data: data.map((el) => el.total),
        backgroundColor: "rgba(227, 116, 19, 1)",
      },
    ],
  };
  return (
    <Fragment>
      <div className="mt-4 mx-auto" id="render">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ flexGrow: "1" }}>
            <table>
              <thead>
                <tr>
                  <th className="border p-2 text-center">
                    Incumplimientos e inconformidades <br /> en el area de
                    despacho
                  </th>
                  <th className="border p-2">Incumplimientos</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr>
                    <td className="border text-center">{el.incumplimiento}</td>
                    <td className="border text-center">{el.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flexGrow: "1" }}>
            <Bar
              datos={dataBar}
              legend={false}
              text="Cumplimientos e inconformidades en el área de despacho"
            />
          </div>
        </div>
      </div>
      <div>
        <PdfV2 year={year} month={month} />
      </div>
    </Fragment>
  );
};

export default SalidaInconformidadesGrafica;
