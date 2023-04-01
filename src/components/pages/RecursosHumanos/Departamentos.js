import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import ErrorHttp from "../../assets/ErrorHttp";
import Loader from "../../assets/Loader";
import Axios from "../../../Caxios/Axios";
import FormDepartamento from "../../forms/FormDepartamento";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";

const Departamentos = () => {
  const [formPending, setFormPending] = useState(false);
  const [dataDefault, setDataDefault] = useState(null);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [body, setBody] = useState({});
  const { data, error, isPending } = useGetData("/departamento", formPending);
  const enviar = async (e) => {
    e.preventDefault();
    setFormPending(true);
    try {
      if (dataDefault) {
        await Axios.put(`/departamento/${dataDefault.iddepartamento}`, body);
      } else {
        await Axios.post("/departamento", body);
      }
      setModalSuccess(true);
      setFormPending(false);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setFormPending(false);
    }
  };

  const edit = (id) => {
    setDataDefault(data.response.filter((el) => el.iddepartamento === id)[0]);
  };

  const eliminar = async (id) => {
    setFormPending(true);
    try {
      await Axios.delete(`/departamento/${id}`);
      setModalSuccess(true);
      setFormPending(false);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setModalError({
          status: true,
          msg: err.response.data.msg,
        });
      } else {
        setModalError({ status: true, msg: err.code });
      }
      setFormPending(false);
    }
  };

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  const handle = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  return (
    <div className="Main">
      <HeaderComponents
        urlBack="../"
        textUrlback="Regresar a recursos humanos"
        title="Administración de departamentos"
      />
      <FormDepartamento
        enviar={enviar}
        handle={handle}
        pending={formPending}
        dataDefault={dataDefault}
      />
      {!error && !isPending && (
        <Success data={data.response} edit={edit} eliminar={eliminar} />
      )}
      {isPending && <Loader />}
      {error && !isPending && (
        <div className="mt-5">
          <ErrorHttp msg={"Error al cargar departamentos"} />
        </div>
      )}
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
    </div>
  );
};

const Success = ({ data, edit, eliminar }) => {
  return (
    <div>
      <table className="mx-auto mt-4">
        <thead>
          <tr>
            <th className="border px-2">N°</th>
            <th className="text-center border px-2">Departamentos</th>
            <th className="border px-2">Eliminar</th>
            <th className="border px-2">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, i) => (
            <tr key={el.iddepartamento}>
              <td className="text-center border px-2">{i + 1}</td>
              <td className="border px-2">{el.departamento}</td>
              <td className="border px-2 text-center">
                <li
                  onClick={() => eliminar(el.iddepartamento)}
                  className="fa-solid fa-trash text-danger"
                  title="Eliminar"
                ></li>
              </td>
              <td className="border px-2 text-center">
                <li
                  role="button"
                  onClick={() => edit(el.iddepartamento)}
                  className="fa-solid fa-pen text-warning"
                  title="Actualizar"
                ></li>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departamentos;
