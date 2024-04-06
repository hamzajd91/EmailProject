import React from "react";
import {Link} from "react-router-dom";

function StepFour(props: any) {
  return (
    <React.Fragment>
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
          Ready to find an {props.keyword} firm that will help you reach your goals? 
          <Link to="/signin">Log in and browse thousands of IT consulting firms on Hindsyght today.</Link>
        </p>
      </ul>
    </React.Fragment>
  );
}

export default StepFour;
