import React, {Component} from "react";
import "./index.scss";
import StorageService from "../../services/StorageService";

interface State {
  isLoading: boolean;
  message: string;
  yearlyPrice: number;
  snackbar: boolean;
  promotion: boolean;
  planId: string;
  companies: [];
}

class index extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      message: "",
      companies: [],
      promotion: false,
      snackbar: false,
      yearlyPrice: 0,
      planId: "",
    };
  }

  async componentDidMount() {
    const companies = StorageService.getCompanies();
    this.setState({
      companies: companies,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col mt-5 company_box">
            <h3>You have successfully subscribed the to following companies:</h3>
            <ul>
              {Object.entries(this.state.companies).map((company: any, index: number) => {
                return <li key={index}>{company[1]}</li>;
              })}
            </ul>
            <p>You'll get email with the subscription details for each. Thank you!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default index;
