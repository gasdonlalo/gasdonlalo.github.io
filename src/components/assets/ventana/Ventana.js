function Ventana({ cerrar, children, title }) {
  return (
    <div
      className="ventana"
      style={{ zIndex: 1, position: "absolute", overflowY: "scroll" }}
    >
      {/* Boton cerrar */}
      <div className="d-flex flex-row border-bottom">
        <h5 style={{ width: "100%" }}>
          Configuracion inicial de bombas sssssssssssssssssssssssss
        </h5>
        <i
          className="fa-solid fa-xmark text-danger me-0"
          type="button"
          onClick={cerrar}
          style={{ fontSize: "24pt" }}
        />
      </div>
      {/* Contenido */}

      <div>{children}</div>
    </div>
  );
}
Ventana.defaultProps = {
  children: false,
};
export default Ventana;
