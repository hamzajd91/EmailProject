import React from "react";
import "./index.scss";

function InspiredBlock() {
  return (
    <React.Fragment>
      <div className="container inspired_Blocks">
        <h4>Our Hindsyght inspired us to revolutionize the way businesses and service firms work together</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="inspired_Block">
              <p className="title">Find your best fit fast</p>
              <p className="text-normal">
                Relying on service firms in your network and taking months to create a shortlist is a hassle. Connect
                with local service firms whose skills match your needs quicker than ever.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="inspired_Block">
              <p className="title">Stay within your budget</p>
              <p className="text-normal">
                Hindsyght provides you with service firms of all sizes who have stellar track records. Make your
                decision based off of authentic reviews and avoid spending money on someone else to redo the job.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="inspired_Block">
              <p className="title">Get high quality results</p>
              <p className="text-normal">
                Working with local, vetted service firms means you’re working with a team of experts. They have years of
                experience and deliver successful work on time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default InspiredBlock;
