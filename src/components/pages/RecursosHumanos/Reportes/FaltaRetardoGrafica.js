import { useEffect, useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
import useGetData from "../../../../hooks/useGetData";
import InputSelectDep from "../../../forms/InputSelectDep";
import InputSelectEmpleado from "../../../forms/InputSelectEmpleado";
import format from "../../../assets/format";
import Axios from "../../../../Caxios/Axios";
import Bar from "../../../charts/Bar";
import ErrorHttp from "../../../assets/ErrorHttp";
// import IconComponents from "../../../assets/IconComponents";
// import PdfV2 from "../../../pdf_generador/PdfV2";
import InputFechaC from "../../../forms/Controlado/InputFechaC";
import Descanso from "../../../modals/Descanso";
import EditarEntradas, { DelEntradas } from "../../../modals/EditarEntradas";

const FaltaRetardoGrafica = () => {
  const localFechaI = localStorage.getItem("fechaI") || "";
  const localFechaF = localStorage.getItem("fechaF") || "";
  const [fechas, setFechas] = useState({
    fechaI: localFechaI,
    fechaF: localFechaF,
  });
  const [actualizador, setActualizador] = useState(false);
  const [emp, setEmp] = useState(null);
  const [idDep, setIdDep] = useState(null);
  const [data, setData] = useState({ success: false });
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState({
    status: false,
    idCap: "",
    data: null,
  });
  const [modalDel, setModalDel] = useState({ status: false, idCap: "" });

  const actualizarData = () => setActualizador(!actualizador);

  const empleados = useGetData(`/empleado?departamento=${idDep}`);
  const changeEmp = (e) => setIdDep(Number(e.target.value));
  const changeIdEmp = (e) => setEmp(Number(e.target.value));

  const changeFechaInicio = (e) =>
    setFechas({ ...fechas, [e.target.name]: e.target.value });

  useEffect(() => {
    localStorage.setItem("fechaI", fechas.fechaI);
    localStorage.setItem("fechaF", fechas.fechaF);
  }, [fechas]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Axios.post(`/entrada/buscar-capturas/${emp}`, {
          dateStart: fechas.fechaI,
          dateEnd: fechas.fechaF,
        });
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        setData(err.response.data);
      }
    };
    getData();
  }, [emp, fechas, actualizador]);

  return (
    <div className="Main">
      <HeaderComponents
        title="Reportes Faltas y retardos"
        urlBack="../"
        textUrlback="Regresar al menú"
      ></HeaderComponents>
      <div>
        <nav className="d-flex justify-content-around w-50 mx-auto mb-3">
          <div>
            <label className="label-form">
              Fecha Inicio
              <InputFechaC
                handle={changeFechaInicio}
                name="fechaI"
                value={fechas}
                required
              />
            </label>
          </div>
          <div>
            <label className="label-form">
              Fecha Final
              <InputFechaC
                handle={changeFechaInicio}
                name="fechaF"
                value={fechas}
                required
              />
            </label>
          </div>
        </nav>
      </div>
      <div>
        <nav className="m-auto w-75 row">
          <div className="col-3">
            <label className="form-label">Departamento</label>
            <InputSelectDep handle={changeEmp} />
          </div>
          <div className="col-7">
            <label className="form-label">Selecciona el empleado</label>
            {!empleados.error && !empleados.isPending && (
              <InputSelectEmpleado
                defaultValue={emp}
                empleados={empleados.data.response}
                handle={changeIdEmp}
              />
            )}
            {!empleados.isPending && empleados.error && (
              <div className="border p-1 form-select text-center py-2">
                Selecciona un departamento
              </div>
            )}
          </div>
          <div className="col-2 d-flex align-items-end">
            {emp && (
              <button className="btn btn-info" onClick={() => setModal(true)}>
                Añadir descanso
              </button>
            )}
          </div>
        </nav>
      </div>
      <div className="grafica">
        {data.success && (
          <Success
            data={data.response}
            state={[modal, setModal]}
            showMEdit={setModalEdit}
            showMDel={setModalDel}
          />
        )}
        {!data.success && (
          <div className="mt-5">
            <ErrorHttp msg="Sin datos" />{" "}
          </div>
        )}
      </div>
      <Descanso
        state={[modal, setModal]}
        idEmpleado={emp}
        setActualizador={actualizarData}
      />
      <EditarEntradas
        state={[modalEdit, setModalEdit]}
        actualizador={actualizarData}
      />
      <DelEntradas
        state={[modalDel, setModalDel]}
        actualizador={actualizarData}
      />
    </div>
  );
};

const Success = ({ data, showMEdit, showMDel }) => {
  const inconformidades = data.filter((el) => el.idtipo_falta);
  const agrupar = {};
  inconformidades.forEach((el) => {
    if (agrupar.hasOwnProperty(el.tipo_falta.tipo)) {
      agrupar[el.tipo_falta.tipo].push(el);
    } else {
      agrupar[el.tipo_falta.tipo] = [el];
    }
  });

  const dataBar = {
    labels: Object.keys(agrupar),
    dataset: [
      {
        label: "Inconformidades",
        data: Object.keys(agrupar).map((el) => agrupar[el].length),
        backgroundColor: Object.keys(agrupar).map(
          (el) => agrupar[el][0].tipo_falta.color
        ),
      },
    ],
  };

  return (
    <div>
      <div className="tabla w-50 mx-auto mt-5">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Establecida</th>
              <th>Hora Entrada</th>
              <th>Minutos de retardos</th>
              <th>Inconveniente</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el.idcaptura_entrada}>
                <td>{format.formatFechaComplete(el.fecha)}</td>
                <td>
                  {el.hora_establecida
                    ? format.formatHours(`2022-01-01 ${el.hora_establecida}`)
                    : "--"}
                </td>
                <td>
                  {el.hora_entrada
                    ? format.formatHours(`2022-01-01 ${el.hora_entrada}`)
                    : "--"}
                </td>
                <td className="text-center">
                  {el.minutos_retardos ? (
                    <span
                      className={`fw-semibold text-${
                        el.minutos_retardos === "00:00" ? "success" : "danger"
                      }`}
                    >
                      {el.minutos_retardos}
                    </span>
                  ) : (
                    "--"
                  )}
                </td>
                <td>
                  {el.hasOwnProperty("tipo_falta") ? el.tipo_falta.tipo : ""}
                </td>
                <td>
                  <button
                    className="btn btn-light d-block mx-auto"
                    onClick={() =>
                      showMEdit({
                        status: true,
                        idCap: el.idcaptura_entrada,
                        horaEstablecida: el.hora_establecida || "",
                        horaEntrada: el.hora_entrada || "",
                      })
                    }
                  >
                    <li className="fa-solid fa-pen text-warning" />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-light d-block mx-auto"
                    onClick={() =>
                      showMDel({ status: true, idCap: el.idcaptura_entrada })
                    }
                  >
                    <li className="fa-solid fa-trash text-danger" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grafica w-75 mx-auto">
        <Bar
          datos={dataBar}
          text={`${data[0].empleado.nombre} ${data[0].empleado.apellido_paterno} ${data[0].empleado.apellido_materno} `}
          legend={false}
          optionsCustom={{
            scales: {
              y: {
                title: {
                  min: 0,
                  ticks: { stepSize: 1 },
                  display: true,
                  text: "Cantidad",
                  font: {
                    size: "20px",
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Inconformidades",
                  font: {
                    size: "20px",
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default FaltaRetardoGrafica;
