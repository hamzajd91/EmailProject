import React from "react";
import proficiency from "../../../../images/proficiency.png";
import OtherSearchable from "../Components/OtherSearchable";

function ProficiencyHeader(props: any) {
  const {keyword, otherkeywords} = props;
  return (
    <React.Fragment>
      <div className="proficiency_statics_top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 mt-5 mb-3">
              <h1>Browse our list to find the best local IT services firm specializing in {keyword} – Hindsyght</h1>
              <p className="text-white">
                Find a trusted {keyword} firm using Hindsyght - the leading B2B platform connecting small and
                medium-sized businesses to IT consulting companies. We make it easy for you to choose the best local IT
                services company to partner with
              </p>
            </div>
            <div className="col-md-5">
              <img src={proficiency} className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </div>

      <OtherSearchable otherkeywords={otherkeywords} />
    </React.Fragment>
  );
}

export default ProficiencyHeader;
