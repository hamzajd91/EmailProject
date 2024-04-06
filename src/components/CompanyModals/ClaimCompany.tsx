import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { Form } from "react-bootstrap";
import "./modals.scss";
import { Link } from "react-router-dom";

export default function ClaimCompany(props: any) {
  const { user, profile, claim, show, closeClaimModal } = props;
  const [domainError, setDomainError] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  const [userEmail, setUserEmail] = useState(user.email);
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const claimCompany = (e: any) => {
    e.preventDefault();
    const body = {
      companyId: profile.id,
      claimName: "",
      claimEmail: "",
      userId: user.id,
    };


    if (email.current) {
      const index = email.current.value.indexOf("@");
      const domain = email.current.value.substr(index + 1);
      setUserEmail(email.current.value);
      const web = profile.website.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];
      // if (domain !== web) {
      //   setDomainError(true);
      //   return;
      // }

      console.log(domain);
      console.log(web);

      body.claimEmail = email.current.value;
    }

    if (name.current) {
      body.claimName = name.current.value;
    }
    setDomainError(false);
    claim(body);
    setClaimSuccess(true);
  };
  return (
    <Modal className="custom-modal" show={show} onHide={closeClaimModal}>
      <Modal.Header closeButton className="custom-modal-header">
        <h4>Claim Company</h4>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form onSubmit={claimCompany} className="claim-company-form">
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
            <span className={`${domainError ? "domain-msg-error text-muted" : "text-muted"}`}>
              * You email must match your company domain.
            </span>
          </div>

          <p>
            By continuing, you agree you have the authority to claim this account on behalf of this firm. You agree to
            Hindsyght’s
            <Link rel="noopener noreferrer" target="_blank" to="/terms">
              Terms of Use
            </Link>
            and
            <Link rel="noopener noreferrer" target="_blank" to="/privacyPolicy">
              Privacy Policy
            </Link>
            .
            <br />
            <br />
            You also understand that Hindsyght may send marketing emails regarding Hindsyght products, services, and
            events. You can unsubscribe at any time.
          </p>
          <button
            type="submit"
            className={`${claimSuccess ? "success reclaim_popover_btn submit-claim-btn" : "reclaim_popover_btn submit-claim-btn"
              } `}
          >
            SUBMIT CLAIM
          </button>
          <div className={`${claimSuccess ? "success" : "not-success"}`}>
            <FontAwesomeIcon icon={faCheckCircle} />
            Great! A verification email has been sent to <br />
            <span id="email-span">{userEmail}</span>
            !
            <br />
            If not received, please check your SPAM folder.
          </div>
          <p className="help-message">
            Need Help?
            <Link rel="noopener noreferrer" target="_blank" to="/contact">
              Contact Us
            </Link>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
