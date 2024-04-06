import React, {Component} from "react";
import "./index.scss";
import appApi from "../../services/appApi";
import {Loader} from "../Loader";
import {FreePlans, BasicPlans, PlusPlans} from "../AllPlans";

class UpgradeSubscribe extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      company: {},
    };
  }

  async componentDidMount() {
    const companyResult = await appApi.get(`companies/${this.props.match.params.id}`);
    this.setState({
      company: companyResult.data.company,
      isLoading: false,
    });
  }

  render() {
    const {isLoading, company} = this.state;
    return (
      <React.Fragment>
        {isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <div className="container pt-5">
              <div className="page_title">
                <h1>Choose Subscription Type</h1>
                <h3>Please select the subscription type you would like for {company.name}.</h3>
              </div>
            </div>
            <div className="container pt-2">
              <div className="row justify-content-center">
                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  <FreePlans />
                </div>

                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  {company.subscriptionLevel == 2 ? (
                    <BasicPlans disabled="true" />
                  ) : (
                    <BasicPlans disabled="false" link={`/company/${company.id}/subscription/2/checkout`} />
                  )}
                </div>

                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  {company.subscriptionLevel == 3 ? (
                    <PlusPlans disabled="true" />
                  ) : (
                    <PlusPlans disabled="false" link={`/company/${company.id}/subscription/3/checkout`} />
                  )}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default UpgradeSubscribe;
