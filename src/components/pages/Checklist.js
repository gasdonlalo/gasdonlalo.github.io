import { Link } from "react-router-dom";
import FormChecklist from "../forms/FormChecklist";

function Checklist() {
  return (
    <div className="Main">
      <div className="m-4">
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4>Insertar Montos faltantes</h4>
        <FormChecklist />
      </div>
    </div>
  );
}
export default Checklist;
