/* eslint-disable react/no-string-refs */

import React, {Component} from "react";
import {Col} from "react-bootstrap";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import axios from "axios";
import {withRouter, RouteComponentProps} from "react-router-dom";
import qs from "qs";
import {ApplicationState} from "../../../store";
import {connect} from "react-redux";
import "./index.scss";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Autocomplete from "@material-ui/lab/Autocomplete";
interface Props {
  searchCompany: (params: any) => void;
  error?: any;
  query?: string;
  locationQuery?: string;
  classess?: string;
  link?: boolean;
  history?: any;
  _location?: any;
  setShowProfile?: any;
}
class SearchComponent extends Component<Props & RouteComponentProps> {
  state = {
    query: "",
    location: "",
    suggestions: [],
  };

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

    // const getLocationByIp = async () => {
    //   try {
    //     const data = await fetch("https://api64.ipify.org?format=json");
    //     const {ip} = await data.json();

    //     const location = await fetch(`https://ipapi.co/${ip}/json`);
    //     // eslint-disable-next-line @typescript-eslint/camelcase
    //     const {city, region_code} = await location.json();

    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    this.setState({
      location: this.props._location,
    });

    // getLocationByIp();
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
    const {searchCompany, history} = this.props;
    const {query, location} = this.state;
    e.preventDefault();

    // searchCompany({
    //   query,
    //   location,
    //   distance: 3000,
    //   page: 1,
    //   filters: {p: [], s: [], i: []},
    // });
    // this.setState({suggestions: []});

    history.push({
      pathname: "/search",
      search: `?${qs.stringify({
        q: query,
        location: location || this.state.location,
        page: 1,
      })}`,
    });

    // if (this.props.link) {
    //   this.props.history.push({
    //     pathname: '/search',
    //     search: '',
    //     state: {
    //       query: this.state.query,
    //       location: this.state.location,
    //       test: 'yes',
    //     },
    //   });
    // }
  };

  getSuggestions = () => {
    const token = JSON.parse(localStorage.getItem("_token") as any);
    const {query} = this.state;
    const options = {
      headers: {Authorization: token || ""},
    };
    const encodedQuery = encodeURIComponent(query).replace(/%20/g, "+");
    axios.get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/ajax/search?query=${encodedQuery}`, options).then(({data}) => {
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

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
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
      <Col className="search_form_wrapper">
        <form ref="searchForm" onSubmit={(e: any) => this.searchHandler(e)} className="search-form">
          <SearchOutlinedIcon className={`icon ${classess || ""}`} />
          &nbsp;
          <div className="keyword search-input">
            <Autocomplete
              freeSolo
              value={query || ""}
              options={suggestions}
              onInputChange={(event: object, value: string) => {
                this.handleSearchChange(value);
              }}
              renderInput={params => (
                <div ref={params.InputProps.ref} className="block_search">
                  <input type="text" {...params.inputProps} className="input_search" placeholder="Keyword or Company Name" />
                </div>
              )}
            />
          </div>
          <LocationOnOutlinedIcon className={`icon ${classess || ""}`} />
          &nbsp;
          <input
            onFocus={this.handleFocus}
            type="text"
            name="location"
            value={location || this.props._location}
            onChange={this.handleChange}
            className="location"
            placeholder="Location"
            required
          />
          <ButtonComponent
            id="search_btn"
            label="Search"
            marginRight="5px"
            backgroundColor="#154260"
            color="#fff"
            width="140px"
            height="50px"
            className="test"
          />
        </form>
        <div className="error">{error.message}</div>
      </Col>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    _location: state.location.location,
  };
};

export default connect(mapStateToProps)(withRouter(SearchComponent));
