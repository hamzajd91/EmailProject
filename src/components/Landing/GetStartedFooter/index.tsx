import React from "react";
import {Link} from "react-router-dom";
import banner_image from "../../../images/home/banner-image.svg";

import "./index.scss";

function GetStartedFooter() {
  return (
    <React.Fragment>
      <div className="get_started_footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <img src={banner_image} className="img-fluid" />
            </div>
            <div className="col-md-6">
              <div className="mt-3 mb-3">
                <h6>Finding the right fit for your project should be easy</h6>
                <Link className="get_started_button" to="/search/writeReview">
                  GET STARTED
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GetStartedFooter;
