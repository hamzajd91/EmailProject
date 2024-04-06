import React from "react";
import checkImage from "../../images/services/check.png";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { Modal, Button } from 'react-bootstrap';

export function FreePlans(props: any) {
  const { link, disabled } = props;
  const [show, setShow] = React.useState(false)
  const handleShow = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }
  const history = useNavigate();
  return (
    <>
      <div className="single-plan">
        <div className="plan-top">
          <div className="title">Free subscription</div>
          <div className="description">For smaller businesses or solo professionals, get access to all the core features you need to get started.</div>
        </div>
        <div className="plan-price">
          <span>
            <span>$0</span>
            <br />
            Month
          </span>
        </div>
        <ul className="plans-features mb-3">
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span><strong>Up to 2 IT specialties listed</strong></span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Access to Account Management dashboard</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Update contact info</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Add a custom banner</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Add a company logo</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Receive reviews</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Co-Manage/Delegate (is this still accurate?)</span>
          </li>
        </ul>

        {disabled === "true" && (
          <button type="button" className="select-btn" disabled>
            <b className="text-white">Current Subscription</b>
          </button>
        )}

        {link && (
          <div className="text-center mt-auto">
            <button type="button" className="select-btn" onClick={(e) => {
              if (props.level > 1) {
                handleShow()
              } else {
                history.push(link)
              }
            }}>
              Select
            </button>
          </div>
        )}
      </div>
      <ShowModel
        show={show}
        handleClose={handleClose}
        link={link}
        text={"You are downgrading your subscription from Basic or Plus to Free"}
      />
    </>
  );
}




export function BasicPlans(props: any) {
  const { link } = props;
  const [show, setShow] = React.useState(false)
  const handleShow = () => {
    setShow(false)
  }
  const handleClose = () => {
    setShow(false)
  }
  const history = useNavigate();
  return (
    <>
      <div className="single-plan">
        <div className="plan-top">
          <div className="title">Basic subscription</div>
          <div className="description">
            Unlock more tools that help you get your business in front of the right customers.
          </div>
        </div>
        <div className="plan-price">
          <span>
            <span>$20</span>
            <br />
            Month
          </span>
        </div>
        <ul className="plans-features mb-3">
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>
              <strong>Up to 5 specialties</strong>
            </span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Improved search visibility</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Add multiple branches</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Priority of ads display</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Respond to reviews</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>1 Sponsored post (blog post, case study, white paper, or other promotion) on Hindsyght’s website and social media platforms</span>
          </li>
          {/* <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Improved Search Visibility</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>
              1 Free Post(Article, Case study, White Paper, Blogs, Promotion) on Hindsyght website and Social Media
              Platforms
            </span>
          </li> */}
        </ul>

        {props.disabled === "true" && (
          <div className="text-center mt-auto">
            <button type="button" className="select-btn" disabled>
              <b className="text-white">Current Subscription</b>
            </button>
          </div>
        )}
        {link && (
          <div className="text-center mt-auto">
            <button type="button" className="select-btn" onClick={(e) => {
              if (props.level > 2) {
                handleShow()
              } else {
                history.push(link)
              }
            }}>
              Select

            </button>
          </div>
        )}
      </div>

      <ShowModel
        show={show}
        handleClose={handleClose}
        link={link}
        text={"You are downgrading your subscription from Plus to Basic"}
      />
    </>
  );
}

export const ShowModel = (data: any) => {
  const history = useNavigate();
  return (<Modal show={data.show} onHide={data.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Subscription</Modal.Title>
    </Modal.Header>
    <Modal.Body>{data.text}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={data.handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={() => {
        history.push(data.link)
        // <Link to={data.link} className="hindsyght-btn-primary"/>
        data.handleClose()
      }}>
        Yes
      </Button>
    </Modal.Footer>
  </Modal>)
}

export function PlusPlans(props: any) {
  const { link } = props;
  return (
    <React.Fragment>
      <div className="single-plan">
        <div className="plan-top">
          <div className="title">Plus subscription</div>
          <div className="description">
            For larger firms, get access to additional Hindsyght reporting, insights, customized marketing assistance, and more.
          </div>
        </div>
        <div className="plan-price">
          <span>
            <span>$75</span>
            <br />
            Month
          </span>
        </div>
        <ul className="plans-features mb-3">
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>
              <strong>Up to 25 specialties</strong>
            </span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Optimal search visibility</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>Leads & Prospect Notifications</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>New Review Notifications</span>
          </li>
          <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>3 Sponsored posts (blog post, case study, white paper, or other promotion) on Hindsyght’s website and social media platforms</span>
          </li>
          {/* <li>
            <img src={checkImage} alt="check icon" srcSet="" />
            <span>
              3 Free Post(Article, Case study, White Paper, Blogs, Promotion) on Hindsyght website and Social Media
              Platforms
            </span>
          </li> */}
        </ul>
        {props.disabled === "true" && (
          <div className="text-center mt-auto">
            <button type="button" className="select-btn" disabled>
              <b className="text-white">Current Subscription</b>
            </button>
          </div>
        )}
        {link && (
          <div className="text-center mt-auto">
            <button type="button" className="select-btn">
              <Link to={link} className="hindsyght-btn-primary">
                Select
              </Link>
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
