import React from "react";

const FormDepartamento = () => {
  return (
    <div>
      <form>
        <div>
          <label>Nuevo departamento</label>
          <input
            className="form-control"
            type="text"
            placeholder="Escribe el nuevo departamento"
          />
        </div>
        <div>
          <button type="submit" className="m-auto btn btn-primary">
            Crear nuevo departameno
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormDepartamento;
