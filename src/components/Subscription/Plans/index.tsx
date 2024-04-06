import React, { useState } from "react";
import checkImage from "../../../images/services/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
const itemsLimit = 8;

export default function Plans({
  items,
  plan,
  title,
  price,
  description,
  titlePrice,
}: any) {
  const [showMore, setShowMore] = useState(true);
  let all_items = [];
  if (showMore && items.length > itemsLimit) {
    all_items = items.slice(0, itemsLimit);
  } else {
    all_items = items;
  }
  return (
    <React.Fragment>
      <div className="col-lg-4 mb-3 col-md-6">
        <div className="single-plan">
          <div className="plan-top">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
          </div>
          <div className="plan-price">
            <span>
              <span>{price}</span>
              <br />
              Month
            </span>
          </div>
          <ul className="plans-features mb-3">
            {all_items.map((plan_item: any) => (
              <li
                key={plan_item.name}
                style={{ opacity: plan_item.available ? "1" : "0.5" }}
              >
                <img src={checkImage} alt="check icon" srcSet="" />
                <span>{plan_item.name}</span>
              </li>
            ))}
          </ul>
          {/* faAngleDoubleUp */}
          <button
            className="show_more_hide"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <React.Fragment>
                <FontAwesomeIcon icon={faAngleDoubleDown} />{" "}
                <span>Show More</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon icon={faAngleDoubleUp} />{" "}
                <span>Show Less</span>
              </React.Fragment>
            )}
          </button>
          <div className="text-center mt-auto">
            <button type="button" className="select-btn">
              <a
                href={`${process.env.REACT_APP_CLIENT_HOST}/subscription2/${plan}`}
                className="hindsyght-btn-primary"
              >
                Select
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* <div className="plan"> */}
      {/* <h3>{title}</h3>
  
        <p className="price-description">
          <span className="price">{price}</span>
          {plan === 'free' ? (
            'Completely free'
          ) : (
            <div>
              /per month
              {' '}
              <small>(BILLED ANNUALLY)</small>
            </div>
          )}
        </p> */}

      {/* <p className="price-description-2">{description}</p> */}

      {/* <button type="button" className="btn-get-start"> */}
      {/* <Link to="/">Get Started</Link> */}
      {/* <a
            href={`${process.env.REACT_APP_NODE_CLIENT_HOST}/subscription2/${plan}`}
          >
            Get Started
          </a> */}
      {/* `${process.env.REACT_APP_NODE_CLIENT_HOST}/company/profile/${match.params.id}/writeReview`; */}
      {/* </button> */}

      {/* <ul>
          {items.map((item: any) => (
            <li key={item.name} style={{ opacity: item.available ? '1' : '0.5' }}>
              {item.name}
              <svg
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 1L6 12L1 7"
                  stroke="#00293D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          ))}
        </ul> */}
      {/* </div> */}
    </React.Fragment>
  );
}
