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
  loading,
  required,
}) => {
  const options = empleados.map((el) => ({
    id: el.idempleado,
    value: el.idchecador,
    iddepartamento: el.iddepartamento,
    departamento: el.departamento,
    label: `${el.nombre} ${el.apellido_paterno} ${el.apellido_materno}`,
  }));

  const change = (e) => {
    handle({
      target: { value: e ? e.id : "", name, iddepartamento: e.iddepartamento },
    });
  };

  const defaultValue = () => {
    let dvalue = null;
    if (value) {
      if (value.hasOwnProperty(name)) {
        let filter = options.filter((el) => el.id === Number(value[name]));
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
        isLoading={loading}
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
  loading: false,
};
