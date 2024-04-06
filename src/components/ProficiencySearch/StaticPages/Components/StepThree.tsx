import React from "react";
import hindsyght1 from "../../../../images/proficiency/hindsyght1.png";
import hindsyght2 from "../../../../images/proficiency/hindsyght2.png";

function StepThree() {
  return (
    <React.Fragment>
      <h5 className="proficiency_step">
        Step 3: Log in to Hindsyght.com and search for keywords that matched your business requirements and job
        description
      </h5>
      <p>
        You can always find the Search Box on any of Hindsyght pages. From the Search box, enter the keywords that you
        are looking for and click on the Search button.
      </p>
      <div className="text-center mt-4 mb-4">
        <img src={hindsyght1} className="img-fluid" />
      </div>
      <p>
        Note: Hindsyght search algorithm matches your keywords and the nearest IT companies based on your geolocation.
        On the search result page, the further you are going down the list, the farther distance of the IT companies
        from your geocode. If you would like to search for IT companies that are not corresponding to your geolocation,
        you can enter the city on the “Geolocation box,” and click on the Search button.
      </p>
      <p>Once the list is displayed, there are three functions can help to narrow down your search.</p>
      <p>
        <b>Filters:</b> by Distance, Review Rating, Proficiencies, and Industries
      </p>
      <p>
        <b>Sorting:</b> The default sorting is Most Relevant; others are Highest Rated, Most Reviewed, A-Z, and Z-A.
      </p>
      <p>Map of the IT company near me listing is provided for your convenience of knowing the firm’s proximity. </p>
      <div className="text-center mt-4 mb-4">
        <img src={hindsyght2} className="img-fluid" />
      </div>
    </React.Fragment>
  );
}

export default StepThree;
