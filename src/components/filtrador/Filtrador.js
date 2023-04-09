function Filtrador({ datosFiltrar, guardarFiltro, banderas }) {
  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, banderas);
    const search = datosFiltrar.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno } = el;
      return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
    });
    guardarFiltro(search);
  };
  return (
    <div className="pt-0 mb-3">
      <div className="row">
        <div className="offset-md-6 col-md-6">
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              name="buscador"
              onChange={filterEmp}
              placeholder="Buscar un empleado..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
Filtrador.defaultProps = {
  banderas: "gi",
};

export default Filtrador;
