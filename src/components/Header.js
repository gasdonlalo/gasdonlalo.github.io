import Logo from "../IMG/LogoGL.png";
import { Link, useNavigate } from "react-router-dom";
import { Data } from "./Provider/Auth";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function Header() {
  const [user] = Data();
  const { nombre } = user.auth;
  const navigate = useNavigate();
  const changePass = () => {
    navigate("/auth/changePassword");
  };
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
        {/* Dropdown de usuario */}
        <Dropdown>
          <DropdownButton
            title={<i className="fa-regular fa-user" />}
            variant="outline-secondary me-2"
            id="dropdown-menu-align-center  "
          >
            <DropdownItem active={false} className="pe-none">
              Bienvenido {nombre}
            </DropdownItem>
            <DropdownItem>
              <div>
                <button
                  className="btn btn-danger d-block mx-auto"
                  onClick={changePass}
                >
                  Cambiar contraseña
                </button>
              </div>
            </DropdownItem>
            <Dropdown.Divider />
            <DropdownItem
              onClick={() => {
                localStorage.removeItem("Credentials");
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
              className="text-danger text-center"
            >
              Cerrar sesion{" "}
              <strong>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </strong>
            </DropdownItem>
          </DropdownButton>
        </Dropdown>
      </div>
    </div>
  );
}
export default Header;
