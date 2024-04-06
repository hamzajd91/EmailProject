import React, {Component} from "react";
import {ResourcesActionsTypes} from "../../store/ducks/resources/types";
import {connect} from "react-redux";
import {ApplicationState} from "../../store";
import {Loader} from "../Loader";
import "./index.scss";

class PageBlogComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      snackbar: false,
    };
  }

  componentDidMount() {
    const {blogs} = this.props;
    if (blogs.length < 4) {
      this.props.dispatch({
        type: ResourcesActionsTypes.GET_RESOURCES_DATA,
        payload: "blog",
      });
    }
  }

  render() {
    const {blogs, loading} = this.props;

    const blog1 = blogs[Math.floor(Math.random() * blogs.length)];
    const blog2 = blogs[Math.floor(Math.random() * blogs.length)];
    const blog3 = blogs[Math.floor(Math.random() * blogs.length)];
    const blog4 = blogs[Math.floor(Math.random() * blogs.length)];

    return (
      <div className="page_blog_section">
        <div className="container">
          <h3 className="text-center">Popular posts like this</h3>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="popular_blog">
                <a href={blog1.url} rel="nofollow" target="_blank">
                  {blog1.title}
                </a>
              </div>
              <div className="popular_blog">
                <a href={blog2.url} rel="nofollow" target="_blank">
                  {blog2.title}
                </a>
              </div>
              <div className="popular_blog">
                <a href={blog3.url} rel="nofollow" target="_blank">
                  {blog3.title}
                </a>
              </div>
              <div className="popular_blog">
                <a href={blog4.url} rel="nofollow" target="_blank">
                  {blog4.title}
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  blogs: state.resources.blog.data,
  loading: state.resources.blog.loading,
});

export default connect(mapStateToProps)(PageBlogComponent);
