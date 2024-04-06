import React, { Component } from "react";
import SingleBlog from "./Component/SingleBlog";
import ResourcesHeader from "./Component/ResourcesHeader";
import industry_news from "../../images/resources/industry_news.png";
import "./index.scss";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import { ResourcesActionsTypes } from "../../store/ducks/resources/types";
import { Loader } from "../Loader";
import alertImg from "../../images/alert.png";

class Industry extends Component<{ dispatch: any; industries: []; loading: boolean }> {
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
          img={industry_news}
          title="Industry News"
          page_key="resources_industry"
          onSearchSubmit={this.onSearchSubmit}
        />
        <div className="container mt-5">
          <div className="row">
            {loading ? (
              <div className="col-12">
                <Loader />
              </div>
            ) : industries.length > 0 ? (
              industries.map((industry: any, index: any) => (
                <div className="col-md-4 mb-4" key={index}>
                  <SingleBlog
                    image={industry.image}
                    title={industry.title}
                    date={industry.date}
                    name={industry.author}
                    description={industry.summary}
                    link={industry.url}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="text-center col-12">
                  <img src={alertImg} alt="Error" width="120px" />
                  <h5 className="mt-4">No industry news founds.</h5>
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

export default connect(mapStatetoProps)(Industry);
