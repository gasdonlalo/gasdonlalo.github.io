import React from "react";
import { Data } from "../Provider/Auth";
import { Dropdown } from "react-bootstrap";

const CustomGlobo = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      className="rounded bg-secondary rounded-circle d-flex me-2 pe-auto"
      ref={ref}
      onClick={onClick}
      style={{ width: "50px", height: "50px", cursor: "pointer" }}
    >
      <li
        className="fa-solid fa-user m-auto text-white"
        style={{ fontSize: "20pt" }}
      ></li>
      {children}
    </div>
  );
});

const CustomGloboBody = React.forwardRef(
  ({ children, className, style }, ref) => {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }
);
const CustomItem = React.forwardRef(({ children, className, style }, ref) => {
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
});

const GloboUsuario = () => {
  const selected = () => console.log("hola");
  const [user] = Data();
  const { nombre, apellido_paterno, apellido_materno } = user.auth;
  return (
    <Dropdown /* onSelect={selected} */>
      <Dropdown.Toggle as={CustomGlobo}>
        <Dropdown.Menu as={CustomGloboBody} style={{ width: "400px" }}>
          <div className="fw-bold">
            <p className="text-center">
              <span className="fw-semibold">
                {nombre} {apellido_paterno} {apellido_materno}
              </span>
            </p>
            <div>
              <Dropdown.Item as={CustomItem} className="mb-3">
                Reportes
              </Dropdown.Item>
              <div>
                <Reportes></Reportes>
                <button className="btn btn-danger mx-auto d-block">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown.Toggle>
    </Dropdown>
  );
};

const Reportes = () => {
  const selected = () => console.log("hola");
  const [user] = Data();
  const { nombre, apellido_paterno, apellido_materno } = user.auth;
  return (
    <Dropdown onSelect={selected}>
      <Dropdown.Toggle as={CustomGlobo}>
        <Dropdown.Menu as={CustomGloboBody} style={{ width: "400px" }}>
          <div className="fw-bold">
            <p className="text-center">
              <span className="fw-semibold">
                {nombre} {apellido_paterno} {apellido_materno}
              </span>
            </p>
            <div>
              <Dropdown.Item as={CustomItem} className="mb-3">
                Reportes
              </Dropdown.Item>
              <div>
                <button className="btn btn-danger mx-auto d-block">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown.Toggle>
    </Dropdown>
  );
};

export default GloboUsuario;
