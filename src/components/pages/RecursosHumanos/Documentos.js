import { Link } from "react-router-dom";

function Documentos() {
  return (
    <div className="Main">
      <div>
        <Link className="Link-primary" to="/recursos-humanos">Volver a recursos humanos</Link>
      </div>
        <h4 className="border-bottom">Documentos de trabajo</h4>
    </div>
  )
}

export default Documentos;