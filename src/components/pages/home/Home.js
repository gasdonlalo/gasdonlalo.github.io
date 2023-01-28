import { Link } from "react-router-dom";
import { dep } from "../../Provider/auth";

function Home() {
  return (
    <div className="home">
      {dep(2) && (
        <div className="card text-center" style={{ width: "18rem" }}>
          <Link to="/despacho">
            <i className="bi bi-ev-station" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Despacho</h5>
          </div>
        </div>
      )}

      {dep(4) && (
        <div className="card text-center" style={{ width: "18rem" }}>
          <Link to="/mantenimiento">
            <i className="bi bi-tools" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Mantenimiento</h5>
          </div>
        </div>
      )}

      {dep(5) && (
        <div className="card text-center shadow-sm" style={{ width: "18rem" }}>
          <Link to="/almacen1">
            <i className="bi bi-box2" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Almacen</h5>
          </div>
        </div>
      )}

      {dep(6) && (
        <div
          className="card text-center"
          style={{ width: "18rem" }}
          to="/calidad"
        >
          <Link to="/calidad">
            <i className="bi bi-patch-check" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Calidad</h5>
          </div>
        </div>
      )}

      {dep(7) && (
        <div className="card text-center" style={{ width: "18rem" }}>
          <Link to="/recursos-humanos">
            <i className="bi bi-people" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Recursos Humanos</h5>
          </div>
        </div>
      )}

      {dep(8) && (
        <div className="card text-center shadow-sm" style={{ width: "18rem" }}>
          <Link to="/administrativo">
            <i
              className="bi bi-card-checklist"
              style={{ fontSize: "72pt" }}
            ></i>
          </Link>
          <div className="card-body">
            <h5>Administrativo</h5>
          </div>
        </div>
      )}

      {dep(9) && (
        <div className="card text-center" style={{ width: "18rem" }}>
          <Link to="/seguridad">
            <i className="bi bi-shield-lock" style={{ fontSize: "72pt" }}></i>
          </Link>
          <div className="card-body">
            <h5>Seguridad</h5>
          </div>
        </div>
      )}

      {dep(10) && (
        <div className="card text-center" style={{ width: "18rem" }}>
          <Link to="/documentos-sgc">
            <i
              className="bi bi-file-earmark-pdf"
              style={{ fontSize: "72pt" }}
            ></i>
          </Link>
          <div className="card-body">
            <h5>Documentos SGC Don Lalo</h5>
          </div>
        </div>
      )}
    </div>
  );
}
export default Home;
