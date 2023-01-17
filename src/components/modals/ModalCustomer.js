import { Modal } from "react-bootstrap";
import React from "react";

const ModalCustomer = ({ show, close, title, children }) => {
  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

// ModalCustomer.defaultProps = {
//   title: "Modal personalizable",
// };

export default ModalCustomer;
