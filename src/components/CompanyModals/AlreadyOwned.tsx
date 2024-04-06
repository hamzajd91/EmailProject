import React from "react";
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";
import "./modals.scss";

export default function AlreadyOwned(props: any) {
  const {show, closeAlredyOwnedModal} = props;
  return (
    <Modal className="custom-modal" show={show} onHide={closeAlredyOwnedModal}>
      <Modal.Header closeButton className="custom-modal-header"></Modal.Header>
      <Modal.Body className="custom-modal-body">
        <h4>Already Owned</h4>
        <p>You already owned this company!</p>
        <p className="help-message">
          Need Help?
          <Link to="/contact"></Link>
        </p>
      </Modal.Body>
    </Modal>
  );
}
