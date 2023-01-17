import { useRef } from "react";

const InputFecha = ({
  handle,
  name,
  data,
  setData,
  defaultValue,
  disabled,
}) => {
  const inputFecha = useRef();
  const establecerFecha = () => {
    let hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]; //Obtiene la fecha actual
    inputFecha.current.value = hoy;
    setData({ ...data, [name]: hoy });
  };
  return (
    <div className="input-group">
      <input
        type="date"
        className="form-control"
        name={name}
        ref={inputFecha}
        onChange={handle}
        defaultValue={defaultValue || null}
        disabled={disabled}
        required
      />
      <span
        className="input-group-text"
        onClick={disabled ? null : establecerFecha}
        role="button"
      >
        HOY
      </span>
    </div>
  );
};

export default InputFecha;
