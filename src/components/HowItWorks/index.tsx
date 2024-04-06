import React from 'react';
import {
 Container, Col, Row,
} from 'react-bootstrap';

import './index.scss';
import search from '../../images/search.svg';
import connect from '../../images/connect.svg';
import review from '../../images/review.svg';

export default function HowItWorks() {
  return (
    <Container className="hs-how-it-works">
      <Row>
        <Col sm="12" lg="6">
          <h1 className="text-primary">How it Works</h1>

          <h3 className="text-dark">
            We are changing the way you search for IT consulting services.
          </h3>

          <p>
            Until recently, the process of selecting IT consulting firms was
            difficult and risky. Hindsyght lets you browse through local IT
            companies that have your preferred proficiency and read through
            authentic review, helping you make the right decision faster.
          </p>
        </Col>
        <Col sm="12" lg="6">
          <div className="steps">
            <div className="bg-primary d-flex align-items-center justify-content-center image-wrapper">
              <img src={search} alt="" srcSet="" />
            </div>
            <div>
              <h3>Search</h3>
              <p>
              Type in the service you need into the search bar and our platform
              does the rest. You will get a list of IT consulting companies in
              your area. Using Hindsyght would drastically reduce the time it
              takes for you to create a shortlist of relevant companies.
              </p>
            </div>
          </div>
          <div className="steps">
            <div className="bg-primary d-flex align-items-center justify-content-center image-wrapper">
              <img src={connect} alt="" srcSet="" />
            </div>
            <div>
              <h3>Connect</h3>
              <p>
              Get in touch with the IT consulting companies on your shortlist.
              Hindsyght has their contact details readily available. You can
              manage your list of preferred IT companies on the platform by
              creating an account with us.
              </p>
            </div>
          </div>
          <div className="steps">
            <div className="bg-primary d-flex align-items-center justify-content-center image-wrapper">
              <img src={review} alt="" srcSet="" />
            </div>
            <div>
              <h3>Review</h3>
              <p>
              After you have used the IT consulting services of your selected
              firm, you can add in a review on Hindsyght. Give your peers a
              helping hand by making them aware of your first-hand experience
              when working with IT consulting firms. Your reviews will
              definitely be appreciated!
              </p>

            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
