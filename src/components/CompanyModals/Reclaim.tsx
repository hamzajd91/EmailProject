import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import './modals.scss';
import { Form } from 'react-bootstrap';

export default function Reclaim(props: any) {
  const [domainError, setDomainError] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const {
    owner, profile, user, reclaim, show, closeReclaimModal,
  } = props;

  const reclaimCompany = (e: any) => {
    e.preventDefault();
    const body = {
      companyId: profile.id,
      claimName: '',
      claimEmail: '',
      userId: user.id,
    };

    console.log(email);


    if (email.current) {
      const index = email.current.value.indexOf('@');
      const domain = email.current.value.substr(index + 1);
      const web = profile.website
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .split('/')[0];

      console.log(domain);
      console.log(web);

      // if (domain !== web) {
      //   setDomainError(true);
      //   return;
      // }
      body.claimEmail = email.current.value;
    }

    if (name.current) {
      body.claimName = name.current.value;
    }

    setDomainError(false);
    reclaim(body);
    setClaimSuccess(true);
  };

  return (
    <Modal
      className="custom-modal"
      show={show}
      onHide={closeReclaimModal}
    >
      <Modal.Header closeButton className="custom-modal-header">
        <h4>Reclaim Company</h4>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <p>
          The current Owner of
          {' '}
          {profile.name}
          {' '}
          is:
          {' '}
        </p>
        <p>{owner.name}</p>
        <p>
          If you want to re-claim this company, fill out the information below
          and we will send the owner an email requesting an approval for this
          change.
        </p>
        <Form onSubmit={(e: any) => {
          console.log(e);
          reclaimCompany(e)
        }} className="claim-company-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              className="form-control"
              ref={name}
              name="name"
              type="text"
              required
              defaultValue={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Work Email</label>
            <input
              className="form-control"
              ref={email}
              name="email"
              type="email"
              required
              defaultValue={`${user.email}`}
            />
            <br />
            {/* {console.log("data>>>>>>>", domainError)} */}
            <span
              className={`${domainError ? 'domain-msg-error text-muted' : 'text-muted'
                }`}
            >
              * You email must match your company domain.
            </span>
          </div>

          <p>
            By continuing, you agree you have the authority to claim this
            account on behalf of this firm. You agree to Hindsyght’s
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`${process.env.REACT_APP_CLIENT_HOST}/terms`}
            >
              Terms of Use
            </a>
            {' '}
            and
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`${process.env.REACT_APP_CLIENT_HOST}/privacyPolicy`}
            >
              Privacy Policy
            </a>
            .
            <br />
            <br />
            You also understand that Hindsyght may send marketing emails
            regarding Hindsyght products, services, and events. You can
            unsubscribe at any time.
          </p>
          <button
            type="submit"
            className={`${claimSuccess
              ? 'success reclaim_popover_btn submit-claim-btn'
              : 'reclaim_popover_btn submit-claim-btn'
              } `}
          >
            SUBMIT RECLAIM
          </button>
          <div className={`${claimSuccess ? 'success' : 'not-success'}`}>
            <FontAwesomeIcon icon={faCheckCircle} />
            Great! We’ve sent this submission for review.
          </div>
          <p className="help-message">
            Need Help?
            <a href={`${process.env.REACT_APP_CLIENT_HOST}/contact`}>
              Contact Us
            </a>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
