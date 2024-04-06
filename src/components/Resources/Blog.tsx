import React, {Component} from "react";
import SingleBlog from "./Component/SingleBlog";
import ResourcesHeader from "./Component/ResourcesHeader";
import blog from "../../images/resources/blog.png";
import "./index.scss";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {ResourcesActionsTypes} from "../../store/ducks/resources/types";
import {Loader} from "../Loader";
import alertImg from "../../images/alert.png";

class Blog extends Component<{dispatch: any; blogs: []; loading: boolean}> {
  componentDidMount() {
    this.props.dispatch({
      type: ResourcesActionsTypes.GET_RESOURCES_DATA,
      payload: "blog",
    });
  }

  onSearchSubmit = (value: any) => {
    this.props.dispatch({
      type: ResourcesActionsTypes.GET_RESOURCES_DATA,
      payload: "blog",
      search: value,
    });
  };

  render() {
    const {blogs, loading} = this.props;
    return (
      <React.Fragment>
        <ResourcesHeader img={blog} title="Blog" page_key="resources_blog" onSearchSubmit={this.onSearchSubmit} />
        <div className="container mt-5">
          <div className="row">
            {loading ? (
              <div className="col-12">
                <Loader />
              </div>
            ) : blogs.length > 0 ? (
              blogs.map((blog: any, index: any) => (
                <div className="col-md-4 mb-4" key={index}>
                  <SingleBlog
                    image={blog.image}
                    title={blog.title}
                    date={blog.date}
                    name={blog.author}
                    description={blog.summary}
                    link={blog.url}
                  />
                </div>
              ))
            ) : (
              <>
                <div className="text-center col-12">
                  <img src={alertImg} alt="Error" width="120px" />
                  <h5 className="mt-4">No blog founds.</h5>
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
    blogs: state.resources.blog.data,
    loading: state.resources.blog.loading,
  };
};

export default connect(mapStatetoProps)(Blog);
