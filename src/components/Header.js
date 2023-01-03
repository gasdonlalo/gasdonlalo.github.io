import Logo from "../IMG/LogoGL.png";
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
      <Link
        type="button"
        className="btn btn-primary me-2 rounded-circle"
        to="/"
      >
        <i className="bi bi-house" style={{ fontSize: "15pt" }} />
      </Link>
    </div>
  );
}
export default Header;
