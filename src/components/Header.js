import Logo from "../IMG/LogoGL.png";
import auth from "./Provider/auth";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="Header shadow-sm sticky-top ">
      <img
        src={Logo}
        className="ms-2 img-fluid"
        width="200px"
        alt="Gasolineria Don Lalo"
      />
      <div className="d-flex align-items-center">
        <p className="me-2">{auth().auth.nombre}</p>
        <Link
          type="button"
          className="btn btn-primary me-2 rounded-circle"
          to="/"
        >
          <i className="bi bi-house" style={{ fontSize: "15pt" }} />
        </Link>
        <div
          type="button"
          className="btn btn-secondary me-2 rounded-circle"
          to="/auth"
          onClick={() => {
            localStorage.removeItem("Credentials");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
        >
          <i className="fa-regular fa-close" style={{ fontSize: "15pt" }} />
        </div>
      </div>
    </div>
  );
}
export default Header;
