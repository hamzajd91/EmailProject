import React from "react";
import Section1 from "./Section1";
import Testimonials from "./Testimonials";
import Why from "./Why";
import HowItWorks from "./HowItWorks";
import VastNetwork from "./VastNetwork";
import InspiredBlock from "./InspiredBlock";
import PopularSearches from "./PopularSearches";
import Proficiencies from "./Proficiencies";
import GetStartedFooter from "./GetStartedFooter";
import {Helmet} from "react-helmet";

import Landing1 from "../../images/landing/landing_1.png";
import Landing2 from "../../images/landing/landing_2.png";
import Landing3 from "../../images/landing/landing_3.png";
import Landing4 from "../../images/landing/landing_4.png";
import PageBlogComponent from "../PageBlogComponent";
import "./index.scss";

function Profile() {
  return (
    <div className="hindsyght-landing">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          property="og:site_name"
          content="Hindsyght - The go-to platform for connecting IT services and solutions with businesses across the nation."
        />
        <meta property="og:url" content={window.location.href} />
        <meta
          name="description"
          content="Tackle your IT project head on with Hindsyght. The go-to platform for connecting IT services and solutions with businesses across the nation."
        />
      </Helmet>
      <Section1 />
      <div className="container landing_section">
        <div className="row">
          <div className="col-md-6">
            <div className="landing_block">
              <img src={Landing1} className="img-fluid" />
              <div className="l_icon">
                <img src={Landing2} />
              </div>
              <h3>Partnering with a service firm should be rewarding, not complicated</h3>
              <p className="mb-0">
                With Hindsyght, you can. "Imagine having a local network of trusted service firms at your fingertips.
                With Hindsyght, you do! Search for the best IT service firm based on skills and experience your company
                needs, then browse through real reviews, and find the right partner - in record timing."
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="landing_block">
              <img src={Landing3} className="img-fluid" />
              <div className="l_icon">
                <img src={Landing4} />
              </div>
              <h3>
                Our own hindsight inspired us to revolutionize the insight of businesses and service firms working
                together.
              </h3>
              <p>How do we do this?</p>
              <p>
                We’ve been through it, which is why we truly feel the pain of identifying and vetting the right IT firm
                to meet your business needs. Our dynamic search tools help pair you up with the right firm for YOU.
              </p>
              <p className="mb-0">
                When it comes to hiring the right IT service firm, Hindsyght’s purpose is to ensure you don’t wish for
                hindsight.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Testimonials />

      <Why />

      <HowItWorks />

      <VastNetwork />

      <InspiredBlock />

      <PopularSearches />

      <Proficiencies />

      <PageBlogComponent />

      <GetStartedFooter />

      {/* <Section1 />

      <div className="landing-content">
        <Testimonials />

        <hr className="hindsyght-divider" />

        <Why />

        <hr className="hindsyght-divider" />

        <VastNetwork />

        <hr className="hindsyght-divider" />

        <PopularSearches />

        <hr className="hindsyght-divider" />

        <OurPlans />

        <hr className="hindsyght-divider" />

        <Proficiencies />
        <GetStartedFooter />
      </div> */}
    </div>
  );
}

export default Profile;
