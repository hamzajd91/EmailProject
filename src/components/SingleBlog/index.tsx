import React from "react";
import {Loader} from "../Loader";
import appApi from "../../services/appApi";
import {Helmet} from "react-helmet";
import "./index.scss";
import {InlineShareButtons} from "sharethis-reactjs";

class SingleBlog extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      blog: {},
    };
  }

  async componentDidMount() {
    const response = await appApi.get(`/resources/blog/${this.props.match.params.id}`);
    const shareData: any = {
      url: `${process.env.REACT_APP_CLIENT_HOST}/resources/blog/${this.props.match.params.id}`,
      title: response.data.data.title,
      summary: response.data.data.title,
      source: `hindsyght.com`,
    };

    // const encodeduri = Object.keys(shareData).reduce((uri, key) => {
    //   uri += `${key}=${shareData[key]}&`;
    //   return uri;
    // }, "");

    // window.location.href = `http://www.linkedin.com/shareArticle?mini=true&${encodeduri}`

    // const uri = `url=${shareData.url}summary=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`

    this.setState(
      {
        blog: response.data.data,
        ...shareData,
      },
      () => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  render() {
    const {isLoading, blog} = this.state;

    return (
      <React.Fragment>
        {isLoading ? (
          <div className="mt-5 pt-5 mb-5">
            <Loader />
          </div>
        ) : (
          <>
            <Helmet>
              <meta http-equiv="x-ua-compatible" content="ie=edge" />
              <meta name="keywords" content={blog.keywords} />
              <meta name="description" content={blog.description} />
              <title>{blog.title} | Hindsyght</title>
            </Helmet>
            <div className="container pt-5 pb-5">
              <img src={blog.image} className="img-fluid" />
              <br />
              <small className="blog_info">
                {blog.date} | {blog.author}
              </small>
              <h2>{blog.title}</h2>
              <div className="post__content" dangerouslySetInnerHTML={{__html: blog.body}}></div>
            </div>
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  html, body {
                    margin: 0;
                    padding: 0;
                    
                  }
                  h1 {
                    font-size: 24px;
                    font-weight: bold;
                  }
                  hr {
                    margin-bottom: 40px;
                    margin-top: 40px;
                    width: 50%;
                  }
                `,
              }}
            />
            {/* <div className="sharethis-inline-share-buttons"></div> */}
            <InlineShareButtons
              config={{
                alignment: "center", // alignment of buttons (left, center, right)
                color: "social", // set the color of buttons (social, white)
                enabled: true, // show/hide buttons (true, false)
                font_size: 16, // font size for the buttons
                labels: "cta", // button labels (cta, counts, null)
                language: "en", // which language to use (see LANGUAGES)
                networks: [
                  // which networks to include (see SHARING NETWORKS)

                  "linkedin",
                  "facebook",
                  "twitter",
                ],
                padding: 12, // padding within buttons (INTEGER)
                radius: 4, // the corner radius on each button (INTEGER)
                show_total: false,
                size: 40, // the size of each button (INTEGER)

                // OPTIONAL PARAMETERS
                url: window.location.href, // (defaults to current url)
                image: blog.image, // (defaults to og:image or twitter:image)
                description: blog.description, // (defaults to og:description or twitter:description)
                title: blog.title, // (defaults to og:title or twitter:title)
                message: blog.keywords, // (only for email sharing)
                subject: blog.keywords, // (only for email sharing)
                // username: "custom twitter handle", // (only for twitter sharing)
              }}
            />

            {/* <div id="linkedin-share">
              <a
                href={`http://www.linkedin.com/shareArticle?mini=true&url=https://hindsyght.com/&title=${this.state.title}&summary=${this.state.summary}&source=${this.state.source}`}
              >
                Share on linkedin
              </a>
            </div> */}
          </>
        )}
      </React.Fragment>
    );
  }
}

export default SingleBlog;
