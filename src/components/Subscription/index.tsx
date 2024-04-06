import React from "react";
import { FreePlans, BasicPlans, PlusPlans } from "../AllPlans";
import { Helmet } from "react-helmet";
import PageBlogComponent from "../PageBlogComponent";
import "./index.scss";

// const free = [
//   {
//     name: "2 Proficiencies",
//     available: true,
//   },
//   {
//     name: "0 Posts",
//     available: true,
//   },
//   {
//     name: "Firm/Company Listing",
//     available: true,
//   },
//   {
//     name: "Update Address",
//     available: true,
//   },
//   {
//     name: "Update Contact Info",
//     available: true,
//   },
//   {
//     name: "Update Company Name",
//     available: true,
//   },
//   {
//     name: "Update Social Media Sites",
//     available: true,
//   },
//   {
//     name: "Co-manage/Delegate Company Profile",
//     available: true,
//   },
//   {
//     name: "Account Management Dashboard",
//     available: true,
//   },
//   {
//     name: "Consolidated Reviews",
//     available: true,
//   },
//   {
//     name: "Access to Industry News/Updates/Statistics",
//     available: true,
//   },
//   {
//     name: "Add Company Logo",
//     available: true,
//   },
//   {
//     name: "Add Banner",
//     available: true,
//   },
//   {
//     name: "Add Tagline",
//     available: true,
//   },
//   {
//     name: "Add Multiple Branches",
//     available: false,
//   },
//   {
//     name: "Respond to Reviews",
//     available: false,
//   },
//   {
//     name: "Improved Search visibility",
//     available: false,
//   },
//   {
//     name: "Priority Support",
//     available: false,
//   },
//   {
//     name: "Priority of Ads Display",
//     available: false,
//   },
//   {
//     name: "Priority Listing on Search",
//     available: false,
//   },
//   {
//     name: "Notify when users provide review",
//     available: false,
//   },
//   {
//     name: "Optimal Search Visibility",
//     available: false,
//   },
//   {
//     name: "Leads & Prospect Notification",
//     available: false,
//   },
//   {
//     name: "Active Proficiency Notification",
//     available: false,
//   },
// ];

// const basic = [
//   {
//     name: "Up to 5 Proficiencies",
//     available: true,
//   },
//   {
//     name: "Up to 1 Post",
//     available: true,
//   },
//   {
//     name: "Firm/Company Listing",
//     available: true,
//   },
//   {
//     name: "Update Address",
//     available: true,
//   },
//   {
//     name: "Update Contact Info",
//     available: true,
//   },
//   {
//     name: "Update Company Name",
//     available: true,
//   },
//   {
//     name: "Update Social Media Sites",
//     available: true,
//   },
//   {
//     name: "Co-manage/Delegate Company Profile",
//     available: true,
//   },
//   {
//     name: "Account Management Dashboard",
//     available: true,
//   },
//   {
//     name: "Consolidated Reviews",
//     available: true,
//   },
//   {
//     name: "Access to Industry News/Updates/Statistics",
//     available: true,
//   },
//   {
//     name: "Add Company Logo",
//     available: true,
//   },
//   {
//     name: "Add Banner",
//     available: true,
//   },
//   {
//     name: "Add Tagline",
//     available: true,
//   },
//   {
//     name: "Add Multiple Branches",
//     available: true,
//   },
//   {
//     name: "Respond to Reviews",
//     available: true,
//   },
//   {
//     name: "Improved Search visibility",
//     available: true,
//   },
//   {
//     name: "Priority Support",
//     available: true,
//   },
//   {
//     name: "Priority of Ads Display",
//     available: true,
//   },
//   {
//     name: "Priority Listing on Search",
//     available: true,
//   },
//   {
//     name: "Notify when users provide review",
//     available: true,
//   },
//   {
//     name: "Optimal Search Visibility",
//     available: false,
//   },
//   {
//     name: "Leads & Prospect Notification",
//     available: false,
//   },
//   {
//     name: "Active Proficiency Notification",
//     available: false,
//   },
// ];

// const plus = [
//   {
//     name: "Up to 25 Proficiencies",
//     available: true,
//   },
//   {
//     name: "Up to 3 Posts",
//     available: true,
//   },
//   {
//     name: "Firm/Company Listing",
//     available: true,
//   },
//   {
//     name: "Update Address",
//     available: true,
//   },
//   {
//     name: "Update Contact Info",
//     available: true,
//   },
//   {
//     name: "Update Company Name",
//     available: true,
//   },
//   {
//     name: "Update Social Media Sites",
//     available: true,
//   },
//   {
//     name: "Co-manage/Delegate Company Profile",
//     available: true,
//   },
//   {
//     name: "Account Management Dashboard",
//     available: true,
//   },
//   {
//     name: "Consolidated Reviews",
//     available: true,
//   },
//   {
//     name: "Access to Industry News/Updates/Statistics",
//     available: true,
//   },
//   {
//     name: "Add Company Logo",
//     available: true,
//   },
//   {
//     name: "Add Banner",
//     available: true,
//   },
//   {
//     name: "Add Tagline",
//     available: true,
//   },
//   {
//     name: "Add Multiple Branches",
//     available: true,
//   },
//   {
//     name: "Respond to Reviews",
//     available: true,
//   },
//   {
//     name: "Improved Search visibility",
//     available: true,
//   },
//   {
//     name: "Priority Support",
//     available: true,
//   },
//   {
//     name: "Priority of Ads Display",
//     available: true,
//   },
//   {
//     name: "Priority Listing on Search",
//     available: true,
//   },
//   {
//     name: "Notify when users provide review",
//     available: true,
//   },
//   {
//     name: "Optimal Search Visibility",
//     available: true,
//   },
//   {
//     name: "Leads & Prospect Notification",
//     available: true,
//   },
//   {
//     name: "Active Proficiency Notification",
//     available: true,
//   },
// ];

function Subscription() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Subscription</title>
        <meta name="title" content={`Subscription`} />
      </Helmet>
      <div className="subscription">
        <div className="container-fluid">
          <div className="row align-content-center">
            <div className="col-md-6 subscription_img"></div>
            <div className="col-md-6 subscription_info">
              <p>
                We know that different firms have different needs, so Hindsyght offers multiple subscription options to fit your business. Below, we break down what each subscription level has to offer, from digital storefront customization to reporting and analytics. Need to upgrade to another level? Hindsyght also allows you to change your subscription level at any time.
              </p>
              <p>When you are ready, search for your company and claim it!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 mt-5">
        <div className="row">
          <div className="col-lg-4 mb-3 col-md-6">
            <FreePlans link={`/subscription2/free`} />
          </div>
          <div className="col-lg-4 mb-3 col-md-6">
            <BasicPlans link={`/subscription2/basic`} />
          </div>
          <div className="col-lg-4 mb-3 col-md-6">
            <PlusPlans link={`/subscription2/premium`} />
          </div>
        </div>
      </div>
      <PageBlogComponent />
    </React.Fragment>
  );
}

export default Subscription;
