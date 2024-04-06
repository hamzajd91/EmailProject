import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

import "./index.scss";
import Image1 from "../../images/services/service-1.png";
import Image2 from "../../images/services/service-2.png";
import Image3 from "../../images/services/service-3.png";
import Image4 from "../../images/services/service-4.png";
import Founder from "../../images/founder.jpg";
import lynn from "../../images/lynn.jpg";
import jamie from "../../images/jamie.jpg";
import greg from "../../images/greg.jpg";
import OurPlans from "../Landing/OurPlans";

import PageBlogComponent from "../PageBlogComponent";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface QuoteProps {
  author: string;
  quote: string;
  image: string;
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 2,
  adaptiveHeight: true,
  nextArrow: <KeyboardArrowRightIcon />,
  prevArrow: <KeyboardArrowLeftIcon />,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
  ],
};

function ForServiceFirms() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="There are millions of business professionals could come to Hindsyght every month to search, research, compare, and select service firms to work on their projects."
        />
        <title>Hindsyght - For Service Firms</title>
      </Helmet>
      <div className="for-service-firms">
        <WinMoreProjects />
        <hr style={{ marginTop: -70, marginBottom: 70 }} />
        <Steps />
      </div>
      <section className="our-plans-section">
        <OurPlans />
      </section>
      <div className="review_section">
        <div className="for-service-quote mt-0">
          <div className="container">
            <Slider {...settings}>
              <div>
                <Quote
                  author="Paul Tran, CEO and Founder"
                  quote="For all Professional Service firms, this is a better way to connect with business professionals, or potential clients, that are looking for your expertise, and at the same time, significantly reducing your firm’s sales & marketing budget"
                  image={Founder}
                />
              </div>
              <div>
                <Quote
                  author="Greg Meyer, Operations"
                  quote="Finding a qualified firm with specific skills is one of the hardest jobs of IT leaders. If you don’t have someone in your network to help with a suggestion, finding reliable information on the web is next to impossible"
                  image={greg}
                />
              </div>
              <div>
                <Quote
                  author="Lynn Tran, Marketing"
                  quote='Learning from Socrates “"The secret of change is to focus all of your energy, not on fighting the old, but on building the new." Finding a professional services firms that can be trusted to scale a project is a daunting task. There are only a few that ones can get from the personal network. And it’s never a sure thing. That was the old. The new approach to find the firms that will be a best fit for your project needs is on Hindsyght. That is the sure thing."'
                  image={lynn}
                />
              </div>
              <div>
                <Quote
                  author="Jamie Lohrungruang, Product Innovation & Customer Experience"
                  quote="Finding the right partner to work on your projects is tough. Especially if you have to balance your budget while delivering your project to meet high expectations. Often time, businesses stick with expensive large consulting firms because they do not want to take the risk on smaller firms that are equally as capable. As a former CIO and former consultant, I've seen challenges from both sides. Can't find a trusted consulting firm to work with a limited budget on one end. Can't get businesses to trust a smaller consulting firm enough to give us a shot. That is why I joined Hindsyght, in hope that we can help solve this problem."
                  image={jamie}
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <FindOutMore />
      <PageBlogComponent />
    </>
  );
}

export default ForServiceFirms;

function WinMoreProjects() {
  useEffect(() => {
    // setToken(localStorage.token);
  }, []);

  return (
    <section className="service-section mt-5 pt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <h1 className="hs-text2 typography-1 text-black">Win more projects</h1>
            <div className="body-1 mb-3">
              Millions of business professionals could come to Hindsyght every month to search, research, compare, and
              select service firms to work on their projects.
            </div>
          </div>
          <div className="col-md-6">
            <img src={Image1} alt="" className="img-fluid" srcSet="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  return (
    <>
      <section className="service-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={Image2} alt="" className="img-fluid" srcSet="" />
            </div>
            <div className="col-md-6 text-center">
              <h1 className="hs-text2 typography-1 text-black">Find out if you have been searched or researched</h1>
              <div className="body-1 mb-3">
                Use Hindsyght to identify who has been looking at your profile, and follow up with them directly to see how you can help.
              </div>
              <small>(only available for the Plus Subscription Plan)</small>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="steps">
        <div className="image-wrapper">
          <img src={Image2} alt="" srcSet="" />
        </div>
        <div className="right-section">
          <h3 className="hs-text2">
            Connect with millions of business professionals
          </h3>
          <div className="description">
            Claim your firms, start collecting reviews yourself or have us help
            you collecting reviews for you, and be ready to show your
            proficiencies and experience in front of potential millions
            professionals looking for your help.
          </div>
          <Link
            to="/"
            className="hindsyght-btn-primary hindsyght-btn-primary-lg2"
          >
            CLAIM YOUR FIRM
          </Link>
        </div>
      </section> */}

      <section className="service-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center">
              <h1 className="hs-text2 typography-1 text-black">Claim and showcase your storefront</h1>
              <div className="body-1 mb-3">
                Claim your firms, start collecting reviews yourself or have us help you collecting reviews for you, and
                be ready to show your proficiencies and experience in front of potential millions of professionals
                looking for your help.
              </div>
              {/* <small>(only available for the Plus Subscription Plan)</small> */}
            </div>
            <div className="col-md-6">
              <img src={Image3} alt="" className="img-fluid" srcSet="" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="steps steps-reverse">
        <div className="right-section">
          <h3 className="hs-text2">
            Find out if you have been searched or researched
          </h3>
          <div className="description">
            Use Hindsyght to identify potential business professionals so you
            can follow and find out if you can help them.
          </div>
          <Link
            to="/"
            className="hindsyght-btn-primary hindsyght-btn-primary-lg2"
          >
            CHECK LEADS
          </Link>
        </div>

        <div className="image-wrapper">
          <img src={Image3} alt="" srcSet="" />
        </div>
      </section> */}

      <section className="service-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={Image4} alt="" className="img-fluid" srcSet="" />
            </div>
            <div className="col-md-6 text-center">
              <h1 className="hs-text2 typography-1 text-black">
                Learn more about potential leads so you can win more projects
              </h1>
              <div className="body-1 mb-3">
                Increase your chances of winning more projects with Hindsyght’s LEADS reports.
              </div>
              <small>(only available for the Plus Subscription Plan)</small>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="steps">
        <div className="image-wrapper last">
          <img src={Image4} alt="" srcSet="" />
          <img src={Image5} alt="" srcSet="" />
        </div>

        <div className="right-section">
          <h3 className="hs-text2">
            Learn more about potential leads so you can win more projects
          </h3>
          <div className="description">
            Increase your chance of winning more projects by acquiring Hindsyght
            “LEADS“ reports
          </div>
          <Link
            to="/"
            className="hindsyght-btn-primary hindsyght-btn-primary-lg2"
          >
            GET YOUR REPORT
          </Link>
        </div>
      </section> */}
    </>
  );
}

function Quote({ author, quote, image }: QuoteProps) {
  return (
    <>
      <div className="quote">
        <div className="quote_img d-flex justify-content-start">
          <div className="author-img">
            <img className="founder" src={image} alt="" srcSet="" />
          </div>
          <h4>{author}</h4>
        </div>

        <div className="quote-section">
          {/* <img src={QuoteImage} alt="" srcSet="" className="open-quote" /> */}
          <div className="quote-description">"{quote}"</div>
          {/* <img src={QuoteImage} alt="" srcSet="" className="close-quote" /> */}
        </div>
      </div>
    </>
  );
}

function FindOutMore() {
  useEffect(() => {
    // setToken(localStorage.token);
  }, []);

  return (
    <div className="find-out-more">
      <h2 className="title">Find out more</h2>
      <button type="button" className="hs-btn ml-2">
        <Link to="/subscription" className="hindsyght-btn-primary hindsyght-btn-primary-lg2">
          GET STARTED
        </Link>
      </button>
    </div>
  );
}
