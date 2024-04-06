import React from "react";
import {Link} from "react-router-dom";

function Common() {
  return (
    <React.Fragment>
      <h5 className="proficiency_step">Step 2: Compose a job description aligned to your business requirements</h5>
      <p>
        <b>Proficiencies:</b> What skill set would you need to address the above business requirements and fulfill your
        deliverables?
      </p>
      <p>
        <b>Estimated Project length:</b> At the minimum, your job post should indicate whether this is a short or a more
        intensive project.
      </p>
      <p>
        <b>Background :</b> What kind of company profile are you looking for? If you prefer an IT company that has
        experience with working with specific industries, software, or marketing channels, mention them here.
      </p>
      <p>
        <b>Budget :</b> Set a budget and note your preference for hourly rates vs. fixed-price contracts.
      </p>
      <h5 className="proficiency_step">
        Step 3: Log in to Hindsyght.com and search for keywords that matched your business requirements and job
        description
      </h5>
      <p>
        You can always find the Search Box on any of Hindsyght pages. From the Search box, enter the keywords that you
        are looking for and click on the Search button.
      </p>
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
      <h5 className="proficiency_step">Step 4: Contact and interview the IT companies</h5>
      <p>
        It’s suggested you line up at least 3 IT companies for your evaluation. Below are some tips on how to do this.
      </p>
      <ul>
        <li>
          Large vs. boutique ORACLE consulting firm - Large consulting agencies often compartmentalize their resources,
          limiting their experience. As a result, a resource may offer a technical yet myopic solution through no fault
          of his own. On the other hand, small but highly experienced firms is highly engaged with project delivery.
          Their size requires them to wear many hats (business analyst, developer, and project manager) so they are more
          in-tune with business requirements.
        </li>
        <li>
          Knowledge of ORACLE development technology – Technology is so broad to the point that no one knows it all. By
          now, you should have the list of major skill sets of what you are looking for. When it comes to technology, a
          great ORACLE consulting firm always keeps on learning new languages and cares about their craft - so you need
          to work with IT consulting firms that prize continuous learning in order to provide you sound advices.
        </li>
        <li>
          How other businesses have the experience with your selected IT Services Company – use Hindsyght authentic past
          Reviews from your peers to have the insight of how the IT companies have performed.
          <p>
            Note: Hindsyght is diligently working on obtaining the Reviews for your reference; however, there may be not
            enough reviews for your comparison. We cannot do it alone. Couple things you can do to help yourself and the
            community
          </p>
          <ul className="pl-3 mt-2 mb-2">
            <li>
              Contact Hindsyght Customer Support and ask for seeing more reviews of a particular IT company on your
              shortlist. Hindsyght will reach out to the community and the IT companies to provide you with additional
              reviews
            </li>
            <li>
              Provide your past reviews from other projects.  It will help the professional community to streamline
              connections and improve the overall hiring process for everybody. Your peers would thank you for your
              contribution.
            </li>
          </ul>
        </li>
        <p>
          Ready to find an ORACLE IT consulting firm that will help you reach your goals? 
          <Link to="/signin">Log in and browse thousands of IT consulting firms on Hindsyght today.</Link>
        </p>
      </ul>
    </React.Fragment>
  );
}

export default Common;
