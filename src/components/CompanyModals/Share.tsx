import React, { useState, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import './modals.scss';

export default function Share(props: any) {
  const {
    profileUrl, profile, share, show, closeShareModal,
  } = props;
  const [tags, setTags] = useState<any>([]);
  const [copyLink, setCopyLink] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [emailError, setEmailErrors] = useState('');
  const shareLink = useRef<HTMLInputElement>(null);
  const notes = useRef<HTMLTextAreaElement>(null);

  const handleCopyLink = () => {
    if (shareLink.current) {
      shareLink.current.select();
      document.execCommand('copy');
      setCopyLink(true);
    }
  };

  const handleShare = (e: any) => {
    e.preventDefault();
    if (tags.length === 0) {
      setInvalid(true);
      setEmailErrors('Please Enter at least one email');
    }
    const body = {
      notes: '',
      emails: [],
      companyId: profile.id,
    };
    if (tags.length > 0) {
      if (notes.current) {
        body.notes = notes.current.value;
      }
      body.emails = tags;
      share(body);
      setShareSuccess(true);
    }
  };

  const addTags = (event: any) => {
    if (
      (event.key === 'Enter' || event.keyCode === 9 || event.keyCode === 188)
      && event.target.value !== ''
    ) {
      const emailReg = new RegExp(/\S+@\S+\.\S+/);

      if (!emailReg.test(event.target.value.trim())) {
        setInvalid(true);
        setEmailErrors('Invalid Email');
        return false;
      }

      setInvalid(false);
      setTags([...tags, event.target.value]);
      // eslint-disable-next-line no-param-reassign
      event.target.value = '';
    }
    return true;
  };

  // const socialWindow = (url: string) => {
  //   // eslint-disable-next-line no-restricted-globals
  //   const left = (screen.width - 570) / 2;
  //   // eslint-disable-next-line no-restricted-globals
  //   const top = (screen.height - 570) / 2;
  //   const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${
  //     top
  //     },left=${
  //     left}`;
  //   window.open(url, 'NewWindow', params);
  // };

  // const setShareLink = () => {
  //   const pageUrl = encodeURIComponent(profileUrl);
  //   const url = `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}`;
  //   socialWindow(url);
  // };

  const removeTags = (index: any) => {
    setTags([...tags.filter((tag: any) => tags.indexOf(tag) !== index)]);
  };

  return (
    <Modal
      className="custom-modal"
      show={show}
      onHide={closeShareModal}
    >
      <Modal.Header closeButton className="custom-modal-header">
        <h4>Share Company</h4>
      </Modal.Header>
      <Modal.Body className="custom-modal-body">
        <Form.Group className="claim-company-form">
          <Form.Group controlId="sharingLink">
            <Form.Label>Sharing Link</Form.Label>
            <input
              id="share-link"
              ref={shareLink}
              className="form-control"
              type="text"
              required
              defaultValue={profileUrl}
            />
            <br />
            <div className="share-buttons">
              {/* <button
                type="button"
                style={{ padding: '12px' }}
                onClick={setShareLink}

                className="reclaim_popover_btn linkedIn-share"
              >
                <img
                  src={Linkedin}
                  style={{ width: '20px' }}
                  alt=""
                  srcSet=""
                />
                {' '}
                <span className="share-span">SHARE</span>
              </button> */}
              {copyLink ? (
                <button type="button" className="copied ">
                  <FontAwesomeIcon icon={faCheckCircle} />
                  {' '}
                  {' '}
Linke Copied

                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="reclaim_popover_btn copy-link"
                >
                  COPY LINK
                </button>
              )}
            </div>
          </Form.Group>
          <br />
          <br />
          <p className="share-or">
            <span>OR</span>
          </p>
          <br />
          <Form.Group controlId="recipientEmailAddresses">
            <Form.Label>Recipient Email Addresses</Form.Label>
            <div className="tags-input">
              {tags.map((tag: any, index: any) => (
                <li
                  className=" badge badge-primary badge-pill tags"
                  key={index.toString()}
                >
                  <span>
                    {tag}
                    {' '}
                    <span role="button" tabIndex={0} onClick={() => removeTags(index)} className="remove">
                      &times;
                    </span>
                  </span>
                </li>
              ))}
              <input
                onKeyDown={event => addTags(event)}
                className="form-control"
                type="email"
              />
              <small className="text-muted form-text">Please hit “Enter” after each email address entry.</small>
              <br />
              <span
                className={`${invalid ? 'is-invalid' : 'valid'}`}
                id="emailError"
              >
                {emailError}
              </span>
            </div>
          </Form.Group>
          <Form.Group>
            <label htmlFor="optionalNote" className="reason-formlabel">
              Add a Note(Optional)
            </label>
            <textarea
              style={{ width: '100%' }}
              name="optionalNote"
              rows={7}
              ref={notes}
              maxLength={500}
              className="reason-textarea"
            />
          </Form.Group>
          <span style={{ float: 'right' }} className="textarea-counter">
            0/500
          </span>
          <br />
          {shareSuccess ? (
            <div>
              <span className="success-share">
                <FontAwesomeIcon icon={faCheckCircle} />
                {' '}
Shared
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleShare}
              style={{ float: 'right' }}
              className="reclaim_popover_btn report-popover-btn share"
            >
              SHARE
            </button>
          )}
        </Form.Group>
      </Modal.Body>
    </Modal>
  );
}
