import { useState, useContext } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import { RegisterUser } from "../../modals/RegisterUser";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";
import { Usuario } from "../../Provider/PermisoUsuario";
import { useNavigate } from "react-router-dom";
import { Per } from "../../Provider/Auth";

function ConfiguracionUsuario() {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [modal, setModal] = useState({ status: false, id: null });
  const [actualizador, setActualizador] = useState(false);
  const usuarios = useGetData("/auth/usuarios", actualizador);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  const setUsuario = useContext(Usuario);

  const setPermisos = (user) => {
    setUsuario[1](user);
    navigate("../configuracion-permisos");
  };

  return (
    <div className="Main">
      <HeaderComponents
        textUrlback="Volver a administracion"
        urlBack="../"
        title="Configuracion de usuarios"
      ></HeaderComponents>
      {!usuarios.error && !usuarios.isPending && (
        <Table
          data={usuarios.data.response}
          setPermisos={setPermisos}
          setModal={setModal}
        />
      )}
      <RegisterUser
        stateEdit={[modal, setModal]}
        setModalSuccess={setModalSuccess}
        setModalError={setModalError}
        toggle={[actualizador, setActualizador]}
      />
      <ModalError
        show={modalError.status}
        text={modalError.msg}
        close={closeModal}
      />
      <ModalSuccess show={modalSuccess} close={closeModal} />
    </div>
  );
}

const Table = ({ data, setModal, setPermisos }) => {
  const [usuarios, setUsuarios] = useState(data);

  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, "gi");
    const search = data.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno, idempleado } = el;
      return exp.test(
        `${idempleado} ${nombre} ${apellido_paterno} ${apellido_materno}`
      );
    });
    setUsuarios(search);
  };

  return (
    <div className="container mt-3 w-50">
      <input
        type="search"
        placeholder="Buscar usuario"
        className="form-control mb-2"
        onChange={filterEmp}
      />
      <table className="table table-bordered shadow">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre del empleado</th>
            <th>Departamento</th>
            <th className="text-center">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((el) => (
            <tr key={el.idempleado}>
              <td>{el.idempleado}</td>
              <td>
                {el.nombre} {el.apellido_paterno} {el.apellido_materno}
              </td>
              <td className="fw-semibold text-center">{el.iddepartamento}</td>
              {Per(49) && (
                <td>
                  {el.username ? (
                    <button
                      className="btn btn-success mx-auto d-block"
                      onClick={() => setPermisos(el)}
                    >
                      administrar usuario
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning mx-auto d-block"
                      onClick={() =>
                        setModal({ status: true, id: el.idempleado })
                      }
                    >
                      crear usuario
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ConfiguracionUsuario;
