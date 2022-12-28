import { Link } from "react-router-dom";
import FormChecklist from "../../forms/FormChecklist";

function ChecklistBomba() {
  return (
    <div className="Main">
      <div>
        <Link className="link-primary" to="/despacho">
          Volver al despacho
        </Link>
        <h4 className="border-bottom">Checklist de bombas</h4>
        <FormChecklist />
      </div>
    </div>
  );
}
export default ChecklistBomba;
