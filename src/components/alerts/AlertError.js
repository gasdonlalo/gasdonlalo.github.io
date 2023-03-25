import { useEffect } from "react";
import { Alert } from "react-bootstrap";
function AlertError({ show, setAlertError, text }) {
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setAlertError({ status: false, msg: "" });
      }, 1000);
    }
  }, [show, setAlertError]);
  if (show) {
    return (
      <div>
        <Alert
          show={show}
          variant="danger"
          dismissible
          onClose={() => setAlertError({ status: false, msg: "" })}
        >
          {!text ? "¡Ups!, algo salio mal" : text}
        </Alert>
      </div>
    );
  }
}

export default AlertError;
