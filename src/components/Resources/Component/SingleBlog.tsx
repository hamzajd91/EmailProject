import React from "react";

export default function SingleBlog({image, title, date, name, description, link}: any) {
  return (
    <React.Fragment>
      <div className="single_blog">
        <a href={link} rel="nofollow" target="_blank">
          <div className="blog-image">
            <img src={image} className="img-fluid" />
          </div>
          <div className="d-flex blog_date_name flex-wrap">
            <div className="">{date}</div>
            <div className="ml-auto">{name}</div>
          </div>
          <div className="blog-content">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="overlay"></div>
          </div>
        </a>
        <div className="resources_read_more">
          <a href={link}>Read More</a>
        </div>
      </div>
    </React.Fragment>
  );
}
