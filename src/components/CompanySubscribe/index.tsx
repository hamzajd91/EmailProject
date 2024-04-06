import React, { Component } from "react";
import "./index.scss";
import appApi from "../../services/appApi";
import { Loader } from "../Loader";
import { FreePlans, BasicPlans, PlusPlans } from "../AllPlans";


class CompanySubscribe extends Component<any, any> {
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

    console.log(companyResult.data.company);
  }

  render() {
    const { isLoading, company } = this.state;
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
              <div className="row">
                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  {company.subscriptionLevel == 1 ? (
                    <FreePlans disabled="true" />
                  ) : (
                    <FreePlans disabled="false" link={`/company/${company.id}/subscription/1/checkout`} level={company.subscriptionLevel} />
                  )}
                </div>

                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  {company.subscriptionLevel == 2 ? (
                    <BasicPlans disabled="true" />
                  ) : (
                    <BasicPlans disabled="false" link={`/company/${company.id}/subscription/2/checkout`} level={company.subscriptionLevel} />
                  )}
                </div>

                <div className="col-lg-4 mt-4 mb-3 col-md-6">
                  {company.subscriptionLevel == 3 ? (
                    <PlusPlans disabled="true" />
                  ) : (
                    <PlusPlans disabled="false" link={`/company/${company.id}/subscription/3/checkout`} level={company.subscriptionLevel} />
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

export default CompanySubscribe;
