import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="d-flex flex-column align-items-center">
          <i
            className="fa-solid fa-face-dizzy text-danger"
            style={{ fontSize: "100px" }}
          />
          <h1 className="fst-italic">No deberias estar aqui...</h1>
          <Link type="button" className="btn btn-outline-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Notfound;
