import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import './modals.scss';

export default function Report(props: any) {
    const { show, closeReportModal } = props;
    const [formgroupFocus, setFormgroupFocus] = useState(false);
    const handleFormgroupFocus = () => setFormgroupFocus(!formgroupFocus);

    return (
      <Modal className="custom-modal" show={show} onHide={closeReportModal}>
        <Modal.Header closeButton className="custom-modal-header">
          <h4>
                    Report Review
          </h4>
        </Modal.Header>
        <Modal.Body className="custom-modal-body">
          <p>
                    Please refer to our
            <a href="#">General Guidelines</a>
            {' '}
and
            <a target="_blank" href="/terms">Terms of Use</a>
            {' '}
and let us
                    know why you think the content you&apos;ve reported may violate these
                    guidelines.
          </p>
          <Form.Group className={formgroupFocus ? 'is-focused reason-formgroup' : 'reason-formgroup'} onFocus={handleFormgroupFocus} onBlur={handleFormgroupFocus} controlId="exampleForm.ControlTextarea1">
            <Form.Label className="reason-formlabel">Reason for Report</Form.Label>
            <Form.Control autoFocus as="textarea" rows={5} maxLength={500} className="reason-textarea" />
            <button type="button" className="reclaim_popover_btn report-popover-btn">
                        REPORT
            </button>
          </Form.Group>
        </Modal.Body>
      </Modal>
    );
}
