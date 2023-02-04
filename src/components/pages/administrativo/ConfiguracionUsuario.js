import { useState } from "react";
import HeaderComponents from "../../../GUI/HeaderComponents";
import useGetData from "../../../hooks/useGetData";
import { RegisterUser } from "../../modals/RegisterUser";
import ModalSuccess from "../../modals/ModalSuccess";
import ModalError from "../../modals/ModalError";

function ConfiguracionUsuario() {
  const usuarios = useGetData("/auth/usuarios");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [modal, setModal] = useState({ status: false, id: null });

  const closeModal = () => {
    setModalError({ status: false, msg: "" });
    setModalSuccess(false);
  };

  console.log(usuarios);
  return (
    <div className="Main">
      <HeaderComponents
        textUrlback="Volver a administracion"
        urlBack="../"
        title="Configuracion de usuarios"
      ></HeaderComponents>
      <div className="container mt-3 w-50">
        <table className="table table-bordered shadow">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nombre del empleado</th>
              <th>Usuario</th>
            </tr>
          </thead>
          {!usuarios.error && !usuarios.isPending && (
            <tbody>
              {usuarios.data.response.map((el) => (
                <tr key={el.idempleado}>
                  <td>{el.idempleado}</td>
                  <td>
                    {el.nombre} {el.apellido_paterno} {el.apellido_materno}
                  </td>
                  <td>
                    {el.username ? (
                      <button className="btn btn-success mx-auto d-block ">
                        Administrar usuario
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning mx-auto d-block"
                        onClick={() =>
                          setModal({ status: true, id: el.idempleado })
                        }
                      >
                        Crear usuario
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <RegisterUser
        stateEdit={[modal, setModal]}
        setModalSuccess={setModalSuccess}
        setModalError={setModalError}
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

export default ConfiguracionUsuario;
