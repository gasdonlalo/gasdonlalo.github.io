import React, { useState } from "react";
import HeaderComponents from "../../../../GUI/HeaderComponents";
// import Bar from "../../../charts/Bar";
// import Scale from "../../../charts/Scale";
import format from "../../../assets/format";
// import Decimal from "decimal.js-light";
import { Per } from "../../../Provider/Auth";
import FormHistorialEmpleado from "../../../forms/FormHistorialEmpleado";
import ModalError from "../../../modals/ModalError";
import ModalSuccess from "../../../modals/ModalSuccess";
import Axios from "../../../../Caxios/Axios";
import IconComponents from "../../../assets/IconComponents";
import { EditOL, DeleteOL } from "../../../modals/EditOL";
import Scale from "../../../charts/Scale";

const HistorialOyL = () => {
  const [body, setBody] = useState(null);
  const [data, setData] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [edit, setEdit] = useState({ status: false, id: null });
  const [del, setDel] = useState({ status: false, id: null });

  const closeModal = () => {
    setModalSuccess(false);
    setModalError({ status: false, msg: "" });
  };

  const buscarDatos = async () => {
    try {
      const res = await Axios.post(
        `/ordenLimpieza/historial/${body.idEmpleado}`
      );
      setData(res.data.response);
    } catch (err) {
      setModalError({
        status: true,
        msg: "No se encontraron resultados en este intervalo de tiempo",
      });
      console.log(err);
    }
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="/despacho/orden-limpieza-isla/reporte"
        textUrlback="Regresar a reportes"
        title="Orden y limpieza de la isla"
      >
        <div>
          <IconComponents
            icon=" bi-check2-circle text-info"
            text="Orden y Limpieza"
            url="/despacho/orden-limpieza-isla"
          />
        </div>
      </HeaderComponents>
      {edit.id && (
        <EditOL
          stateEdit={[edit, setEdit]}
          setModalError={setModalError}
          setModalSuccess={setModalSuccess}
          buscarDatos={buscarDatos}
        />
      )}
      {del.id && (
        <DeleteOL
          stateDel={[del, setDel]}
          setModalSuccess={setModalSuccess}
          setModalError={setModalError}
          buscarDatos={buscarDatos}
        />
      )}
      <div>
        {!data && (
          <FormHistorialEmpleado
            state={[body, setBody]}
            buscarDatos={buscarDatos}
          />
        )}
        {data && (
          <Success
            data={data}
            setData={setData}
            setDel={setDel}
            setEdit={setEdit}
          />
        )}
      </div>
      <ModalSuccess
        show={modalSuccess}
        text="Se actualizaron los datos correctamente"
        close={closeModal}
      />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
    </div>
  );
};

const Success = ({ data, setData, setDel, setEdit }) => {
  const dataScale = {
    labels: data.map((el) => format.formatFechaComplete(el.fecha)),
    datasets: [
      {
        data: data.map((el) => el.total),
        borderColor: "rgba(51, 182, 214, 1)",
        backgroundColor: "rgba(51, 182, 214, 1)",
        label: "Puntos Obtenidos",
      },
    ],
  };
  return (
    <div>
      <div className="my-2">
        <button className="btn btn-success" onClick={() => setData(null)}>
          Buscar otro despachador
        </button>
      </div>
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Empleado</th>
              <th>Estacion Servicio</th>
              <th>Isla</th>
              <th>Turno</th>
              <th>Puntos obtenidos</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td>{format.formatFechaComplete(el.fecha)}</td>
                <td>
                  {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                </td>
                <td>{el.estacionServicio}</td>
                <td>{el.isla}</td>
                <td>{el.turno}</td>
                <td>{el.total}</td>
                <td>{el.motivo || "---"}</td>
                {Per(19) && (
                  <td
                    className="btn btn-light d-table-cell"
                    onClick={() =>
                      setDel({ status: true, id: el.identificador })
                    }
                  >
                    <li className="fa-solid fa-trash text-danger"></li>
                  </td>
                )}
                {Per(18) && (
                  <td
                    className="btn btn-light d-table-cell"
                    onClick={() =>
                      setEdit({ status: true, id: el.identificador })
                    }
                  >
                    <li className="fa-solid fa-pen text-warning"></li>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Scale
          data={dataScale}
          text="Gráfica historica de orden y limpieza"
          optionsCustom={{
            scales: {
              y: {
                min: 0,

                title: {
                  display: true,
                  text: "Puntos Obtenidos",
                  font: {
                    weight: "800",
                  },
                },
                ticks: {
                  stepSize: 1,
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Fechas de evaluación",
                  font: {
                    weight: "800",
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

export default HistorialOyL;
