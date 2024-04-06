import React from "react";
import StepTwo from "../Components/StepTwo";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";

function OracleConsulting(props: any) {
  return (
    <React.Fragment>
      <div className="proficiency_statics proficiency_statics_bg pt-5 pb-5">
        <div className="container">
          <h2 className="mb-3">What is Oracle?</h2>
          <p>
            In 1977, three engineers Larry Ellison, Bob Miner, and Ed Oates found Software Development Laboratories.
            Their first office is 900-square-feet in Santa Clara, California.
          </p>
          <p>
            In 1982, the company changes its name to Oracle Corporation from Relational Software Inc. (formerly SDL).
          </p>
          <p>In 1986, Oracle becomes a publicly traded company on the NASDAQ exchange.</p>
          <p>
            Today, Oracle Emerging technologies are disrupting old paradigms and unleashing new opportunities. Oracle
            has embedded innovative technologies in every aspect of cloud technology, enabling companies to reimagine
            their businesses, processes, and experiences. With the introduction of Oracle Autonomous Database, the
            industry’s only self-driving, self-securing, and self-repairing database, Oracle is again revolutionizing
            how data is managed. Oracle is the #1 provider of business software, with a broad portfolio of solutions for
            companies of all sizes. Today, 430,000 customers in 175 countries use Oracle technologies to seize business
            opportunities and solve real, tangible challenges. See the below Oracle products offering.
          </p>
          <div className="row">
            <div className="col-md-6">
              <h3>Generation 2 Cloud Infrastructure</h3>
              <ul className="pl-3">
                <li>Autonomous Database</li>
                <li>Data Management</li>
                <li>Analytics</li>
                <li>Compute</li>
                <li>Cloud@Customer</li>
                <li>Application Development</li>
                <li>Architecture and Regions</li>
                <li>MarketPlace</li>
                <li>All Cloud Infrastructure</li>
              </ul>
              <h3>Cloud Applications</h3>
              <ul className="pl-3">
                <li>Enterprise Resource Planning</li>
                <li>Human Capital Management</li>
                <li>Supply Chain Management</li>
                <li>Sales</li>
                <li>Service</li>
                <li>Marketing</li>
                <li>Data Cloud</li>
                <li>NetSuite Application Suite</li>
                <li>All Cloud Applications</li>
              </ul>
              <h3>On-Premise Infrastructure</h3>
              <ul className="pl-3">
                <li>Oracle Database</li>
                <li>Java</li>
                <li>Software</li>
                <li>Hardware</li>
              </ul>
              <h3>Government Cloud</h3>
              <h3>Artificial Intelligence</h3>
              <h3>Blockchain</h3>
            </div>

            <div className="col-md-6">
              <h3>On-Premise Applications</h3>
              <ul className="pl-3">
                <li>
                  E-Business Suite
                  <ul className="pl-3 mt-2 mb-2">
                    <li>Financials</li>
                    <li>Supply Chain Management</li>
                    <li>Human Resources</li>
                    <li>Customer Relationship Management</li>
                  </ul>
                </li>
                <li>
                  Peoplesoft
                  <ul className="pl-3 mt-2 mb-2">
                    <li>Financials</li>
                    <li>Supply Chain Management</li>
                    <li>Human Resources</li>
                    <li>Customer Relationship Management</li>
                  </ul>
                </li>
                <li>
                  JD Edwards
                  <ul className="pl-3 mt-2 mb-2">
                    <li>Financials</li>
                    <li>Supply Chain Management</li>
                    <li>Human Resources</li>
                    <li>Customer Relationship Management</li>
                  </ul>
                </li>
                <li>
                  Siebel
                  <ul className="pl-3 mt-2 mb-2">
                    <li>Customer Relationship Management</li>
                  </ul>
                </li>
                <li>
                  Others
                  <ul className="pl-3 mt-2 mb-2">
                    <li>Endeca</li>
                    <li>Silver Creek</li>
                    <li>Hyperion</li>
                    <li>Inquira</li>
                    <li>Datanomic</li>
                    <li>Campus Solutions (PeopleSoft and EBS products)</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <h4 className="mt-4">How to Hire the Best Oracle Consulting Company? </h4>
          <p>
            Now, after understanding the basics of ORACLE, below are some tips for finding the right ORACLE consulting
            company on Hindsyght
          </p>
          <h5 className="proficiency_step">
            Step 1: Compose a well-defined brief of what your business is trying to solve or accommodate
          </h5>
          <p>
            The most crucial first step is to identify business needs to ensure your project and its deliverable will
            address those requirements. It can be to solve a persistent, ongoing issue or to create new functionalities
            to combat the competition. The cost of your project will depend on your scope of work, and the specific
            skills needed to bring your project to life. Make sure to spell out the scope and the skill sets required to
            complete the job.
          </p>
          <StepTwo />
          <StepThree />
          <StepFour {...props} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default OracleConsulting;
