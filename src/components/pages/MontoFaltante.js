import { Link } from "react-router-dom";
import FormMontoFalt from "../../components/forms/FormMontoFalt";
function MontoFaltante() {
  return (
    <div className="ContentMain">
      <div className="Main">
        <div className="m-4">
          <Link className="link-primary" to="/despacho">
            Volver al despacho
          </Link>
          <h4>Insertar Montos faltantes</h4>
          <FormMontoFalt />
        </div>
      </div>
    </div>
  );
}
export default MontoFaltante;
