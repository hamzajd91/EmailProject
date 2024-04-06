/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from "react";

import { Link, withRouter, RouteComponentProps, useLocation } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import searchIcon from "../../images/navbar/search.svg";
import "./index.scss";
import * as locationActions from "../../store/ducks/location/actions";
import { ApplicationState } from "../../store";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: 9999,
    },
  })
);

interface Props {
  user: any;
}

interface DispatchProps {
  setUserLocation(data: any): void;
}

function Navbar({ history, setUserLocation, user }: Props & RouteComponentProps & DispatchProps) {
  const [suggestions, setSuggestions] = useState([]);
  // @ts-ignore
  const [search, setSearch] = useState("");
  const [drawerState, setDrawerState] = useState(false);
  const [location, setLocation] = useState("");
  const ulRef = useRef<HTMLUListElement>(null);

  function handleBlur(e: any) {
    if (ulRef.current) {
      if (!ulRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    const getLocationByIp = async () => {
      try {
        const data = await fetch("https://api64.ipify.org?format=json");
        const { ip } = await data.json();
        const locationIp = await fetch(`https://ipapi.co/${ip}/json`);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { city, region_code } = await locationIp.json();
        setUserLocation(`${city}, ${region_code}`);
        setLocation(`${city}, ${region_code}`);
      } catch (error) {
        console.error(error);
      }
    };
    getLocationByIp();

    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  function getSuggestions(value: string) {
    const encodedQuery = encodeURIComponent(value).replace(/%20/g, "+");

    axios.get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/search?query=${encodedQuery}`).then(({ data }) => {
      setSuggestions(data);
    });

    // axios.get(`http://localhost:3001/ajax/search?query=${encodedQuery}`).then(({data}) => {
    //   setSuggestions(data);
    // });
  }

  function handleSearch(e: any, value: string) {
    e.preventDefault();
    history.push({
      pathname: "/search",
      search: `?${qs.stringify({ q: value, location, page: 1 })}`,
    });
  }

  function handleSearchChange(value: string) {
    getSuggestions(value);
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setDrawerState(open);
  };

  return (
    <>
      <div className="desktop_navbar mainnavbar d-flex justify-content-between">
        <div className="desktop_nav">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="193.381" height="40.253" viewBox="0 0 193.381 40.253">
              <g id="Company_logo" data-name="Company logo" transform="translate(0 -0.235)">
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M7.476,38.659H39.368V15.64h-15.7a2.007,2.007,0,0,0-.963.179.681.681,0,0,0-.315.648.7.7,0,0,0,.315.657,1.912,1.912,0,0,0,.963.189H30.23a5.787,5.787,0,0,1,3.369.82,2.838,2.838,0,0,1,1.154,2.478,4.506,4.506,0,0,1-.289,1.658,2.945,2.945,0,0,1-.918,1.243,4.412,4.412,0,0,1-1.613.774,8.987,8.987,0,0,1-2.351.27H14.645V19.907H7.476V38.659Z"
                  transform="translate(0.888 1.83)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M20.893,15.364a4.53,4.53,0,0,1,1.6-.758,8.988,8.988,0,0,1,2.351-.27H40.256V.235H0V40.489H4.614V14.334H8.364V18.6h7.169v-4.27h3.711V26.387l2.4-3.1h9.117a1.766,1.766,0,0,0,.973-.208.759.759,0,0,0,.306-.676.734.734,0,0,0-.306-.667,1.843,1.843,0,0,0-.973-.2H24.2a7.046,7.046,0,0,1-2.017-.253,4.036,4.036,0,0,1-1.405-.7,2.791,2.791,0,0,1-.829-1.09,3.614,3.614,0,0,1-.27-1.415,3.879,3.879,0,0,1,.3-1.541A2.962,2.962,0,0,1,20.893,15.364Z"
                  transform="translate(0 0)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M128.955,19.366c-2.434-2.5-5.651-5.616-8.3-8.342l-.747-.769h4.715c1.9,1.955,3.938,3.912,5.9,5.869Q129.668,17.708,128.955,19.366Z"
                  transform="translate(14.243 1.19)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M78.951,24.441H75.58v-11.6h3.372Z"
                  transform="translate(8.977 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M82.912,17.264v7.2H79.879V14.734a2.621,2.621,0,0,1,.158-.958,1.781,1.781,0,0,1,.409-.638,1.532,1.532,0,0,1,.583-.356,2.152,2.152,0,0,1,.707-.117,2.052,2.052,0,0,1,.636.108,2.206,2.206,0,0,1,.731.488l7.575,6.8v-7.2H93.73v9.711a2.6,2.6,0,0,1-.158.956,1.9,1.9,0,0,1-.409.65,1.512,1.512,0,0,1-.59.363,2.274,2.274,0,0,1-.714.117,2.11,2.11,0,0,1-.655-.108,2.074,2.074,0,0,1-.712-.485Z"
                  transform="translate(9.488 1.476)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M96.932,21.693h4.433a4.842,4.842,0,0,0,1.464-.213,3.556,3.556,0,0,0,1.164-.607,2.873,2.873,0,0,0,.772-.951,2.822,2.822,0,0,0,0-2.468,2.857,2.857,0,0,0-.791-.97,3.952,3.952,0,0,0-1.168-.631,4.409,4.409,0,0,0-1.441-.232H93.7l2.112-2.784h5.551a9.2,9.2,0,0,1,2.836.418,6.787,6.787,0,0,1,2.22,1.176,5.419,5.419,0,0,1,1.447,1.8,5.1,5.1,0,0,1,.518,2.289,5.266,5.266,0,0,1-.528,2.344,5.747,5.747,0,0,1-1.458,1.874,6.978,6.978,0,0,1-2.222,1.245,8.476,8.476,0,0,1-2.815.454H93.539V17.323h3.388v4.371Z"
                  transform="translate(11.111 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M72.441,19.846H65.035v4.6H61.647v-11.6h3.388v4.22h7.405v-4.22H75.8v11.6H72.441Z"
                  transform="translate(7.323 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M162.655,19.846h-7.406v4.6h-3.391V15.623H142.4a4.541,4.541,0,0,0-1.44.222,3.6,3.6,0,0,0-1.165.633,3.067,3.067,0,0,0-.779.968,2.712,2.712,0,0,0-.284,1.238,2.784,2.784,0,0,0,.274,1.238,2.756,2.756,0,0,0,.775.954,3.62,3.62,0,0,0,1.164.6,4.753,4.753,0,0,0,1.454.213h4.665V19.648h-5.987l1.948-2.339h7.394v7.131H142.4a8.476,8.476,0,0,1-2.815-.454,6.976,6.976,0,0,1-2.222-1.245,5.739,5.739,0,0,1-1.456-1.874,5.281,5.281,0,0,1-.528-2.344,5.061,5.061,0,0,1,.526-2.306,5.508,5.508,0,0,1,1.456-1.8,6.744,6.744,0,0,1,2.22-1.166,9.315,9.315,0,0,1,2.819-.411h12.851V17.06h10.758v7.379h-3.352V19.846Z"
                  transform="translate(16.081 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M168.01,15.623v8.818h-3.372V15.623h-5.6V12.839h15.456l-2.144,2.784Z"
                  transform="translate(18.89 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M121.845,12.839l2.705,2.784H112.784a2.177,2.177,0,0,0-1.033.2.832.832,0,0,0-.389.777.856.856,0,0,0,.389.786,2.106,2.106,0,0,0,1.035.21h6.483a5.72,5.72,0,0,1,3.24.781,2.661,2.661,0,0,1,1.073,2.32,4.332,4.332,0,0,1-.275,1.582,2.743,2.743,0,0,1-.86,1.164,4.223,4.223,0,0,1-1.538.736,8.623,8.623,0,0,1-2.282.26H107.849l2.125-2.748h8.937a1.947,1.947,0,0,0,1.052-.232.91.91,0,0,0,.373-.8.882.882,0,0,0-.375-.791,2.026,2.026,0,0,0-1.047-.222h-6.484a6.876,6.876,0,0,1-1.95-.241,3.827,3.827,0,0,1-1.336-.667,2.589,2.589,0,0,1-.772-1.016,3.432,3.432,0,0,1-.256-1.338,3.685,3.685,0,0,1,.282-1.46,2.773,2.773,0,0,1,.86-1.1,4.328,4.328,0,0,1,1.529-.719,8.654,8.654,0,0,1,2.282-.26h8.777Z"
                  transform="translate(12.81 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_11"
                  data-name="Path 11"
                  d="M167.593,2.571c-21.225-5.405-37.481,8.414-40.629,28.764h3.156C133.36,13.026,148.026-.65,167.593,2.571Z"
                  transform="translate(15.081 0.138)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_12"
                  data-name="Path 12"
                  d="M49.206.235H48.5V40.489h.71Z"
                  transform="translate(5.76 0)"
                  fill="#fff"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </Link>
        </div>
        <div className="menu_links">
          <ul>
            <li>
              <Link to="/for-service-firms">For Service Firms</Link>
            </li>
            <li>
              <Link to="/resources/blog">Resources</Link>
            </li>
            <li>
              <Link to="/subscription">Subscription</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="search_login_block">
          <div className="search_box">
            <form onSubmit={e => handleSearch(e, search)}>
              <button type="submit" className="btn-search">
                <img src={searchIcon} alt="Search icon" />
              </button>
              <Autocomplete
                freeSolo
                value={search || ""}
                options={suggestions}
                className="w-100"
                onInputChange={(event: object, value: string) => {
                  handleSearchChange(value);
                }}
                onChange={(event: object, value: any, reason: string) => {
                  if (value) {
                    handleSearch(event, value);
                  }
                }}
                renderInput={params => (
                  <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} required placeholder="Keyword or Company Name" />
                  </div>
                )}
              />
            </form>
          </div>
          <div className="ml-2">
            {user.isAuthenticated ? (
              <HeaderNav user={user} />
            ) : (
              <Link className="sigin_btn" to="/signin">
                SIGN IN
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mobile_navbar">
        <div className="d-flex">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="193.381" height="40.253" viewBox="0 0 193.381 40.253">
              <g id="Company_logo" data-name="Company logo" transform="translate(0 -0.235)">
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M7.476,38.659H39.368V15.64h-15.7a2.007,2.007,0,0,0-.963.179.681.681,0,0,0-.315.648.7.7,0,0,0,.315.657,1.912,1.912,0,0,0,.963.189H30.23a5.787,5.787,0,0,1,3.369.82,2.838,2.838,0,0,1,1.154,2.478,4.506,4.506,0,0,1-.289,1.658,2.945,2.945,0,0,1-.918,1.243,4.412,4.412,0,0,1-1.613.774,8.987,8.987,0,0,1-2.351.27H14.645V19.907H7.476V38.659Z"
                  transform="translate(0.888 1.83)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M20.893,15.364a4.53,4.53,0,0,1,1.6-.758,8.988,8.988,0,0,1,2.351-.27H40.256V.235H0V40.489H4.614V14.334H8.364V18.6h7.169v-4.27h3.711V26.387l2.4-3.1h9.117a1.766,1.766,0,0,0,.973-.208.759.759,0,0,0,.306-.676.734.734,0,0,0-.306-.667,1.843,1.843,0,0,0-.973-.2H24.2a7.046,7.046,0,0,1-2.017-.253,4.036,4.036,0,0,1-1.405-.7,2.791,2.791,0,0,1-.829-1.09,3.614,3.614,0,0,1-.27-1.415,3.879,3.879,0,0,1,.3-1.541A2.962,2.962,0,0,1,20.893,15.364Z"
                  transform="translate(0 0)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_3"
                  data-name="Path 3"
                  d="M128.955,19.366c-2.434-2.5-5.651-5.616-8.3-8.342l-.747-.769h4.715c1.9,1.955,3.938,3.912,5.9,5.869Q129.668,17.708,128.955,19.366Z"
                  transform="translate(14.243 1.19)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_4"
                  data-name="Path 4"
                  d="M78.951,24.441H75.58v-11.6h3.372Z"
                  transform="translate(8.977 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M82.912,17.264v7.2H79.879V14.734a2.621,2.621,0,0,1,.158-.958,1.781,1.781,0,0,1,.409-.638,1.532,1.532,0,0,1,.583-.356,2.152,2.152,0,0,1,.707-.117,2.052,2.052,0,0,1,.636.108,2.206,2.206,0,0,1,.731.488l7.575,6.8v-7.2H93.73v9.711a2.6,2.6,0,0,1-.158.956,1.9,1.9,0,0,1-.409.65,1.512,1.512,0,0,1-.59.363,2.274,2.274,0,0,1-.714.117,2.11,2.11,0,0,1-.655-.108,2.074,2.074,0,0,1-.712-.485Z"
                  transform="translate(9.488 1.476)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_6"
                  data-name="Path 6"
                  d="M96.932,21.693h4.433a4.842,4.842,0,0,0,1.464-.213,3.556,3.556,0,0,0,1.164-.607,2.873,2.873,0,0,0,.772-.951,2.822,2.822,0,0,0,0-2.468,2.857,2.857,0,0,0-.791-.97,3.952,3.952,0,0,0-1.168-.631,4.409,4.409,0,0,0-1.441-.232H93.7l2.112-2.784h5.551a9.2,9.2,0,0,1,2.836.418,6.787,6.787,0,0,1,2.22,1.176,5.419,5.419,0,0,1,1.447,1.8,5.1,5.1,0,0,1,.518,2.289,5.266,5.266,0,0,1-.528,2.344,5.747,5.747,0,0,1-1.458,1.874,6.978,6.978,0,0,1-2.222,1.245,8.476,8.476,0,0,1-2.815.454H93.539V17.323h3.388v4.371Z"
                  transform="translate(11.111 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M72.441,19.846H65.035v4.6H61.647v-11.6h3.388v4.22h7.405v-4.22H75.8v11.6H72.441Z"
                  transform="translate(7.323 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_8"
                  data-name="Path 8"
                  d="M162.655,19.846h-7.406v4.6h-3.391V15.623H142.4a4.541,4.541,0,0,0-1.44.222,3.6,3.6,0,0,0-1.165.633,3.067,3.067,0,0,0-.779.968,2.712,2.712,0,0,0-.284,1.238,2.784,2.784,0,0,0,.274,1.238,2.756,2.756,0,0,0,.775.954,3.62,3.62,0,0,0,1.164.6,4.753,4.753,0,0,0,1.454.213h4.665V19.648h-5.987l1.948-2.339h7.394v7.131H142.4a8.476,8.476,0,0,1-2.815-.454,6.976,6.976,0,0,1-2.222-1.245,5.739,5.739,0,0,1-1.456-1.874,5.281,5.281,0,0,1-.528-2.344,5.061,5.061,0,0,1,.526-2.306,5.508,5.508,0,0,1,1.456-1.8,6.744,6.744,0,0,1,2.22-1.166,9.315,9.315,0,0,1,2.819-.411h12.851V17.06h10.758v7.379h-3.352V19.846Z"
                  transform="translate(16.081 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M168.01,15.623v8.818h-3.372V15.623h-5.6V12.839h15.456l-2.144,2.784Z"
                  transform="translate(18.89 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_10"
                  data-name="Path 10"
                  d="M121.845,12.839l2.705,2.784H112.784a2.177,2.177,0,0,0-1.033.2.832.832,0,0,0-.389.777.856.856,0,0,0,.389.786,2.106,2.106,0,0,0,1.035.21h6.483a5.72,5.72,0,0,1,3.24.781,2.661,2.661,0,0,1,1.073,2.32,4.332,4.332,0,0,1-.275,1.582,2.743,2.743,0,0,1-.86,1.164,4.223,4.223,0,0,1-1.538.736,8.623,8.623,0,0,1-2.282.26H107.849l2.125-2.748h8.937a1.947,1.947,0,0,0,1.052-.232.91.91,0,0,0,.373-.8.882.882,0,0,0-.375-.791,2.026,2.026,0,0,0-1.047-.222h-6.484a6.876,6.876,0,0,1-1.95-.241,3.827,3.827,0,0,1-1.336-.667,2.589,2.589,0,0,1-.772-1.016,3.432,3.432,0,0,1-.256-1.338,3.685,3.685,0,0,1,.282-1.46,2.773,2.773,0,0,1,.86-1.1,4.328,4.328,0,0,1,1.529-.719,8.654,8.654,0,0,1,2.282-.26h8.777Z"
                  transform="translate(12.81 1.497)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_11"
                  data-name="Path 11"
                  d="M167.593,2.571c-21.225-5.405-37.481,8.414-40.629,28.764h3.156C133.36,13.026,148.026-.65,167.593,2.571Z"
                  transform="translate(15.081 0.138)"
                  fill="#fff"
                  fillRule="evenodd"
                />
                <path
                  id="Path_12"
                  data-name="Path 12"
                  d="M49.206.235H48.5V40.489h.71Z"
                  transform="translate(5.76 0)"
                  fill="#fff"
                  fillRule="evenodd"
                />
              </g>
            </svg>
          </Link>
          <button onClick={toggleDrawer(true)} className="drawer_btn ml-auto">
            <MenuIcon />
          </button>
        </div>

        <Drawer open={drawerState} onClose={toggleDrawer(false)}>
          <div className="mobile_drawer_menu">
            <ul className="mobile_link">
              {/* {user.isAuthenticated ? (
                <li>
                  {user.user.firstName} {user.user.lastName}
                </li>
              ) : null} */}
              <li className="mobileUser">
                {user.isAuthenticated ? (
                  <HeaderNav user={user} />
                ) : (
                  <Link className="sigin_btn" to="/signin">
                    SIGN IN
                  </Link>
                )}
              </li>
              <li>
                <Link to="/for-service-firms">For Service Firms</Link>
              </li>
              <li>
                <Link to="/resources/blog">Resources</Link>
              </li>
              <li>
                <Link to="/subscription">Subscription</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              {user.isAuthenticated ? (
                <li>
                  <Link to="/logout">LOG OUT</Link>
                </li>
              ) : (
                <li>
                  <Link to="/signin">SIGN IN</Link>
                </li>
              )}
            </ul>
          </div>
        </Drawer>
      </div>
    </>
  );
}

function HeaderNav(props: any) {
  const classes = useStyles();

  const { user } = props;
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <button type="button" className="sigin_btn" style={{ width: "auto" }} ref={anchorRef} onClick={handleToggle}>
        {user.user.firstName} {user.user.lastName}
      </button>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper className="menuitems">
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open}>
                  <a href="/user">
                    <MenuItem>My Account</MenuItem>
                  </a>
                  <a href="/logout">
                    <MenuItem>Logout</MenuItem>
                  </a>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

function ContactMenu(props: any) {
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  const openChatBot = () => {
    if (window.Tawk_API) {
      window.Tawk_API.toggle();
    }
    setOpen(!open);
  };

  return (
    <>
      <button type="button" ref={anchorRef} className="contact_menu" onClick={handleToggle}>
        Contact Us
      </button>
      <Popper
        className={classes.root}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps}>
            <Paper className="menuitems">
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open}>
                  <MenuItem>
                    <Link to="/contact" className="text-dark sub_menu_link">
                      Email Us
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <a href="https://hindsyght.tawk.help/" target="_blank" className="text-dark sub_menu_link">
                      Help Center
                    </a>
                  </MenuItem>

                  <MenuItem onClick={() => openChatBot()}>Chat with Us</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

const mapStateToProps = (state: ApplicationState) => ({ user: state.user });

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(locationActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
