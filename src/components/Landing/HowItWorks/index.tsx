import React from "react";

import "./index.scss";

import search from "../../../images/home/step-search.svg";
import connect from "../../../images/home/step-connect.svg";
import review from "../../../images/home/step-review.svg";

const worksteps = [
  {
    image: search,
    title: "SEARCH",
    counter: "1",
    description:
      "Type in the skills you need and our platform does the rest. Look through listed service firms in your area and create your shortlist.",
  },
  {
    image: connect,
    title: "CONNECT",
    counter: "2",
    description:
      "Hindsyght makes service firms’ contact information available so you can reach out to those on your shortlist. Manage your preferred service firms on the platform by creating an account with us.",
  },
  {
    image: review,
    title: "REVIEW",
    counter: "3",
    description:
      "After you’ve worked with your selected service firm, add a review on Hindsyght. Help out your peers by describing your firsthand experience.",
  },
];

function HowItWorks() {
  return (
    <section className="container how_it_works" id="how-it-works">
      <h3>How it works</h3>
      <p className="subtitle">We're changing the way you search for IT consulting services</p>
      <p className="subtitle-desc">
        Until recently, the process of selecting IT consulting firms was difficult and risky. Hindsyght lets you browse
        through local IT companies that have your preferred proficiency and read throught authentic review, helping you
        make the right decision faster.
      </p>
      <div className="row">
        {worksteps.map((workstep: any, index: any) => (
          <div className="col-md-4" key={index}>
            <HowItWorkBlock
              image={workstep.image}
              title={workstep.title}
              counter={workstep.counter}
              description={workstep.description}
            />
          </div>
        ))}
        <div className="col-md-4"></div>
      </div>
    </section>
  );
}

function HowItWorkBlock({image, title, counter, description}: any) {
  return (
    <div className="step-card">
      <div className="step-icon">
        <div>
          <img src={image} />
        </div>
        <div className="step-circle">{counter}</div>
      </div>
      <p className="title">{title}</p>
      <p className="text-normal">{description}</p>
    </div>
  );
}

export default HowItWorks;
