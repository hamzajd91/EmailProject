import React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../store";
import {Link} from "react-router-dom";
import urlGenerate from "../../../services/urlGenerate";
import "./index.scss";

const topProficiencies = [
  {name: ".Net Developer"},
  {name: "Agile"},
  {name: "Automated Software Testing"},
  {name: "AWS Consulting"},
  {name: "Azure Consulting"},
  {name: "BI Software"},
  {name: "CAD - Autodesk"},
  {name: "Cisco Cloud"},
  {name: "Computer Processing"},
  {name: "Computer Programing Services"},
  {name: "Computer Systems Analysis and Design"},
  {name: "CRM"},
  {name: "Cybersecurity"},
  {name: "Data Processing"},
  {name: "Epicor Consulting"},
  {name: "ERP"},
  {name: "Fortinet Firewall Consulting"},
  {name: "HCM"},
  {name: "Information Tecnology"},
  {name: "IRM (Information Right Management)"},
  {name: "MAS 90"},
  {name: "Mobile App Development iOS"},
  {name: "Office 365 Consulting"},
  {name: "PLM - Produc Lifecycle Management"},
  {name: "Jenkins"},
  {name: "Management Consulting Services"},
  {name: "Juniper Consulting"},
  {name: "Ruby on Rails Developer"},
  {name: "Quickbooks"},
  {name: "SAP Consulting"},
  {name: "Oracle Consulting"},
  {name: "SOC2"},
  {name: "Systems Engineers"},
  {name: "Avaya Consulting"},
  {name: "Web Development"},
  {name: "Workday Consulting"},
];

function Proficiencies(props: any) {
  return (
    <React.Fragment>
      <section className="proficiencies">
        <div className="container">
          <h3>Top Proficiencies</h3>
          <div className="row">
            {topProficiencies.map((proficiencies: any, index: any) => (
              <ProficienciesItem key={index} name={proficiencies.name} {...props} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function ProficienciesItem(props: any) {
  return (
    <div className="col-md-3">
      <Link
        className="top_proficiencies"
        to={`/proficiency/${urlGenerate(props.name)}?location=${props.location}&page=1`}
      >
        <p>{props.name}</p>
      </Link>
    </div>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    location: state.location.location,
  };
};

export default connect(mapStateToProps)(Proficiencies);
