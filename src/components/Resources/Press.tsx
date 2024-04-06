import React, { Component } from "react";
import SingleBlog from "./Component/SingleBlog";
import ResourcesHeader from "./Component/ResourcesHeader";
import press_release from "../../images/resources/press_release.png";
import "./index.scss";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { ResourcesActionsTypes } from "../../store/ducks/resources/types";
import { Loader } from "../Loader";
import alertImg from "../../images/alert.png";

class Press extends Component<{ dispatch: any; industries: any[]; loading: boolean }> {
  componentDidMount() {
    this.props.dispatch({
      type: ResourcesActionsTypes.GET_RESOURCES_DATA,
      payload: "industry",
    });
  }

  onSearchSubmit = (value: any) => {
    this.props.dispatch({
      type: ResourcesActionsTypes.GET_RESOURCES_DATA,
      payload: "industry",
      search: value,
    });
  };

  render() {
    const { industries, loading } = this.props;
    return (
      <React.Fragment>
        <ResourcesHeader
          img={press_release}
          title="Press Release"
          page_key="resources_press"
          onSearchSubmit={this.onSearchSubmit}
        />
        <div className="container mt-5">
          <div className="row">
            {loading ? (
              <div className="col-12">
                <Loader />
              </div>
            ) : industries.length ? (
              industries.map((press: any, index: any) => (
                <div className="col-md-4 mb-4" key={index}>
                  <SingleBlog
                    image={press.image}
                    title={press.title}
                    date={press.date}
                    name={press.author}
                    description={press.summary}
                    link={press.url}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="text-center col-12">
                  <img src={alertImg} alt="Error" width="120px" />
                  <h5 className="mt-4">No press release founds.</h5>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state: ApplicationState) => {
  return {
    industries: state.resources.industry.data,
    loading: state.resources.industry.loading,
  };
};

export default connect(mapStatetoProps)(Press);
