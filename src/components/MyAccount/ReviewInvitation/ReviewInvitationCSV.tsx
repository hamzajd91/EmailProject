import React, {Component} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {setCustomerForReview, resetInformation} from "../../../store/ducks/review_invitaions/actions";
import {ApplicationState} from "../../../store";
import ImportCSV from "./Components/ImportCSV";
import SenderInformation from "./Components/SenderInformation";
import AllCustomersReview from "./Components/AllCustomersReview";
import appApi from "../../../services/appApi";
import {Loader} from "../../Loader";
import {Link} from "react-router-dom";
import alert from "../../../images/alert.png";
import "./index.scss";
import {Helmet} from "react-helmet";

class ReviewInvitationCSV extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      step: 1,
      company: {},
      companyOwner: false,
      isLoading: true,
    };
  }

  nextStep = () => {
    this.setState({
      step: this.state.step + 1,
    });
  };

  previousStep = () => {
    this.setState({
      step: this.state.step - 1,
    });
  };

  async componentDidMount() {
    const {companyId} = this.props.match.params;
    try {
      this.props.resetInformation();
      const response = await appApi.get(`/users/check/company/${companyId}`);
      this.setState({
        company: response.data.company,
        companyOwner: response.data.companyOwner,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        companyOwner: false,
        isLoading: false,
      });
    }
  }

  render() {
    const {step, company, isLoading, companyOwner} = this.state;

    return (
      <>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Import CSV</title>
          <meta name="title" content={`Import CSV`} />
        </Helmet>
        <div className="card_box">
          {isLoading ? (
            <Loader />
          ) : companyOwner ? (
            <>
              {step == 1 && <ImportCSV nextStep={this.nextStep} companyInfo={company} />}
              {step == 2 && (
                <SenderInformation previousStep={this.previousStep} nextStep={this.nextStep} companyInfo={company} />
              )}
              {step == 3 && (
                <AllCustomersReview previousStep={this.previousStep} {...this.props} companyInfo={company} />
              )}
            </>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-8 text-center">
                <img src={alert} alt="Error" width="120px" />
                <h5 className="mt-4">"Only company owner can invite users for review."</h5>
                <br />
                <Link className="btn btn-primary" to={`/user/companies`}>
                  Go to Company List
                </Link>
              </div>
            </div>
          )}
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
  setCustomerForReview: (params: any) => dispatch(setCustomerForReview(params)),
  resetInformation: () => dispatch(resetInformation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInvitationCSV);
