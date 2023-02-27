import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const CustomSelect = React.forwardRef(({ children, onClick }, ref) => (
  <div
    tabIndex={0}
    ref={ref}
    className="form-select "
    onClick={onClick}
    style={{ userSelect: "none" }}
  >
    <div className="w-100 text-nowrap overflow-hidden">{children}</div>
  </div>
));

const CustomMenu = React.forwardRef(({ children, className, style }, ref) => {
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
});

const InputSelectEmpleado = ({
  handle,
  empleados,
  name,
  reset,
  defaultData,
  disabled,
}) => {
  const [text, setText] = useState(defaultData.nombre || "Selecciona empleado");
  const [id, setId] = useState(null);
  const [value, setValue] = useState(empleados);
  const selected = (id, el) => {
    setId(id);
    setText(el.target.textContent);
    handle({
      target: {
        name,
        value: id,
      },
    });
  };

  useEffect(() => {
    if (reset === null || reset === false) {
      setText("Selecciona empleado");
      setId(null);
    }
  }, [reset]);

  const filterEmp = (e) => {
    let rgex = new RegExp(e.target.value, "gi");
    const filterEmp = empleados.filter((el) =>
      rgex.test(`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`)
    );
    setValue(filterEmp);
  };

  return (
    <Dropdown onSelect={selected}>
      <Dropdown.Toggle as={CustomSelect}>{text}</Dropdown.Toggle>
      <Dropdown.Menu
        as={CustomMenu}
        className="overflow-auto"
        style={{ maxHeight: "250px" }}
        // valueInput={valueInput}
      >
        <Form.Control
          autoFocus
          className="m-auto w-75 ms-3"
          placeholder="Empleado"
          onChange={filterEmp}
          // value={valueInput[0]}
        />
        {value.map((el) => (
          <Dropdown.Item
            key={el.idempleado}
            eventKey={el.idempleado}
            active={Number(el.idempleado) === Number(id || defaultData.id)}
            disabled={disabled}
          >
            <option value={el.idempleado}>
              {`${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`}
            </option>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

InputSelectEmpleado.defaultProps = {
  defaultData: {
    nombre: null,
    id: null,
  },
  disabled: false,
};
export default InputSelectEmpleado;
