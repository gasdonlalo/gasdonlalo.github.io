function Ventana({ cerrar }) {
  return (
    <div
      className="ventana"
      style={{ zIndex: 1, position: "absolute", overflowY: "scroll" }}
    >
      <div className="d-flex border-bottom">
        <i
          className="fa-solid fa-xmark text-danger"
          type="button"
          onClick={cerrar}
          style={{ fontSize: "24pt" }}
        />
      </div>
    </div>
  );
}

export default Ventana;
