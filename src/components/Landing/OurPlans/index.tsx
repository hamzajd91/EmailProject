import React from "react";
import {FreePlans, BasicPlans, PlusPlans} from "../../AllPlans";
import "./index.scss";

function OurPlans() {
  return (
    <section className="our-plans">
      <div className="section-header">
        <div className="container">
          <h3 className="section-title">Our Plans</h3>
          <div className="subtitle">
            We offer different ways to manage your digital storefront. There are 3 different subscriptions that you can
            select, each with different features available to you. Please see the details for the subscription below.
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3 col-md-6">
            <FreePlans link={`/subscription2/free`} />
          </div>

          <div className="col-lg-4 mb-3 col-md-6">
            <BasicPlans link={`/subscription2/basic`} />
          </div>

          <div className="col-lg-4 mb-3 col-md-6">
            <PlusPlans link={`/subscription2/premium`} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurPlans;
