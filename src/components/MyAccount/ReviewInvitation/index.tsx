import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import "./index.scss";
import {ApplicationState} from "../../../store";
import review_invitation from "../../../images/review_invitation.png";
import {Helmet} from "react-helmet";

class ReviewInvitation extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const {companyId} = this.props.match.params;

    return (
      <>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Review Invitations</title>
          <meta name="title" content={`Review Invitations`} />
        </Helmet>
        <div className="card_box">
          <h4 className="mb-5">
            <b>Review Invitations</b>
          </h4>
          <div className="row justify-content-center">
            <div className="col-md-5 mb-3 text-center">
              <img src={review_invitation} className="img-fluid" />
            </div>
            <div className="col-md-7 mb-3">
              <h5 className="mb-3">Let's invite your customers to write a review</h5>
              <p>
                Get reviews from your customers so you can promote your company. Send review invitation to your
                customers by clicking on the below button.
              </p>

              <Link className="btn btn-primary m-2" to={`/user/reviews/${companyId}/invitation/send`}>
                Send Invitation
              </Link>
              <Link className="btn btn-primary m-2" to="/user/reviews/invitation/history">
                Invitation History
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ReviewInvitation);
