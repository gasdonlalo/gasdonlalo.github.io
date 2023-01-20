import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const CustomSelect = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    className="form-select "
    onClick={onClick}
    style={{ userSelect: "none" }}
  >
    <div className="w-100 text-nowrap overflow-hidden">{children}</div>
  </div>
));

const CustomMenu = React.forwardRef(
  ({ children, className, style, valueInput }, ref) => {
    const [value, setValue] = valueInput;
    let rgex = new RegExp(value || "", "gi");
    const childs = React.Children.toArray(children).filter((el) =>
      rgex.test(el.props.children.props.children.join(""))
    );
    const filterEmp = (e) => setValue(e.target.value);
    return (
      <div ref={ref} className={className} style={style}>
        <Form.Control
          autoFocus
          className="m-auto w-75 ms-3"
          placeholder="Empleado"
          onChange={filterEmp}
          value={value}
        />
        {childs}
      </div>
    );
  }
);

const InputSelectEmpleado = ({
  handle,
  empleados,
  name,
  reset,
  defaultData,
}) => {
  const [text, setText] = useState(defaultData.nombre || "Selecciona empleado");
  const [id, setId] = useState(null);
  const valueInput = useState("");
  const selected = (id, el) => {
    setId(id);
    setText(el.target.textContent);
    handle({
      target: {
        name,
        value: id,
      },
    });
    valueInput[1]("");
  };

  useEffect(() => {
    if (reset === null || reset === false) {
      setText("Selecciona empleado");
      setId(null);
    }
  }, [reset]);

  return (
    <Dropdown onSelect={selected}>
      <Dropdown.Toggle as={CustomSelect}>{text}</Dropdown.Toggle>

      <Dropdown.Menu
        as={CustomMenu}
        className="overflow-auto"
        style={{ maxHeight: "250px" }}
        valueInput={valueInput}
      >
        {empleados.map((el) => (
          <Dropdown.Item
            key={el.idempleado}
            eventKey={el.idempleado}
            active={Number(el.idempleado) === Number(id || defaultData.id)}
          >
            <option value={el.idempleado}>
              {el.nombre} {el.apellido_paterno} {el.apellido_materno}
            </option>
          </Dropdown.Item>
        ))}
        {/*  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

InputSelectEmpleado.defaultProps = {
  defaultData: {
    nombre: null,
    id: null,
  },
};
export default InputSelectEmpleado;
