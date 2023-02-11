import { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import Bar from "../../../charts/Bar";
import Loader from "../../../assets/Loader";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import format from "../../../assets/format";
import PdfGraficas from "../../../pdf_generador/PdfGraficas";
import IconComponents from "../../../assets/IconComponents";
import AddNuevoMadrugador from "../../../modals/AddNuevoMadrugador";
import OffCanvasConfigIncumplientos from "../../../assets/OffCanvasConfigIncumplientos";

function ConcursoMadrugador() {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [idDep, setIdDep] = useState(1);
  const [idConcurso, setIdConcurso] = useState(1);
  const [showCanva, setShowCanva] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  const [month, setMonth] = useState(date.getMonth() + 1);
  const { data, error, isPending } = useGetData(
    `/madrugador/control-mensual/${idDep}/${year}/${month}`,
    actualizador
  );

  const dep = useGetData(`/madrugador/departamentos`, actualizador);

  const changeMonth = (e) => setMonth(e.target.value);
  const changeYear = (e) => setYear(e.target.value);
  const setShowCanvaOpen = () => setShowCanva(true);
  const setShowCanvaClose = () => setShowCanva(false);

  const handleDep = (e) => {
    let iddep = Number(e.target.value);
    const { response } = dep.data;
    let concurso = response.filter((el) => el.iddepartamento === iddep);
    const { idconcurso } = concurso[0];
    console.log(idConcurso);
    setIdConcurso(idconcurso);
    setIdDep(iddep);
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/recursos-humanos"
        textUrlback="Regresar a recursos humanos"
        title="Incentivo concurso el madrugador"
      >
        <span onClick={setShowCanvaOpen}>
          <IconComponents icon="gear" text="Configurar SNC" />
        </span>
      </HeaderComponents>
      {/* En categorizacion poner el id para identificar que concurso es en la base de datos, 1 = madrugadro, 2 = octanoso, 3=aceitoso */}
      <OffCanvasConfigIncumplientos
        show={showCanva}
        close={setShowCanvaClose}
        categorizacion={idConcurso}
        departamento={idDep}
        toogle={[actualizador, setActualizador]}
      />
      <div>
        <nav className="m-auto w-75 row">
          <div className="col-2">
            <label className="form-label">Mes</label>
            <InputChangeMes handle={changeMonth} defaultMes={month} />
          </div>
          <div className="col-2">
            <label className="form-label">Año</label>
            <InputChangeYear handle={changeYear} defaultYear={year} />
          </div>
          {!dep.error && !dep.isPending && (
            <div className="col-2">
              <label className="form-label">Departamento</label>
              <select className="form-control" onChange={handleDep}>
                {dep.data.response.map((el) => (
                  <option value={el.iddepartamento} key={el.idconcurso}>
                    {el.departamento}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="col-2 d-flex align-items-end">
            <button
              className="btn btn-info"
              title="Crear un concurso madrugador para otra área de trabajo dentro de la empresa"
              onClick={() => setShowModal(true)}
            >
              {" "}
              Nuevo
            </button>
          </div>
        </nav>
      </div>
      {!error && !isPending && (
        <Success
          data={data.response.data}
          columns={data.response.columns}
          year={year}
          month={month}
        />
      )}
      {isPending && (
        <div className="mt-4">
          <Loader />
        </div>
      )}
      <AddNuevoMadrugador
        stateEdit={[showModal, setShowModal]}
        toogle={[actualizador, setActualizador]}
      />
    </div>
  );
}

const Success = ({ data, month, year, columns }) => {
  const irregularidades = [];
  const dataBar = {
    labels: data.map((el) => el.empleado.nombre),
    dataset: [
      {
        label: "Puntaje final",
        backgroundColor: "rgba(5,112,14,1)",
        data: data.map((el) => el.puntosRestantes),
      },
    ],
  };

  const filter = data.filter((el) => el.puntosPerdidos > 0);
  filter.forEach((el) => {
    el.fechas.forEach((sub) => {
      const validar = Object.values(sub.puntos).reduce(
        (a, b) => Math.abs(a) + Math.abs(b)
      );
      if (validar > 0) irregularidades.push({ fecha: sub, ...el.empleado });
    });
  });

  return (
    <div>
      <div id="render">
        <div className="mt-3 d-flex justify-content-evenly">
          <div style={{ flexGrow: 1 }}>
            <table className="m-auto w-100">
              <thead>
                <tr>
                  <th className="border px-2 text-center">
                    Nombre Completo Despachador
                  </th>
                  <th className="border px-2 text-center">Puntaje Final</th>
                </tr>
              </thead>
              <tbody>
                {data.map((el) => (
                  <tr key={el.empleado.idempleado}>
                    <td className="fw-semibold border px-2 text-nowrap">
                      {el.empleado.nombre_completo}
                    </td>
                    <td className="fw-semibold text-center border">
                      {el.puntosRestantes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ flexGrow: 3 }}>
            <Bar
              datos={dataBar}
              legend={false}
              y={[0, 250]}
              text="Puntaje final despachadores"
              optionsCustom={{
                scales: {
                  y: {
                    title: {
                      display: true,
                      text: "Puntos",
                      font: {
                        size: 15,
                      },
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Empleados",
                      font: {
                        size: 15,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="my-4">
        <table className="m-auto">
          <thead>
            <tr>
              <th className="border px-2 text-center">Nombre completo</th>
              <th className="border px-2 text-center">Fecha</th>
              {columns.map((el, i) => (
                <th key={i} className="border px-2">
                  {el.incumplimiento}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {irregularidades.length > 0 ? (
              irregularidades.map((el, i) => (
                <tr key={i}>
                  <td className="border px-2">{el.nombre_completo}</td>
                  <td className="border px-2">
                    {format.formatFechaComplete(el.fecha.fecha)}
                  </td>
                  {Object.values(el.fecha.puntos).map((sub, j) => (
                    <td key={j} className="border px-2 text-center fw-semibold">
                      {sub}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="text-center border fw-semibold text-success"
                >
                  Despachadores al corriente
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <PdfGraficas mes={month} year={year} anchografica="80%" />
    </div>
  );
};

export default ConcursoMadrugador;
