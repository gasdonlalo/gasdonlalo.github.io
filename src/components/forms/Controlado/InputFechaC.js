import { useRef } from "react";
import format from "../../assets/format";

const InputFechaC = ({ handle, name, disabled, min, value }) => {
  const inputFecha = useRef();
  const establecerFecha = () => {
    let hoy = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]; //Obtiene la fecha actual
    handle({ target: { name, value: hoy } });
  };
  return (
    <div className="input-group">
      <input
        type="date"
        className="form-control"
        name={name}
        ref={inputFecha}
        onChange={handle}
        disabled={disabled}
        //El value es la variable de estado que se manejara por ejemplo el body o el data.
        value={value ? (value.hasOwnProperty(name) ? value[name] : "") : ""}
        min={min}
        max={format.formatFechaDB(new Date())}
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

export default InputFechaC;
