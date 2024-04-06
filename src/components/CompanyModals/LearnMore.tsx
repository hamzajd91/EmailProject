import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modals.scss';

export default function LearnMore(props: any) {
    const { show, closeLearnMoreModal } = props;
    return (
      <Modal className="custom-modal" show={show} onHide={closeLearnMoreModal}>
        <Modal.Header closeButton className="custom-modal-header">
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <h4>
                    How to Reclaim Company?
          </h4>
          <p>
                    If you want to re-claim this company, click on the RECLAIM button,
                    fill out the information required and we will send the owner an email
                    requesting an approval for this change.
          </p>
          <p className="help-message">
                    Need Help?
            <a href={`${process.env.REACT_APP_CLIENT_HOST}/contact`}>
                        Contact Us
            </a>
          </p>
        </Modal.Body>
      </Modal>
    );
}
