/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useRef, useEffect } from "react";

import { Link, withRouter, RouteComponentProps, useLocation } from "react-router-dom";
import qs from "qs";
import axios from "axios";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import logo from "../../images/navbar/logo.svg";
import menu from "../../images/menu.svg";
import menuOpen from "../../images/menu-open.svg";
import searchIcon from "../../images/navbar/search.svg";
import "./index.scss";
import * as locationActions from "../../store/ducks/location/actions";
import { ApplicationState } from "../../store";
import { HashLink } from "react-router-hash-link";

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
  const [showMenu, setShowMenu] = useState(false);
  const [location, setLocation] = useState("");
  const locationPath = useLocation();
  const ulRef = useRef<HTMLUListElement>(null);

  function handleBlur(e: any) {
    if (ulRef.current) {
      if (!ulRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
  }

  useEffect(() => {
    if (history.location.hash) {
      let interval = setInterval(function () {
        const el: any = document.querySelector(history.location.hash);
        if (el) {
          clearInterval(interval);
          const offset = 250;
          const elementPosition = el.offsetTop - offset;
          window.scroll({
            top: elementPosition,
            left: 0,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    document.addEventListener("mousedown", handleBlur);
    const getLocationByIp = async () => {
      try {
        const data = await fetch("https://api64.ipify.org?format=json");
        const { ip } = await data.json();

        const locationIp = await fetch(`https://ipapi.co/${ip}/json`);
        // eslint-disable-next-line @typescript-eslint/camelcase
        const { city, region_code } = await locationIp.json();

        // let input = document.createElement("input");
        // input.setAttribute("type", "hidden");
        // input.setAttribute("name", "u_location");
        // input.setAttribute("value", `${city}, ${region_code}`);
        // input.setAttribute("id", "u_location");

        // // eslint-disable-next-line @typescript-eslint/camelcase
        // let doc = document.getElementById("hindsyght") as HTMLInputElement;
        // doc.appendChild(input);

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

  // useEffect(() => {
  //   const url = new URL(window.location.href);
  //   const token = url.searchParams.get("token");
  //   if (token !== "" && token !== null) {
  //     localStorage.setItem("token", token || "");
  //   }

  //   getCurrentUser();
  // }, []);

  function getSuggestions(value: string) {
    const token = localStorage.getItem("token");
    const options = {
      headers: { Authorization: token || "" },
    };
    const encodedQuery = encodeURIComponent(value).replace(/%20/g, "+");
    axios.get(`${process.env.REACT_APP_NODE_CLIENT_HOST}/ajax/search?query=${encodedQuery}`, options).then(({ data }) => {
      setSuggestions(data);
    });
  }

  function handleSearch(value: string) {
    setSuggestions([]);
    history.push({
      pathname: "/search",
      search: `?${qs.stringify({
        q: value,
        location,
        page: 1,
      })}`,
    });
  }

  function scrollWithOffset(el: any, offset: any) {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    });
  }

  function handleSearchChange(value: string) {
    getSuggestions(value);
  }

  return (
    <div className="hs-main-header">
      <header className="hs-header">
        <Link className="logo" to="/">
          <img src={logo} alt="Logo" style={{ width: "180px" }} />
        </Link>
        <div className="search-group">
          <button onClick={() => handleSearch(search)} type="button" className="btn-search" id="search-btn2">
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
                handleSearch(value);
              }
            }}
            renderInput={params => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  {...params.inputProps}
                  className="form-control"
                  placeholder="Keyword or Company Name"
                  aria-label="Keyword or Company Name"
                />
              </div>
            )}
          />
        </div>
        <nav>
          <Link className="" to="/for-service-firms">
            For Service Firms
          </Link>
          <Link
            className=""
            to="/search/writeReview"
            style={{
              display: locationPath.pathname === "/search/writeReview" ? "none" : "inline-flex",
            }}
          // onClick={handleWriteReview}
          >
            WRITE A REVIEW
          </Link>
          {!user.isAuthenticated && <Link to="/signin">SIGN IN</Link>}
        </nav>
        {user.isAuthenticated ? (
          <HeaderNav user={user} />
        ) : (
          <button type="button" className="btn-get-start">
            <Link to="/signup">Sign Up</Link>
            {/* <a target="_self" href={`${process.env.REACT_APP_NODE_CLIENT_HOST}/signup`}>
              GET STARTED
            </a> */}
          </button>
        )}

        <div className="mobile-menu">
          {!showMenu && (
            <button onClick={() => setShowMenu(true)} type="button" style={{ backgroundColor: "white" }}>
              <img src={menu} alt="" srcSet="" />
            </button>
          )}
          {showMenu && (
            <button onClick={() => setShowMenu(false)} type="button" style={{ backgroundColor: "white" }}>
              <img src={menuOpen} alt="" srcSet="" />
            </button>
          )}
        </div>

        {showMenu && (
          <>
            <div className="mobile-menu-items" onClick={() => setShowMenu(false)}>
              <div>
                <Link className="" to="/for-service-firms">
                  For Service Firms
                </Link>
                <Link
                  className=""
                  to="/search/writeReview"
                  style={{
                    display: locationPath.pathname === "/search/writeReview" ? "none" : "inline-flex",
                  }}
                // onClick={handleWriteReview}
                >
                  WRITE A REVIEW
                </Link>
                {!user.isAuthenticated ? (
                  <a target="_self" href={`${process.env.REACT_APP_CLIENT_HOST}/signin`}>
                    SIGN IN
                  </a>
                ) : (
                  <>
                    <Link className="" to="/user">
                      MY ACCOUNT
                    </Link>
                    <Link className="" to="/logout">
                      LOGOUT
                    </Link>
                  </>
                )}
              </div>

              {user.isAuthenticated ? (
                <HeaderNav user={user} />
              ) : (
                <button type="button" className="hs-btn-get-start">
                  <Link to="/signup">Sign Up</Link>
                  {/* <a target="_self" href={`${process.env.REACT_APP_CLIENT_HOST}/signup`}>
                    GET STARTED
                  </a> */}
                </button>
              )}
            </div>
          </>
        )}
      </header>
      <div className="navigation">
        {/* <a
          target="_self"
          href={`${process.env.REACT_APP_NODE_CLIENT_HOST}/#why`}
        >
          WHY SIGN UP
        </a> */}
        {/* <HashLink to="/#why-sign-up" scroll={el => el.scrollIntoView({behavior: "smooth", block: "end"})}> */}
        <HashLink to="/#why-sign-up" scroll={el => scrollWithOffset(el, 200)}>
          WHY SIGN UP
        </HashLink>
        <HashLink to="/#how-it-works" scroll={el => scrollWithOffset(el, 200)}>
          How it Works
        </HashLink>
        <a target="_self" href={`/faq`}>
          Info
        </a>
        <Link to={`/resources/blog`}>Resources</Link>
        <Link to="/about-us">About Us</Link>
        {/* <Link to="/contact">CONTACT US</Link> */}
        <ContactMenu />
        <a target="_self" href={`/subscription`}>
          SUBSCRIPTION
        </a>
      </div>
    </div>
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
      <button
        type="button"
        ref={anchorRef}
        className="btn-get-start"
        style={{
          width: "auto",
          color: "#fff",
          padding: "0 15px",
        }}
        onClick={handleToggle}
      >
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

const mapStateToProps = (state: ApplicationState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(locationActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
