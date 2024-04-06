import React from "react";
import {Link} from "react-router-dom";
import sap from "../../../images/sap.svg";
import cloudMigration from "../../../images/cloud-migration.svg";
import business from "../../../images/business.svg";
import mobileAppDev from "../../../images/mobile-app-dev.svg";
import oracle from "../../../images/oracle.svg";
import salesforce from "../../../images/salesforce.svg";
import security from "../../../images/security.svg";
import webDevelopment from "../../../images/web-development.svg";
import {ApplicationState} from "../../../store";
import {connect} from "react-redux";
import urlGenerate from "../../../services/urlGenerate";
import "./index.scss";

const searches = [
  {image: sap, name: "SAP Consulting"},
  {image: oracle, name: "Oracle Consulting"},
  {image: salesforce, name: "Salesforce Consulting"},
  {image: cloudMigration, name: "Cloud Migration"},
  {image: webDevelopment, name: "Web Development"},
  {image: mobileAppDev, name: "Mobile App Development"},
  {image: security, name: "Cybersecurity"},
  {image: business, name: "Business Intelligence"},
];

function PopularSearches(props: any) {
  return (
    <section className="popular-searches">
      <div className="container">
        <h3>Popular Searches</h3>
        <div className="row">
          {searches.map((search: any, index: any) => (
            <PopularSearchesBlock key={index} image={search.image} name={search.name} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PopularSearchesBlock(props: any) {
  return (
    <React.Fragment>
      <div className="col-md-3">
        <Link className="popular-card" to={`/proficiency/${urlGenerate(props.name)}?location=${props.location}&page=1`}>
          <img src={props.image} alt={props.name} />
          <h6>{props.name}</h6>
        </Link>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    location: state.location.location,
  };
};

export default connect(mapStateToProps)(PopularSearches);
