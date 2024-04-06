import React from "react";
import StepTwo from "../Components/StepTwo";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";

function SAPConsulting(props: any) {
  return (
    <React.Fragment>
      <div className="proficiency_statics proficiency_statics_bg pt-5 pb-5">
        <div className="container">
          <h2 className="mb-3">What is SAP?</h2>
          <p>
            SAP stands for Systems, Applications, and Products in Data Processing (Anwendungen und Produkte in der
            Datenverarbeitung in German). SAP was founded in 1972 in Walldorf, Germany and now has offices around the
            world.
          </p>
          <p>
            In early 1975, SAP introduced a few applications financial accounting (RF), invoice verification, and
            inventory management (RM). In 1979, the company started developing R/2, the second generation of its
            software. SAP R/3 success story began in 1992, with the client-server software smoothing the path to a
            globalized economy, turning SAP into a global player with subsidiaries and development centers across the
            world.
          </p>
          <p>
            Today, SAP is the global leader in Enterprise software that encompasses the below products with the vision
            to “help the world run better and improve people’s lives.”
          </p>

          <div className="row">
            <div className="col-md-4">
              <h3>ERP & Finance</h3>
              <ul>
                <li>
                  SAP S/4HANA
                  <ul className="pl-3">
                    <li>Sales & Distribution</li>
                    <li>Order To Cash</li>
                    <li>Material Management</li>
                    <li>Warehouse Management</li>
                    <li>Procure to Pay</li>
                    <li>Product Management</li>
                    <li>Product Lifecycle Management</li>
                  </ul>
                </li>
                <li>ERP for Small and Midsize Enterprises</li>
                <li>Financial Planning and Analysis</li>
                <li>Accounting and Financial Close Treasury Management</li>
                <li>Cybersecurity, Governance, Risk and Compliance</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>CRM and Customer Experience</h3>
              <ul>
                <li>SAP C/4HANA</li>
                <li>Customer Data</li>
                <li>Marketing</li>
                <li>Commerce</li>
                <li>Sales</li>
                <li>Service</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Network and Spend Management</h3>
              <ul>
                <li>Supplier Management</li>
                <li>Strategic Sourcing</li>
                <li>Procurement</li>
                <li>Services Procurement and External Workforce</li>
                <li>Selling and Fulfillment</li>
                <li>Travel and Expense</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Digital Supply Chain</h3>
              <ul>
                <li>Supply Chain Planning</li>
                <li>Supply Chain Logistics</li>
                <li>Manufacturing</li>
                <li>R&D / Engineering</li>
                <li>Asset Management</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>HR and People Engagement</h3>
              <ul>
                <li>Employee Experience Management</li>
                <li>Core HR and Payroll</li>
                <li>Talent Management</li>
                <li>HR Analytics and Workforce Planning</li>
              </ul>
            </div>
            <div className="col-md-4">
              <h3>Business Technology Platform</h3>
              <ul>
                <li>Database and Data Management</li>
                <li>Application Development and integration</li>
                <li>Analytics</li>
                <li>Intelligent Technologies</li>
              </ul>
            </div>
          </div>

          <h2 className="mt-4">How to Hire the Best SAP Consulting Company?</h2>
          <p>
            Now, after understanding the basics of SAP, below are some tips for finding the right SAP consulting company
            on Hindsyght
          </p>

          <h5 className="proficiency_step">
            Step 1: Compose a well-defined brief of what your business is trying to solve or accommodate
          </h5>
          <p>
            The most crucial first step is to identify business needs to ensure your project and its deliverable will
            address those requirements. It can be to solve a persistent, ongoing issue or to create new functionalities
            to combat the competition.
          </p>
          <p>
            The cost of your project will depend on your scope of work, and the specific skills needed to bring your
            project to life.  Make sure to spell out the scope and the skill sets required to complete the job.
          </p>
          <StepTwo />
          <StepThree />
          <StepFour {...props} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default SAPConsulting;
