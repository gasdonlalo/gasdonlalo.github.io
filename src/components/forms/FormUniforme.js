function FormUniforme({ handle, enviar }) {
  return (
    <div className="container">
      <form onSubmit={enviar}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Fecha de evaluacion
          </label>
          <input
            type="date"
            className="form-control"
            aria-describedby="emailHelp"
            name="fecha"
            onChange={handle}
            onDoubleClickCapture={handle}
          />
          <div className="mb-3 ">
            <label for="exampleInputEmail1" className="form-label">
              ID de empleado
            </label>
            <input
              type="number"
              min="0"
              className="form-control"
              aria-describedby="emailHelp"
              name="identrante"
              onChange={handle}
            />
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Gorra en buen estado
          </label>
          <select class="form-select" name="estacion" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="2">No cumple</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Camisa fajada
          </label>
          <select class="form-select" name="turno" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="Mañana">Cumple</option>
            <option value="Tarde">No cumple</option>
            <option value="Noche">Nocturno</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Cinturon negro
          </label>
          <select class="form-select" name="bomba" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="2">No cumple</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            Botas negras, boleadas
          </label>
          <select class="form-select" name="Isla" onChange={handle}>
            <option selected>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="0">No cumple</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            Pantalon sin roturas o descosturas
          </label>
          <select class="form-select" name="aceites" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="0">No cumple</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            Porta el gafete todo el tiempo
          </label>
          <select class="form-select" name="aceites" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="0">No cumple</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label">
            El gafete cuenta con correa
          </label>
          <select class="form-select" name="aceites" onChange={handle}>
            <option value={null}>Elige una opción</option>
            <option value="1">Cumple</option>
            <option value="0">No cumple</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
export default FormUniforme;
