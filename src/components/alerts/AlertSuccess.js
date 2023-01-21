import Alert from "react-bootstrap/Alert";

function AlertSuccess({ show }) {
  if (show) {
    return (
      <div>
        <Alert show={show} variant="success">
          Correcto
        </Alert>
      </div>
    );
  }
}

export default AlertSuccess;
