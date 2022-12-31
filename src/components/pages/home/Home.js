import { Fragment } from "react";
import { Link } from "react-router-dom";
import tablas from "../../../App.css";

function Home() {
  return (
    <div className="d-flex justify-content-evenly flex-wrap m-1" style={{alignContent: "stretch"}}>
      <div className="card text-center" style={{ width: "18rem" }}>
        <Link to="/despacho"><i className="bi bi-ev-station" style={{ fontSize: "72pt" }}></i></Link>
        <div className="card-body">
          <h5>Despacho</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width: "18rem" }}>
        <Link to="/"><i class="bi bi-tools" style={{ fontSize: "72pt" }}></i></Link>
        <div className="card-body">
          <h5>Mantenimiento</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width: "18rem" }}>
        <Link tp="/"><i class="bi bi-box2" style={{ fontSize: "72pt" }}></i></Link>
        <div className="card-body">
          <h5>Almacen</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width: "18rem" }} to="/calidad">
        <Link to="/calidad"><i class="bi bi-patch-check" style={{ fontSize: "72pt" }}></i></Link>
        <div className="card-body">
          <h5>Calidad</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width:"18rem" }}>
        <Link to="/"><i class="bi bi-people" style={{fontSize:"72pt"}}></i></Link>
        <div className="card-body">
          <h5>Recursos Humanos</h5>
        </div>
      </div>

      <div className="card text-center shadow-sm" style={{ width: "18rem" }}>
        <Link to="/"><i class="bi bi-card-checklist" style={{fontSize:"72pt"}}></i></Link>
        <div className="card-body">
          <h5>Administrativo</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width: "18rem" }}>
        <Link to="/"><i class="bi bi-shield-lock" style={{ fontSize: "72pt" }}></i></Link>
        <div className="card-body">
          <h5>Seguridad</h5>
        </div>
      </div>

      <div className="card text-center" style={{ width: "18rem" }}>
        <Link to="/"><i class="bi bi-file-earmark-pdf" style={{fontSize:"72pt"}}></i></Link>
        <div className="card-body">
          <h5>Documentos SGC Don Lalo</h5>
        </div>
      </div>

    </div>
  );
}
export default Home;
