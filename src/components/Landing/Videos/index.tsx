import React from "react";
import "./inedx.scss";
import {Player} from "video-react";

function Videos() {
  return (
    <React.Fragment>
      <div className="videos">
        {/* <div className="container"> */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <Player
              fluid={false}
              width="100%"
              height={250}
              playsInline
              src={`${process.env.REACT_APP_S3_BUCKET}/videos/tag-and-thank-your-it-hero.mov`}
            />
            <h3>Tag and thank your IT hero</h3>
            <p className="mt-3 mb-0">
              Hindsyght would like to take a moment to thank our essential IT professionals who keep our world connected
              during the pandemic. Join us. Comment and tag your IT hero to say thank you.
            </p>
          </div>
          <div className="col-md-6 mb-3">
            <Player
              width="100%"
              fluid={false}
              height={250}
              playsInline
              src={`${process.env.REACT_APP_S3_BUCKET}/videos/thank-it-hero-for-communication-support.mov`}
            />
            <h3>Thank IT hero for communication support</h3>
            <p className="mt-3 mb-0">
              In the middle of the pandemic, IT has a crucial role in communication. Hear from an IT hero on how she
              supported her team during the pandemic. Come, join us to thank an IT hero!
            </p>
          </div>
        </div>
        {/* </div> */}
      </div>
    </React.Fragment>
  );
}

export default Videos;
