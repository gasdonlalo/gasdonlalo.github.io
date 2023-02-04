import Logo from "../IMG/LogoGL.png";
import auth from "./Provider/auth";
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

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
          className="btn btn-primary me-2 rounded-circle"
          to="/"
        >
          <i className="bi bi-house" style={{ fontSize: "15pt" }} />
        </Link>
        {/* Cerrar sesion  */}
        {/* <div
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
        </div> */}
        {/* Menu cerrar sesion */}
        <Dropdown>
          <DropdownButton
            title={<i class="fa-regular fa-user" />}
            variant="outline-secondary me-2"
            id="dropdown-menu-align-center  "
          >
            <DropdownItem className="pe-none">
              Bienvenido {auth().auth.nombre || ""}
            </DropdownItem>
            <Dropdown.Divider />
            {/* <div
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
              <text>
                Cerrar sesión
                <strong>
                  <i
                    className="fa-regular fa-close"
                    style={{ fontSize: "15pt" }}
                  />
                </strong>
              </text>
            </div> */}

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
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </strong>
            </DropdownItem>
          </DropdownButton>
        </Dropdown>
      </div>
    </div>
  );
}
export default Header;
