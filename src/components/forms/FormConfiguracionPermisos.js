function FormConfiguracionPemisos() {
  return (
    <div className="main">
      <div className="container col-6">
        <label className="form-label">Ingresar empleado</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Nombre del empleado"
            aria-label="Username"
          ></input>
          <span class="input-group-text">ID </span>
          <input
            type="text"
            class="form-control"
            placeholder="ID del empleado"
            aria-label="Server"
          ></input>
        </div>
      </div>
      <div className="text-center text-primary">
        Seleccione los atributos que tendrá cada empleado
      </div>
      {/* Checksbox */}
      <div className="container">
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck1"
            ></input>
            <label class="form-check-label" for="defaultCheck1">
              Configuracion Horarios Despacho
            </label>
          </div>
        </div>
        {/* 2 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck2"
            ></input>
            <label class="form-check-label" for="defaultCheck2">
              Configuracion Usuarios
            </label>
          </div>
        </div>
        {/* 3 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck3"
            ></input>
            <label class="form-check-label" for="defaultCheck3">
              Configuracion Permisos
            </label>
          </div>
        </div>
        {/* 4 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck4"
            ></input>
            <label class="form-check-label" for="defaultCheck4">
              Configuracion Precios
            </label>
          </div>
        </div>
        {/* 5 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck5"
            ></input>
            <label class="form-check-label" for="defaultCheck5">
              Configuracion Estación
            </label>
          </div>
        </div>
        {/* 6 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck6"
            ></input>
            <label class="form-check-label" for="defaultCheck6">
              Configuracion Lecturas Iniciales
            </label>
          </div>
        </div>
        {/* 7 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck7"
            ></input>
            <label class="form-check-label" for="defaultCheck7">
              Configuracion Despachadores
            </label>
          </div>
        </div>
        {/* 8 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck8"
            ></input>
            <label class="form-check-label" for="defaultCheck8">
              Configuracion Turnos
            </label>
          </div>
        </div>
        {/* 9 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck9"
            ></input>
            <label class="form-check-label" for="defaultCheck9">
              Captura Liquidación
            </label>
          </div>
        </div>
        {/* 10 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck10"
            ></input>
            <label class="form-check-label" for="defaultCheck10">
              Cancelación Lquidadores
            </label>
          </div>
        </div>
        {/* 11 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck11"
            ></input>
            <label class="form-check-label" for="defaultCheck11">
              Reportes
            </label>
          </div>
        </div>
        {/* 12 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck12"
            ></input>
            <label class="form-check-label" for="defaultCheck12">
              Campo Impresion de Liquidación
            </label>
          </div>
        </div>
        {/* 13 */}
        <div className="d-flex mb-2">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="defaultCheck13"
            ></input>
            <label class="form-check-label" for="defaultCheck13">
              Campo Guardar
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormConfiguracionPemisos;
