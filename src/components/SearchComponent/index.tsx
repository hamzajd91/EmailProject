/* eslint-disable react/no-string-refs */
import React, {Component} from "react";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import axios from "axios";
import {withRouter, RouteComponentProps} from "react-router-dom";
import qs from "qs";
import {ApplicationState} from "../../store";
import {connect} from "react-redux";
import "./index.scss";
import Autocomplete from "@material-ui/lab/Autocomplete";

class SearchComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      query: "",
      location: "",
      suggestions: [],
    };
  }

  ulRef = React.createRef<HTMLUListElement>();

  componentWillMount() {
    document.removeEventListener("mousedown", this.handleBlur);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleBlur, false);
    function showPosition() {}

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    }

    this.setState({
      location: this.props._location,
    });
  }

  handleBlur = (e: any) => {
    if (this.ulRef.current) {
      if (!this.ulRef.current.contains(e.target)) {
        this.setState({suggestions: []});
      }
    }
  };

  handleFocus = (event: any) => event.target.select();

  searchHandler = (e: any) => {
    // @ts-ignore
    e.preventDefault();
    const {history} = this.props;
    const {query, location} = this.state;

    history.push({
      pathname: "/search",
      search: `?${qs.stringify({
        q: query,
        location: location || this.state.location,
        page: 1,
      })}`,
    });
  };

  getSuggestions = () => {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const {query} = this.state;
    const options = {
      headers: {Authorization: token || ""},
    };
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");
    axios.get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/search?query=${encodedQuery}`, options).then(({data}) => {
      this.setState({suggestions: data});
    });
  };

  handleChange = (e: any) => {
    const stateName = e.target.name;
    this.setState({[e.target.name]: e.target.value}, () => {
      if (stateName === "query") {
        this.getSuggestions();
      }
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      location: nextProps.locationQuery ? nextProps.locationQuery : nextProps._location,
      query: nextProps.query,
    });
  }

  handleSearchChange = (value: string) => {
    this.setState({query: value}, () => {
      this.getSuggestions();
    });
  };

  render() {
    const {suggestions, query, location} = this.state;
    const {classess, error} = this.props;
    return (
      <>
        <form onSubmit={(e: any) => this.searchHandler(e)}>
          <div className="block_s">
            <div className="serach_block">
              <div className="search_input">
                <svg
                  className="search_svg"
                  id="search"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18.907"
                  height="18.907"
                  viewBox="0 0 18.907 18.907"
                >
                  <g id="Group_2" data-name="Group 2">
                    <g id="Group_1" data-name="Group 1">
                      <path
                        id="Path_13"
                        data-name="Path 13"
                        d="M8.326,0a8.326,8.326,0,1,0,8.326,8.326A8.336,8.336,0,0,0,8.326,0Zm0,15.115a6.789,6.789,0,1,1,6.789-6.789A6.8,6.8,0,0,1,8.326,15.115Z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                  <g id="Group_4" data-name="Group 4" transform="translate(12.963 12.963)">
                    <g id="Group_3" data-name="Group 3">
                      <path
                        id="Path_14"
                        data-name="Path 14"
                        d="M356.764,355.677l-4.407-4.406a.768.768,0,0,0-1.087,1.087l4.406,4.407a.768.768,0,0,0,1.087-1.087Z"
                        transform="translate(-351.046 -351.046)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </svg>

                <Autocomplete
                  freeSolo
                  value={query || ""}
                  options={suggestions}
                  onInputChange={(event: object, value: string) => {
                    this.handleSearchChange(value);
                  }}
                  renderInput={params => (
                    <div ref={params.InputProps.ref} className="block_search">
                      <input
                        type="text"
                        {...params.inputProps}
                        className="input_search"
                        required={true}
                        placeholder="Keyword or Company Name"
                      />
                    </div>
                  )}
                />
                <span className="helper_text">Data Science, DevOps, Mobile Dev</span>
              </div>
              <div className="location_input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="location_svg"
                  width="19.921"
                  height="24.015"
                  viewBox="0 0 19.921 24.015"
                >
                  <g id="map-pin" className="location_svg" transform="translate(0.75 0.75)">
                    <path
                      id="Path_71"
                      data-name="Path 71"
                      d="M21.421,10.211c0,7.164-9.211,13.3-9.211,13.3S3,17.375,3,10.211a9.211,9.211,0,1,1,18.421,0Z"
                      transform="translate(-3 -1)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                    <circle
                      id="Ellipse_8"
                      data-name="Ellipse 8"
                      cx="2.907"
                      cy="2.907"
                      r="2.907"
                      transform="translate(5.814 5.814)"
                      fill="none"
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </svg>

                <input
                  onFocus={this.handleFocus}
                  type="text"
                  name="location"
                  value={location || this.props._location}
                  onChange={this.handleChange}
                  placeholder="Location"
                  required
                />
              </div>
            </div>
            <button type="submit" className="search_btn">
              SEARCH
            </button>
          </div>
        </form>
        <div className="error">{error.message}</div>
      </>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    _location: state.location.location,
  };
};

export default connect(mapStateToProps)(withRouter(SearchComponent));
