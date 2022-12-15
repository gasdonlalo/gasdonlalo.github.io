import Logo from "../IMG/LogoGL.png";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="Header shadow-sm">
      <img
        src={Logo}
        className="ms-2 img-fluid"
        width="200px"
        alt="Gasolineria Don Lalo"
      />
      <Link type="button" className="btn btn-primary me-2" to="/">
        Home
      </Link>
    </div>
  );
}
export default Header;
