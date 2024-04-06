import React from "react";
import { Helmet } from "react-helmet";
import bannerImage from "../../images/home_page/frame.png";
import summerline from "../../images/home_page/company/summerline.jpeg";
import techminds from "../../images/home_page/company/techminds.jpeg";
import homeTwo from "../../images/home_page/normal/two.png";
import homeThree from "../../images/home_page/normal/three.png";
import phoneTwo from "../../images/home_page/phone/two.png";
import phoneThree from "../../images/home_page/phone/three.png";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Dialog from "@material-ui/core/Dialog";
import * as _ from "lodash";
import "./index.scss";
import { searchCompany } from "../../store/ducks/companies/actions";
import SearchComponent from "../SearchComponent";
import Testimonials from "./Testimonials";
import { ApplicationState } from "../../store";
import StorageService from "../../services/StorageService";

function HomePage(props: any) {
  const infoSection = React.createRef<HTMLDivElement>();
  const bussinessSection = React.createRef<HTMLDivElement>();
  const homeSection = React.createRef<HTMLDivElement>();
  const [displayInfoImage, setDisplayInfoImage] = React.useState(false);
  const [displayBussinessImage, setDisplayBussinessImage] = React.useState(false);
  const [displayHomeImage, setDisplayHomeImage] = React.useState(true);
  const isAuthenticated = Object.keys(StorageService.getUser()).length !== 0 ? true : false;

  const [video1Modal, setVideo1Modal] = React.useState(false);
  const [video2Modal, setVideo2Modal] = React.useState(false);

  window.addEventListener("scroll", function (ev) {
    if (homeSection.current) {
      const infoSec = homeSection.current.getBoundingClientRect();
      const topPer = infoSec.top;
      if (_.inRange(topPer, -50, 50)) {
        setDisplayHomeImage(true);
        setDisplayInfoImage(false);
        setDisplayBussinessImage(false);
      }
    }

    if (bussinessSection.current) {
      const infoSec = bussinessSection.current.getBoundingClientRect();
      const topPer = infoSec.top - 190;
      if (_.inRange(topPer, -50, 50)) {
        setDisplayBussinessImage(true);
        setDisplayInfoImage(false);
        setDisplayHomeImage(false);
      }
    }

    if (infoSection.current) {
      const infoSec = infoSection.current.getBoundingClientRect();
      const topPer = infoSec.top - 145;
      if (_.inRange(topPer, -50, 50)) {
        setDisplayInfoImage(true);
        setDisplayBussinessImage(false);
        setDisplayHomeImage(false);
      }
    }
  });

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta
          property="og:site_name"
          content="Hindsyght - The go-to platform for connecting IT services and solutions with businesses across the nation."
        />
        <meta property="og:url" content={window.location.href} />
        <meta
          name="description"
          content="Tackle your IT project head on with Hindsyght. The go-to platform for connecting IT services and solutions with businesses across the nation."
        />
      </Helmet>
      <div className="sticky-container">
        <div className="phone-sticky">
          <div className="phone-wrapper">
            <img src={bannerImage} alt="" className="phone claytest" />

            <div className="phone-screen hindv">
              <div className={`home home_video ${displayHomeImage ? "opc" : ""}`}>
                <video loop={true} autoPlay muted>
                  <source src={`${process.env.REACT_APP_S3_BUCKET}/videos/tag-and-thank-your-it-hero.mov`} />
                  <source src={`${process.env.REACT_APP_S3_BUCKET}/videos/tag-and-thank-your-it-hero.mov`} />
                </video>
                <button className="play_btn" onClick={() => setVideo2Modal(true)}>
                  <PlayArrowIcon />
                </button>
              </div>
              <div className={`info ${displayInfoImage ? "opc" : ""}`}>
                <img src={homeThree} className="img-fluid" />
              </div>
              <div className={`bussiness ${displayBussinessImage ? "opc" : ""}`}>
                <img src={homeTwo} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
        <div className="home_banner" ref={homeSection}>
          <div className="home_container">
            <div className="w-layout-grid two-col-grid">
              <div className="content-block">
                <div className="info_block">
                  <h1>
                    Hindsyght Helps You Find
                    <br />
                    <span className="heading_bg_image">RELIABLE IT FIRMS</span>
                    <br />
                    For Your BUSINESS
                  </h1>
                  <p className="mt-4">
                    Are you struggling to find an IT firm with the right skills for your next project? User our proven platform to find
                    your next IT partner and not just another contractor.
                  </p>
                  <div className="info_btns">
                    {isAuthenticated ? (<a href={`${process.env.REACT_APP_CLIENT_HOST}#search`} className="mr-2">
                      GET STARTED
                    </a>) : (<a href={`${process.env.REACT_APP_CLIENT_HOST}/signup`} className="mr-2">
                      GET STARTED
                    </a>)}

                    <button onClick={() => setVideo1Modal(true)}>
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24.67"
                        height="24.67"
                        viewBox="0 0 24.67 24.67"
                      >
                        <path
                          d="M12.335,24.67A12.335,12.335,0,0,1,3.613,3.613,12.335,12.335,0,0,1,21.057,21.057,12.254,12.254,0,0,1,12.335,24.67ZM9.694,8A.693.693,0,0,0,9,8.7V17.58a.693.693,0,0,0,1.049.6L17.4,13.736a.7.7,0,0,0,0-1.2L10.049,8.1A.69.69,0,0,0,9.694,8Z"
                          fill="#fff"
                        />
                      </svg>
                      Watch Video
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-phone">
          <div className="phone-wrapper">
            <img src={bannerImage} alt="" className="phone claytest" />

            <div className="phone-screen hindv">
              <div className={`home home_video opc`}>
                <video loop={true} autoPlay muted>
                  <source src={`${process.env.REACT_APP_S3_BUCKET}/videos/tag-and-thank-your-it-hero.mov`} />
                  <source src={`${process.env.REACT_APP_S3_BUCKET}/videos/tag-and-thank-your-it-hero.mov`} />
                </video>
                <button className="play_btn" onClick={() => setVideo2Modal(true)}>
                  <PlayArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home--section" id="search">
          <div className="home--container">
            <div className="w-layout-grid two-col-grid">
              <div className="content-block">
                <div className="logo_sections">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <img src={summerline} className="img-fluid" />
                    </div>
                    <div className="col-md-3">
                      <img src={techminds} className="img-fluid" />
                    </div>
                  </div>
                </div>
                <SearchComponent error={props.error} classess="" searchCompany={props.searchCompany} />
              </div>
            </div>
          </div>
        </div>

        <div className="info_sections" ref={infoSection}>
          <div className="mobile_phone_d">
            <img src={phoneTwo} className="img-fluid" />
          </div>
          <div className="home--section">
            <div className="home--container">
              <div className="w-layout-grid two-col-grid">
                <div className="content-block">
                  <h2>Bringing Businesses & IT Firms Together</h2>
                  <p className="mb-5">
                    Your business needs a quality IT service firm that you can trust. Hindsyght innovative platform does
                    the work for you!
                  </p>
                  <h3>FIND YOUR BEST FIT FAST</h3>
                  <p className="mb-4">
                    Relying solely on service firms in your network and taking months to create a shortlist is a hassle.
                    Connect with local service firms whose skills match your needs quicker than ever.
                  </p>
                  <h3>STAY WITHIN YOUR BUDGET</h3>
                  <p className="mb-4">
                    Hindsyght provides you with service firms of all sizes who have stellar track records. Make your
                    decision based on authentic reviews and avoid spending money on someone else to redo the job.
                  </p>
                  <h3>GET HIGH QUALITY RESULTS</h3>
                  <p className="mb-4">
                    Working with local, vetted service firms means you’re working with a team of experts. They have
                    years of experience and deliver successful work on time.
                  </p>
                  <h4>
                    1,000,000+
                    <br />
                    Company Results
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home--container" ref={bussinessSection} id="how-it-works">
          <div className="w-layout-grid two-col-grid">
            <div className="content-block">
              <div className="business_firm_section">
                <h2>HINDSYGHT for Businesses</h2>
                <div className="steps mt-5">
                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="76.165"
                        height="73.762"
                        viewBox="0 0 76.165 73.762"
                      >
                        <g id="Group_343" data-name="Group 343" transform="translate(-409.383 -3625)">
                          <g id="magnifying-glass" transform="translate(409.383 3625)">
                            <path
                              id="Path_28"
                              data-name="Path 28"
                              d="M86.232,79.523,67.922,61.79a30.385,30.385,0,0,0,7.275-19.7C75.2,24.924,60.818,11,43.1,11,25.363,11,11,24.924,11,42.085S25.363,73.171,43.1,73.171a32.571,32.571,0,0,0,20.331-7.03L81.74,83.858a3.244,3.244,0,0,0,4.492,0A2.985,2.985,0,0,0,86.232,79.523ZM43.1,66.984c-14.192,0-25.725-11.17-25.725-24.9S28.907,17.172,43.1,17.172c14.176,0,25.725,11.185,25.725,24.913S57.274,66.984,43.1,66.984Z"
                              transform="translate(-11 -11)"
                              fill="#00293d"
                            />
                          </g>
                          <g id="Group_338" data-name="Group 338" transform="translate(424.292 3653.203)">
                            <circle
                              id="Ellipse_4"
                              data-name="Ellipse 4"
                              cx="4.339"
                              cy="4.339"
                              r="4.339"
                              transform="translate(0 0)"
                              fill="#00293d"
                            />
                            <circle
                              id="Ellipse_4-2"
                              data-name="Ellipse 4"
                              cx="4.339"
                              cy="4.339"
                              r="4.339"
                              transform="translate(13.017 0)"
                              fill="#00293d"
                            />
                            <circle
                              id="Ellipse_4-3"
                              data-name="Ellipse 4"
                              cx="4.339"
                              cy="4.339"
                              r="4.339"
                              transform="translate(26.034 0)"
                              fill="#00293d"
                            />
                          </g>
                        </g>
                      </svg>
                      <span className="number">1</span>
                    </div>
                    <div className="other_info">
                      <h3>SEARCH</h3>
                      <p>
                        Type in the skills you need and our platform does the rest. Look through listed service firms in
                        your area and create your shortlist.
                      </p>
                    </div>
                  </div>

                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="82.086"
                        height="81.926"
                        viewBox="0 0 82.086 81.926"
                      >
                        <g id="Group_339" data-name="Group 339" transform="translate(-904.51 -2725.619)">
                          <g id="Group_82" data-name="Group 82" transform="translate(904.51 2725.619)">
                            <g id="Group_79" data-name="Group 79" transform="translate(29.019)">
                              <path
                                id="Path_35"
                                data-name="Path 35"
                                d="M193.024,24.549a12.024,12.024,0,1,1,12.024-12.024A12.038,12.038,0,0,1,193.024,24.549Z"
                                transform="translate(-181 -0.5)"
                                fill="#00293d"
                              />
                            </g>
                            <g id="Group_80" data-name="Group 80" transform="translate(0 50.655)">
                              <path
                                id="Path_36"
                                data-name="Path 36"
                                d="M1.607,334.5a12.025,12.025,0,1,1,16.428,4.4,12.04,12.04,0,0,1-16.428-4.4Z"
                                transform="translate(0 -316.455)"
                                fill="#00293d"
                              />
                            </g>
                            <g id="Group_81" data-name="Group 81" transform="translate(58.035 50.655)">
                              <path
                                id="Path_37"
                                data-name="Path 37"
                                d="M368,338.9a12.024,12.024,0,1,1,16.428-4.4A12.021,12.021,0,0,1,368,338.9Z"
                                transform="translate(-361.987 -316.455)"
                                fill="#00293d"
                              />
                            </g>
                          </g>
                          <g id="Group_83" data-name="Group 83" transform="translate(909.536 2741.287)">
                            <path
                              id="Path_38"
                              data-name="Path 38"
                              d="M36.152,126.659l-4.8-.263A36.208,36.208,0,0,1,47.608,98.223l2.64,4.021A31.4,31.4,0,0,0,36.152,126.659Z"
                              transform="translate(-31.352 -98.223)"
                              fill="#00293d"
                            />
                          </g>
                          <g id="Group_84" data-name="Group 84" transform="translate(962.673 2741.287)">
                            <path
                              id="Path_39"
                              data-name="Path 39"
                              d="M376.883,126.66a31.4,31.4,0,0,0-14.1-24.415l2.64-4.021A36.207,36.207,0,0,1,381.683,126.4Z"
                              transform="translate(-362.787 -98.224)"
                              fill="#00293d"
                            />
                          </g>
                          <g id="Group_85" data-name="Group 85" transform="translate(929.292 2799.388)">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              d="M170.835,468.782a35.722,35.722,0,0,1-16.261-3.863l2.17-4.293a31.457,31.457,0,0,0,28.182,0l2.17,4.293A35.721,35.721,0,0,1,170.835,468.782Z"
                              transform="translate(-154.574 -460.626)"
                              fill="#00293d"
                            />
                          </g>
                        </g>
                      </svg>

                      <span className="number">2</span>
                    </div>
                    <div className="other_info">
                      <h3>CONNECT</h3>
                      <p>
                        Hindsyght makes service firms’ contact information available so you can reach out to those on
                        your shortlist. Manage your preferred service firms on the platform by creating an account with
                        us.
                      </p>
                    </div>
                  </div>

                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="77.546" height="78" viewBox="0 0 77.546 78">
                        <path
                          id="Subtraction_10"
                          data-name="Subtraction 10"
                          d="M19.386,78a2.784,2.784,0,0,1-.3-.017,2.747,2.747,0,0,1-1.858-1.027,2.779,2.779,0,0,1-.591-2.047L18.14,61.286H8.308a8.258,8.258,0,0,1-5.875-2.448A8.356,8.356,0,0,1,0,52.929V8.357A8.36,8.36,0,0,1,5.074.657,8.215,8.215,0,0,1,8.308,0H69.237a8.258,8.258,0,0,1,5.875,2.448,8.356,8.356,0,0,1,2.433,5.909V52.929a8.36,8.36,0,0,1-5.074,7.7,8.215,8.215,0,0,1-3.234.657H38.914l-17.675,16A2.757,2.757,0,0,1,19.386,78ZM38.772,42.739h0a2.988,2.988,0,0,1,1.391.345l9.262,4.9a1.186,1.186,0,0,0,.553.137,1.174,1.174,0,0,0,.7-.228,1.189,1.189,0,0,0,.472-1.168L49.381,36.35a3.018,3.018,0,0,1,.86-2.662l7.493-7.348a1.2,1.2,0,0,0-.658-2.037L46.72,22.789a2.991,2.991,0,0,1-2.251-1.645l-4.632-9.438a1.185,1.185,0,0,0-2.13,0l-4.631,9.438a2.991,2.991,0,0,1-2.251,1.645L20.47,24.3a1.2,1.2,0,0,0-.658,2.037l7.493,7.347a3.018,3.018,0,0,1,.86,2.662L26.4,46.722a1.19,1.19,0,0,0,.472,1.168,1.182,1.182,0,0,0,1.251.091l9.262-4.9A2.988,2.988,0,0,1,38.772,42.739Z"
                          fill="#00293d"
                        />
                      </svg>

                      <span className="number">3</span>
                    </div>
                    <div className="other_info">
                      <h3>REVIEW</h3>
                      <p>
                        After you’ve worked with your selected service firm, add a review on Hindsyght. Help out your
                        peers by describing your firsthand experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mobile_phone_d">
                  <img src={phoneThree} className="img-fluid" />
                </div>

                <h2 className="mt-5">HINDSYGHT for IT Firms</h2>
                <div className="steps mt-5">
                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_4">
                      <svg
                        id="notification"
                        xmlns="http://www.w3.org/2000/svg"
                        width="67.955"
                        height="77.318"
                        viewBox="0 0 67.955 77.318"
                      >
                        <path
                          id="Path_43"
                          data-name="Path 43"
                          d="M197.658,473.8a11.341,11.341,0,0,0,10.377-6.8H187.281A11.341,11.341,0,0,0,197.658,473.8Z"
                          transform="translate(-163.681 -396.478)"
                          fill="#00293d"
                        />
                        <path
                          id="Path_44"
                          data-name="Path 44"
                          d="M88.383,37.43V32.467a23.448,23.448,0,0,0-16.611-22.4V6.8a6.8,6.8,0,1,0-13.591,0v3.272a23.448,23.448,0,0,0-16.611,22.4V37.43a35.567,35.567,0,0,1-9.941,24.729,2.265,2.265,0,0,0,1.635,3.833H96.689a2.265,2.265,0,0,0,1.635-3.833A35.568,35.568,0,0,1,88.383,37.43ZM67.242,9.171c-.746-.072-1.5-.11-2.265-.11s-1.52.038-2.265.11V6.8a2.265,2.265,0,0,1,4.53,0Z"
                          transform="translate(-30.999)"
                          fill="#00293d"
                        />
                        <path
                          id="Path_45"
                          data-name="Path 45"
                          d="M398.781,76.2a2.265,2.265,0,1,0,4.53,0,33.755,33.755,0,0,0-9.952-24.026,2.265,2.265,0,0,0-3.2,3.2A29.254,29.254,0,0,1,398.781,76.2Z"
                          transform="translate(-335.356 -43.729)"
                          fill="#00293d"
                        />
                        <path
                          id="Path_46"
                          data-name="Path 46"
                          d="M33.265,78.462A2.265,2.265,0,0,0,35.53,76.2a29.255,29.255,0,0,1,8.625-20.822,2.265,2.265,0,1,0-3.2-3.2A33.755,33.755,0,0,0,31,76.2,2.265,2.265,0,0,0,33.265,78.462Z"
                          transform="translate(-31 -43.729)"
                          fill="#00293d"
                        />
                      </svg>

                      <span className="number">1</span>
                    </div>
                    <div className="other_info">
                      <h3>SUBSCRIBE</h3>
                      <p>
                        Choose the plan that best suits your needs and budget. Upgrade at any time to keep up with your growing business.
                      </p>
                    </div>
                  </div>

                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_5">
                      <svg
                        id="Group_89"
                        data-name="Group 89"
                        xmlns="http://www.w3.org/2000/svg"
                        width="96"
                        height="69.852"
                        viewBox="0 0 96 69.852"
                      >
                        <path
                          id="Path_49"
                          data-name="Path 49"
                          d="M75.011,136.5h-20.6V115.69h6.807a2.129,2.129,0,0,0,1.726-3.374L49.707,93.994a2.11,2.11,0,0,0-3.433,0L33.033,112.316a2.124,2.124,0,0,0,1.726,3.374h6.807V136.5H18.5C8.2,135.933,0,126.3,0,115.866A19.541,19.541,0,0,1,9.69,99a13.1,13.1,0,0,1-.8-4.571,13.286,13.286,0,0,1,13.3-13.3,13.072,13.072,0,0,1,4.551.8,26.625,26.625,0,0,1,50.589,8.788C87.938,92.543,96,102.37,96,113.493,96,125.38,86.741,135.678,75.011,136.5Z"
                          transform="translate(0 -66.65)"
                          fill="#00293d"
                        />
                      </svg>

                      <span className="number">2</span>
                    </div>
                    <div className="other_info">
                      <h3>UPLOAD</h3>
                      <p>
                        Upload your IT firm details such as an overview, proficiencies and contact information. Top it
                        up with photos showcasing your company and resources.
                      </p>
                    </div>
                  </div>

                  <div className="step d-flex align-items-center">
                    <div className="number_info bg_6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="82.086"
                        height="81.926"
                        viewBox="0 0 82.086 81.926"
                      >
                        <g id="Group_623" data-name="Group 623" transform="translate(-904.51 -2725.619)">
                          <g id="Group_82" data-name="Group 82" transform="translate(904.51 2725.619)">
                            <g id="Group_79" data-name="Group 79" transform="translate(29.019)">
                              <path
                                id="Path_35"
                                data-name="Path 35"
                                d="M193.024,24.549a12.024,12.024,0,1,1,12.024-12.024A12.038,12.038,0,0,1,193.024,24.549Z"
                                transform="translate(-181 -0.5)"
                                fill="#00293d"
                              />
                            </g>
                            <g id="Group_80" data-name="Group 80" transform="translate(0 50.655)">
                              <path
                                id="Path_36"
                                data-name="Path 36"
                                d="M1.607,334.5a12.025,12.025,0,1,1,16.428,4.4,12.04,12.04,0,0,1-16.428-4.4Z"
                                transform="translate(0 -316.455)"
                                fill="#00293d"
                              />
                            </g>
                            <g id="Group_81" data-name="Group 81" transform="translate(58.035 50.655)">
                              <path
                                id="Path_37"
                                data-name="Path 37"
                                d="M368,338.9a12.024,12.024,0,1,1,16.428-4.4A12.021,12.021,0,0,1,368,338.9Z"
                                transform="translate(-361.987 -316.455)"
                                fill="#00293d"
                              />
                            </g>
                          </g>
                          <g id="Group_83" data-name="Group 83" transform="translate(909.536 2741.287)">
                            <path
                              id="Path_38"
                              data-name="Path 38"
                              d="M36.152,126.659l-4.8-.263A36.208,36.208,0,0,1,47.608,98.223l2.64,4.021A31.4,31.4,0,0,0,36.152,126.659Z"
                              transform="translate(-31.352 -98.223)"
                              fill="#00293d"
                            />
                          </g>
                          <g id="Group_84" data-name="Group 84" transform="translate(962.673 2741.287)">
                            <path
                              id="Path_39"
                              data-name="Path 39"
                              d="M376.883,126.66a31.4,31.4,0,0,0-14.1-24.415l2.64-4.021A36.207,36.207,0,0,1,381.683,126.4Z"
                              transform="translate(-362.787 -98.224)"
                              fill="#00293d"
                            />
                          </g>
                          <g id="Group_85" data-name="Group 85" transform="translate(929.292 2799.388)">
                            <path
                              id="Path_40"
                              data-name="Path 40"
                              d="M170.835,468.782a35.722,35.722,0,0,1-16.261-3.863l2.17-4.293a31.457,31.457,0,0,0,28.182,0l2.17,4.293A35.721,35.721,0,0,1,170.835,468.782Z"
                              transform="translate(-154.574 -460.626)"
                              fill="#00293d"
                            />
                          </g>
                        </g>
                      </svg>

                      <span className="number">6</span>
                    </div>
                    <div className="other_info">
                      <h3>CONNECT</h3>
                      <p>
                        Receive and respond to calls and emails from businesses. Increase your client base and revenue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Testimonials />

      <Dialog fullWidth={true} maxWidth={`md`} open={video1Modal} onClose={() => setVideo1Modal(false)}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/G9EW-O8JaSw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Dialog>

      <Dialog fullWidth={true} maxWidth={`md`} open={video2Modal} onClose={() => setVideo2Modal(false)}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/ieoQaobQ76M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state: ApplicationState) => ({
  error: state.companies.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCompany: (params: any) => dispatch(searchCompany(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
