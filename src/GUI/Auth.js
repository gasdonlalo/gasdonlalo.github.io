import { useState } from "react";
import Axios from "../Caxios/Axios";
import HeaderForm from "./HeaderForm";
import Loader from "../components/assets/Loader";
// import user from "../components/Provider/user";
import user from "../components/Provider/auth";

const Auth = () => {
  const [success, setSuccess] = useState({ status: null, pending: false });
  const [msgError, setMsgError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const auth = async (e) => {
    e.preventDefault();
    setSuccess({ ...success, pending: true });
    try {
      const cuerpo = {
        user: e.target.user.value,
        password: e.target.password.value,
      };
      const user = await Axios.post("/auth/login", cuerpo);
      localStorage.setItem("Credentials", JSON.stringify(user.data));
      console.log(user);
      setSuccess({ msg: "Correcto, Redireccionado", pending: false });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch (err) {
      console.log(err);
      setSuccess({ msg: null, pending: false });
      setMsgError(err.response.data.msg);
      setTimeout(() => {
        setMsgError(null);
      }, 2000);
    }
  };

  if (user()) window.location.href = "/";

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="d-flex">
      <div className="m-auto">
        <form className="shadow p-3 rounded" onSubmit={auth}>
          <HeaderForm title="Inicia Sesión" />
          <div>
            <div className="col-12 mb-3">
              <label className="form-label mb-0">Usuario</label>
              <input
                type="text"
                placeholder="username"
                className="form-control"
                name="user"
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
          </div>
          <div className="mt-2">
            <button
              className="btn btn-secondary mx-auto d-block"
              disabled={success.pending}
            >
              {success.pending ? <Loader size="1.5" /> : "Acceder"}
            </button>
          </div>
          {msgError && (
            <p className="text-danger text-center fw-bold">{msgError}</p>
          )}
          {success.msg && (
            <p className="text-success text-center fw-semibold">
              {success.msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
