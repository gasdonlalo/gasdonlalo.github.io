import { Alert } from "react-bootstrap";
function AlertError({ show, setAlertError, text }) {
  if (show) {
    return (
      <div>
        <Alert
          show={show}
          variant="danger"
          dismissible
          onClose={() => setAlertError(false)}
        >
          {!text ? "¡Ups!, algo salio mal" : text}
        </Alert>
      </div>
    );
  }
}

export default AlertError;
