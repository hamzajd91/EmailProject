import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const resources = [
  {
    key: "resources_blog",
    name: "Blog",
    link: "/resources/blog",
  },
  {
    key: "resources_press",
    name: "News",
    link: "/resources/press",
  }
];

export default function ResourcesHeader(props: any) {
  const [activePage, setactivePage] = useState();
  const [searchValue, setsearchValue] = useState("");
  useEffect(() => {
    setactivePage(props.page_key);
  }, []);

  const search = (e: any) => {
    e.preventDefault();
    props.onSearchSubmit(searchValue);
  };

  const setSearch = (e: any) => {
    e.preventDefault();
    setsearchValue(e.target.value);
  };

  const { img, title } = props;
  return (
    <React.Fragment>
      <div className="container pt-5">
        <div className="row align-content-center">
          <div className="col-md-6">
            <img src={img} className="img-fluid" />
          </div>
          <div className="col-md-6 align-self-center text-center">
            <h1 className="resources_title">{title}</h1>
            <div className="blog_search_box">
              <div className="search-group">
                <form method="get" onSubmit={search}>
                  <input
                    type="text"
                    className="form-control"
                    name="search"
                    defaultValue={searchValue}
                    onChange={setSearch}
                    placeholder="Search..."
                  />
                  <button type="submit">
                    <SearchIcon />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="resources_tab">
        <div className="container-fluid">
          <div className="row">
            <div className="container">
              <div className="row">
                {resources.map((resource: any) => (
                  <div className="col" key={resource.key}>
                    <div className={`resources_name ${activePage === resource.key ? "active" : ""}`}>
                      <Link to={resource.link}>{resource.name}</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
