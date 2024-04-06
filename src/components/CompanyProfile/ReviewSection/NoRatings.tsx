import React from 'react';
import { Col } from 'react-bootstrap';
import Stars from './Stars';

export default function NoRatings() {
    return (
      <>
        <Col md={2}>
          <span>Value</span>
          <div>
            <Stars whole={0} half={0} empty={5} />
          </div>
        </Col>
        <Col md={2}>
          <span>Quality</span>
          <div>
            <Stars whole={0} half={0} empty={5} />
          </div>
        </Col>
        <Col md={2}>
          <span>Knowledge</span>
          <div>
            <Stars whole={0} half={0} empty={5} />
          </div>
        </Col>
        <Col md={2}>
          <span>Execution</span>
          <div>
            <Stars whole={0} half={0} empty={5} />
          </div>
        </Col>
        <Col md={2}>
          <span>Communication</span>
          <div>
            <Stars whole={0} half={0} empty={5} />
          </div>
        </Col>
      </>
    );
}
