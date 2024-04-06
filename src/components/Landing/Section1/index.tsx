import React from "react";
import {Link} from "react-router-dom";

import "./index.scss";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import SearchComponent from "../../shared/SearchComponent";
// import heroImage from "../../../images/home/hero.gif";

import {ApplicationState} from "../../../store";
import {searchCompany} from "../../../store/ducks/companies/actions";
import filterObject from "../../../interfaces/filterObject";
import Videos from "../Videos";
interface DispatchProps {
  searchCompany(params: any): void;
}
interface StateProps {
  error: any;
  loading: boolean;
  searchResponse: any;
}
type Props = StateProps & DispatchProps;
class Section1 extends React.Component<Props> {
  state = {
    redirect: false,
  };

  searchCompany = (query: string, location: string, distance: number, filters: filterObject) => {
    const params = {
      query,
      location,
      distance,
      filters,
    };
    this.props.searchCompany(params);
  };

  render() {
    return (
      <React.Fragment>
        <div className="top-wrapper pb-3">
          <div className="container">
            <Videos />
          </div>
          <div className="container">
            <div className="row align-content-center">
              <div className="col-md-12">
                <h1 className="text-light">A better way to tackle your next project.</h1>
                <p className="mb-1">
                  Your business needs a quality service firm you can trust. Hindsyght’s innovative search platform does
                  the work for you!
                </p>
                <p>
                  <b className="text-white">INSYGHT. FORESYGHT. HINDSYGHT</b>
                </p>
                <div className="get-started">
                  <Link to="/search/writeReview" className="hindsyght-btn-primary">
                    GET STARTED
                  </Link>
                </div>
                <SearchComponent
                  error={this.props.error}
                  classess="landing"
                  link
                  searchCompany={this.props.searchCompany}
                />
              </div>
              {/* <div className="col-md-6 text-center">
                <img src={heroImage} className="img-fluid" />
              </div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: ApplicationState) => ({
  error: state.companies.error,
  loading: state.companies.loading,
  searchResponse: state.companies.searchResponse,
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCompany: (params: any) => dispatch(searchCompany(params)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Section1);
