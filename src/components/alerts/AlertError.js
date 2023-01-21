import { Alert } from "react-bootstrap";
function AlertError({ show, setAlertError }) {
  if (show) {
    return (
      <div>
        <Alert
          show={show}
          variant="danger"
          dismissible
          onClose={() => setAlertError(false)}
        >
          ¡Ups!, algo salio mal
        </Alert>
      </div>
    );
  }
}

export default AlertError;
