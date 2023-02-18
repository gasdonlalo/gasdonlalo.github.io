import { useState } from "react";
import ModalError from "../../../modals/ModalError";
import ModalSuccess from "../../../modals/ModalSuccess";
import Delete from "../../../modals/Delete";

import HeaderComponents from "../../../../GUI/HeaderComponents";
import IconComponents from "../../../assets/IconComponents";
import InputChangeMes from "../../../forms/InputChangeMes";
import InputChangeYear from "../../../forms/InputChangeYear";
import useGetData from "../../../../hooks/useGetData";
import format from "../../../assets/format";

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
        textUrlback="Regresar a despacho"
        title="Montos Faltantes Mensuales"
      >
        <IconComponents
          icon="calendar-days text-warning"
          text="MF tiempo"
          url="/despacho/montos-faltantes/historial"
        />
      </HeaderComponents>
      <div className="container">
        <form>
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
        </form>
        <div>
          {!error && !isPending && (
            <Success data={data.response} setDel={setDel} />
          )}
        </div>
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
  console.log(data);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="border px-2 text-center">Estacion Servicio</th>
            <th className="border px-2 text-center">Nombre</th>
            <th className="border px-2 text-center">Fecha</th>
            <th className="border px-2 text-center">Descalificado</th>
            <th className="border px-2 text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr key={el.idventa_litros}>
              <td className="border p-2">{el.estacion_servicio}</td>
              <td className="border p-2">
                {el.nombre} {el.apellido_paterno} {el.apellido_materno}
              </td>
              <td className="border p-2">
                {format.formatFechaComplete(el.fecha)}
              </td>
              <td className="border p-2">{el.descalificado ? "Si" : "No"}</td>
              <td
                className="border p-2"
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
      </table>
    </div>
  );
};

export default OctanosoRegistros;
