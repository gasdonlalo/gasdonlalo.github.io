import { useState } from "react";
import Axios from "../../Caxios/Axios";
import Loader from "../assets/Loader";

const ChangePass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [statusSuccess, setStatusSucess] = useState(false);
  const [statusErr, setStatusErr] = useState(false);
  const tooglePassword = () => setShowPassword(!showPassword);
  let authData = localStorage.getItem("Credentials");
  authData = JSON.parse(authData);

  const enviar = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const body = {
        user: e.target.user.value,
        password: e.target.password.value,
        newPassword: e.target.newPassword.value,
      };
      await Axios.put("/auth/changePass", body);
      setStatusSucess(true);
      setTimeout(() => {
        setStatusSucess(false);
      }, 1000);
      e.target.reset();
    } catch (error) {
      setStatusErr(true);
      setTimeout(() => {
        setStatusErr(false);
      }, 1000);
    }
    setPending(false);
  };
  return (
    <div className="container-sm">
      <div className="m-auto mt-4">
        <form className="shadow p-3 rounded" onSubmit={enviar}>
          <div>
            <div className="col-12 mb-3">
              <label className="form-label mb-0">Usuario</label>
              <input
                type="text"
                placeholder="username"
                className="form-control"
                name="user"
                value={authData.auth.username}
                disabled
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label mb-0">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="form-control"
                  name="password"
                  required
                />
                <button
                  className="btn btn-outline-dark"
                  type="button"
                  onClick={tooglePassword}
                >
                  <i
                    className={
                      !showPassword
                        ? "fa-regular fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  />
                </button>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label mb-0">Nueva contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="new password"
                  className="form-control"
                  name="newPassword"
                  required
                />
                <button
                  className="btn btn-outline-dark"
                  type="button"
                  onClick={tooglePassword}
                >
                  <i
                    className={
                      !showPassword
                        ? "fa-regular fa-eye"
                        : "fa-regular fa-eye-slash"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <button
              className="btn btn-danger mx-auto d-block"
              disabled={pending}
            >
              {pending ? <Loader size="1.5" /> : "Cambiar contraseña"}
            </button>
          </div>
        </form>
      </div>

      {statusSuccess && (
        <div className="bg-success text-white fw-semibold text-center">
          <p>Se guardo la nueva contraseña correctamente</p>
        </div>
      )}
      {statusErr && (
        <div className="bg-danger text-white fw-semibold text-center">
          <p>La contraseña es incorrecta</p>
        </div>
      )}
    </div>
  );
};

export default ChangePass;
