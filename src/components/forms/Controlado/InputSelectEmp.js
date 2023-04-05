import React from "react";
import Select from "react-select";

const InputSelectEmp = ({
  empleados,
  name,
  handle,
  placeholder,
  value,
  multiple,
  disabled,
  clearable,
  required,
}) => {
  const options = empleados.map((el) => ({
    value: el.idempleado,
    label: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
  }));

  const change = (e) => {
    handle({ target: { value: e ? e.value : "", name } });
  };

  const defaultValue = () => {
    let dvalue = null;
    if (value) {
      if (value.hasOwnProperty(name)) {
        let filter = options.filter((el) => el.value === Number(value[name]));
        dvalue = filter[0];
      }
    }

    return dvalue;
  };

  return (
    <div>
      <Select
        options={options}
        onChange={change}
        name={name}
        placeholder={placeholder}
        defaultValue={options[0]}
        isClearable={clearable}
        value={defaultValue()}
        isDisabled={disabled}
        isMulti={multiple}
        required={required}
      />
    </div>
  );
};

export default InputSelectEmp;

InputSelectEmp.defaultProps = {
  multiple: false,
  required: false,
  disabled: false,
  placeholder: "Selecciona el empleado",
  clearable: false,
};
