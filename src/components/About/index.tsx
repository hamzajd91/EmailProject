import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import "./index.scss";
import SearchComponent from "../shared/SearchComponent";

import about_top from "../../images/about/about_top.png";
import logo from "../../images/navbar/logo.svg";

import Paul from "../../images/about/paul.jpeg";
import Lynn from "../../images/about/lynn.jpeg";
import Jamie from "../../images/about/jamie.jpeg";
import Greg from "../../images/greg.png";
import Tuan from "../../images/about/tuan.jpeg";

import Twitter from "../../images/twitter.svg";
import Facebook from "../../images/facebook.svg";
import LinkedIn from "../../images/linkedin.svg";

import { searchCompany } from "../../store/ducks/companies/actions";
import PageBlogComponent from "../PageBlogComponent";

interface DispatchProps {
  searchCompany(params: any): void;
}

type Props = DispatchProps;

const teamMembers = [
  { name: "Paul Tran", image: Paul, designation: "PRESIDENT & CEO", link: "https://www.linkedin.com/in/paultranunisap/" },
  {
    name: "Jamie Lohrungruang",
    image: Jamie,
    designation: "PRODUCT INNOVATION & CUSTOMER EXPERIENCE",
    link: "https://www.linkedin.com/in/jamie-lohrungruang/",
  },
  { name: "Lynn Tran", image: Lynn, designation: "MARKETING", link: "https://www.linkedin.com/in/lynn-tran-4885673/" },
  { name: "Greg Meyer", image: Greg, designation: "OPERATIONS", link: "https://www.linkedin.com/in/greg-meyer-83769b8/" },
  {
    name: "Tuan Le",
    image: Tuan,
    designation: "TECHNOLOGY",
    link: "https://www.linkedin.com/in/tuan-le-hindsyght-151736180/ ",
  },
];

function About(props: Props) {
  // eslint-disable-next-line no-shadow
  const { searchCompany } = props;
  return (
    <React.Fragment>
      <div className="about_us_title">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-md-6 mt-5 mb-5">
              <img src={about_top} className="img-fluid" />
            </div> */}
            <div className="col-12 mt-5 mb-5 text-center">
              <div className="welcome_text">
                Welcome to <img src={logo} />
              </div>
              <p>
                The most effective platform to connect professional service firms and businesses together to get
                projects done right. We are providing the hindsight that you need, whether you are a business looking
                for a trusted professional service firms, or a firm looking for a project that you can successfully
                deliver.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="about_serach">
        <SearchComponent link error={false} classess="landing" searchCompany={searchCompany} />
      </div> */}

      <div className="connection_section">
        <div className="container">
          {/* <h3 className="connection_header">It’s All About Connections</h3> */}
          <div className="row">
            <div className="col-md-6 mt-3 mb-3">
              <div className="about_what_we_do">
                <label>What We Do</label>
                <p>
                  Hindsyght is a B2B marketplace that connects professional services firms with businesses, helping both
                  sides achieve their goals of economy and scale.
                </p>
                <p>
                  For service providers, we level the playing field so that you can stand head-to-head with your biggest
                  competitors, gain visibility, and grow in your industry niche.
                </p>
                <p className="mb-0">
                  For businesses, the Hindsyght platform provides access to a dedicated community of providers, reviews,
                  and detailed insights that help you make informed buying decisions.
                </p>
              </div>
            </div>

            {/* <div className="col-md-6 mt-3 mb-3">
              <div className="benefits_to_service">
                <div className="text-right">
                  <label>Benefits to Service Providers</label>
                </div>
                <p>
                  For service providers, the Hindsyght platform puts you in front of companies that are looking to buy
                  what you’re selling. If you are a small company, you’re often competing against the “big guns” in your
                  space, their sales teams, and their massive marketing budgets, making it exceedingly difficult to win
                  the jobs you want and scale up to the next level.
                </p>
                <p className="mb-0">
                  Whether you are new or well-established and looking to scale, our platform gives you a presence in a
                  dedicated environment, one that isn’t diluted with software reviews and providers or putting you in
                  front of people who aren’t likely to buy.
                </p>
              </div>
            </div> */}
            <div className="col-md-6 mt-3 mb-3">
              <div className="benefits_to_service">
                <div className="text-right">
                  <label>Who We Are</label>
                </div>
                <p>
                  Hindsyght was created by a team of passionate IT and business professionals, each of whom has intimate knowledge of the challenges and limitations faced by the professional services community of today. We hail from both sides of the proverbial fence, and we know how difficult it can be to see a project through to successful completion.
                </p>
                <p>
                  With a combined XXX years of experience in the IT services industry, our team is passionate about sharing our expert knowledge with others, as well as using that expertise to help solve some of the issues facing IT project management today.
                </p>
                <p>
                  What this all boils down to is – we want you to know we speak your language. We’ve walked the walk, we know what the best-case scenario looks like, and that’s what we bring to the table.
                </p>
                <p className="mb-0">
                  Reach out today to learn more about us and what a little Hindsyght can do for you.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="row">
             <div className="col-md-6 mt-3 mb-3">
              <div className="about_what_we_do">
                <label>Benefits to Businesses</label>
                <p>
                  For CIOs or other business executives looking to hire a professional service firm, our ultimate goal
                  is to help you make smarter business decisions and save you money by avoiding failed projects.
                </p>
                <p>
                  Searching and selecting a service provider requires lots of time and effort. Many large projects fail,
                  either because they are over budget, delivered late, or under-delivered from the start.
                </p>
                <p>
                  For enterprise-level projects especially, this is a serious concern as the spend can be into the
                  millions of dollars or more. With such huge losses at stake, it is all the more critical to partner
                  with the right firm for your needs.
                </p>
                <p>
                  Our mission is to solve these problems for you. Hindsyght opens up a world of possibilities in a fully
                  transparent, easy-to-use platform that gives you direct access to providers of all sizes and areas of
                  expertise. In addition to offering access to company profiles, reviews, and direct contact
                  information, we load you up with informative materials and tips to help you optimize your efforts.
                </p>
                <p className="mb-0">
                  Choosing the right company for the job helps you bring solutions to market faster, enables scale, and
                  sends value straight to the bottom line. Ultimately, it’s about hiring the best service firm for your
                  needs. Saving time, resources, and the peace of mind that comes with a successful outcome – that’s
                  just the icing on the cake.
                </p>
              </div>
            </div>

            <div className="col-md-6 mt-3 mb-3">
              <div className="benefits_to_service">
                <div className="text-right">
                  <label>Who We Are</label>
                </div>
                <p>
                  Hindsyght was created by a team of passionate IT and business professionals, each of whom has intimate
                  knowledge of the challenges and limitations faced by the professional services community of today. We
                  hail from both sides of the proverbial fence, and we know how difficult it can be to see a project
                  through to successful completion.
                </p>
                <p>
                  What this all boils down to is – we want you to know we speak your language. We’ve walked the walk, we
                  know what the best-case scenario looks like, and that’s what we bring to the table.
                </p>
                <p>
                  It’s quite simple. We give small-to-mid-sized service firms access to opportunities they don’t have
                  today. We help businesses make smarter decisions, get their projects completed faster and at greater
                  value. Why? Because there’s nothing we like better than seeing a plan come together.
                </p>
                <p className="mb-0">
                  Reach out today to learn more about us and what a little Hindsyght can do for you.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="vission_mission_section"></div>
      <div className="vission_mission_block">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="vission">
                <div className="text-right">
                  <label>Vision</label>
                </div>
                <p>We give businesses the power of information that drives project success.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mission">
                <div className="text-left">
                  <label>Mission</label>
                </div>
                <p>
                  To provide the best platform that quickly connects businesses to services firms with tools and
                  guidance that lead to effective partnership and successful project execution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="our_team_title">
        <h3>Our Team</h3>
      </div>

      <div className="our_team">
        <div className="container">
          <div className="row">
            {teamMembers.map((member: any, index: any) => {
              return <TeamMember {...member} key={index} />;
            })}
          </div>
        </div>
        <div className="container mt-5">
          <div className="join_social">
            <div id="our-team" className="content-wrapper">
              <h4>Join Hindsyght on social</h4>
              <div className="social">
                <a href="https://www.facebook.com/Hindsyght-354232868544454/" target="_blank" rel="noopener noreferrer">
                  <img src={Facebook} alt="" srcSet="" />
                </a>
                <a href="https://twitter.com/hindsyght" target="_blank" rel="noopener noreferrer">
                  <img src={Twitter} alt="" srcSet="" />
                </a>
                <a href="https://www.linkedin.com/company/hindsyght/about/" target="_blank" rel="noopener noreferrer">
                  <img src={LinkedIn} alt="" srcSet="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <PageBlogComponent />
    </React.Fragment>
  );
}

function TeamMember(props: any) {
  const { name, designation, image, link } = props;
  return (
    <React.Fragment>
      <div className="col-md-6">
        <div className="team_member">
          <div className="team_image">
            <img src={image} />
          </div>
          <div className="team_info">
            <span>{name}</span>
            <span className="designation">{designation}</span>
          </div>
          <a href={link} target="_blank" className="linked_in_link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="144px" height="144px">
              <path
                fill="#fff"
                d="M8.421,14h0.052l0,0C11.263,14,13,12,13,9.5C12.948,6.945,11.263,5,8.526,5S4,6.945,4,9.5	C4,12,5.736,14,8.421,14z M4,17h9v26H4V17z M44,26.5c0-5.247-4.253-9.5-9.5-9.5c-3.053,0-5.762,1.446-7.5,3.684V17h-9v26h9V28l0,0	c0-2.209,1.791-4,4-4s4,1.791,4,4v15h9C44,43,44,27.955,44,26.5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCompany: (params: any) => dispatch(searchCompany(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
