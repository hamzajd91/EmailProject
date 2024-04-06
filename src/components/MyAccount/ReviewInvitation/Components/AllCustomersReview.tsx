import React, {Component} from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../../store";
import appApi from "../../../../services/appApi";
import {resetInformation} from "../../../../store/ducks/review_invitaions/actions";
import {Dispatch} from "redux";
import $ from "jquery";
import "./../index.scss";

class AllCustomersReview extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  sendInvitaionToCustomer = async () => {
    const {review_invitaions} = this.props;

    const data = {
      ...review_invitaions,
      sender_information: {
        ...review_invitaions.sender_information,
        template: $("<textarea />")
          .html(review_invitaions.sender_information.template.toHTML())
          .text(),
      },
    };

    this.setState({
      isLoading: true,
    });

    await appApi.post("/users/send/review/invitations", data);
    this.setState({
      isLoading: false,
    });
    this.props.resetInformation();
    this.props.history.push("/user/reviews/invitation/history");
  };

  render() {
    const {review_invitaions} = this.props;
    const {isLoading} = this.state;

    return (
      <>
        <h4 className="mb-2">
          <b>Review and Send</b>
        </h4>
        <p className="mb-2">Please review the data and click send when ready.</p>

        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover table-bordered">
              <thead>
                <tr className="table-active">
                  <th>Email</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {review_invitaions.customers &&
                  review_invitaions.customers.map((customer: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{customer.email}</td>
                        <td>{customer.name}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <button className="btn btn-light" onClick={() => this.props.previousStep()}>
              Back
            </button>
            {isLoading ? (
              <button className="btn btn-primary ml-2" type="button" disabled>
                Sending...
              </button>
            ) : (
              <button className="btn btn-primary ml-2" onClick={() => this.sendInvitaionToCustomer()}>
                Send Invitations
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    review_invitaions: state.review_invitaions,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetInformation: () => dispatch(resetInformation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllCustomersReview);
