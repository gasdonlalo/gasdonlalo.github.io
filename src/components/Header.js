import Logo from "../IMG/LogoGL.png";
import { Link } from "react-router-dom";
import GloboUsuario from "./assets/GloboUsuario";
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
        <Link
          type="button"
          className="btn btn-primary me-2 rounded-circle d-flex"
          style={{ width: "50px", height: "50px" }}
          to="/"
        >
          <i
            className="fa-regular fa-house m-auto"
            style={{ fontSize: "15pt" }}
          />
        </Link>
        {/* <div
          type="button"
          className="bg- rounded-circle"  
          to="/auth"
          onClick={() => {
            localStorage.removeItem("Credentials");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }} 
        > */}
        <GloboUsuario />
        {/* </div> */}
      </div>
    </div>
  );
}
export default Header;
