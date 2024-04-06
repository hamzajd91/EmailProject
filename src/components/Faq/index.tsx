import React, {Component} from "react";
import "./index.scss";
import Question from "./Component/Question";
import {Helmet} from "react-helmet";

const faq_questions = [
  {
    title: "What is the Search Algorithm?",
    description:
      "Our custom search algorithm is designed to help you find companies that match your needs. Our unique system of proficiencies allows companies to specify their specializations to more easily match. Our focus on local first, helps you find firms close to you saving on travel costs so you can find firms in your area.",
  },
  {
    title: "Some companies I expect to appear do not show up.",
    description:
      "Our goal is to connect businesses to professional services companies in their area.  Therefore, our search algorithm will search for companies that fit the skillsets or proficiencies that you are looking for within 150 miles radius of where you are or the location that you entered at time of search.  If the company you are expecting to appear is outside of that radius, it will not be displayed.  In some instances, we will expand our search beyond 150 miles if the search criteria you enter does not return results from local companies.  Note, you can search by name to find that company that you are looking for.",
  },
  {
    title: "How do I share the company profile information with my friends and colleagues?",
    description: `Once you are at the company profile page, you can click on "Share" icon under the "Claim" button on the left column of the page.`,
  },
  {
    title: "How do I change my user profile data?",
    description: "Go to My Account and select edit profile to change your profile data.",
  },
  {
    title: "How do I save or bookmark a company that I would like to review later?",
    description: `You can use the Bookmark feature to save and keep track of great companies on Hindsyght so you can easily find them again later. Simply find the business page that you would like to save and click “Bookmark” icon under the "Claim" button on the left column of the page. Your bookmarks are stored in the Bookmark section of your account profile page and you’ll need to be logged in to your Hindsyght user account to use the feature.`,
  },
  {
    title: "How do I remove a bookmark?",
    description:
      "From your account profile page, click on Bookmarks.  You will find a set of companies that you have saved.  Click on the checkbox in front of the bookmarks and click on Delete.",
  },
  {
    title: "How do I write a review?",
    description: `Search for a company you would like to write a review for.  Once you pull up the company profile, click on Write a review button by the name of the company on the right side of the page.  A review and rating screen will appear.  After you are done, click save.  Please note that you can also click on “Write a Review” at the menu bar on top of the page.  It will take you to a search company page first so you can pull up the company you would like to write a review for.`,
  },
  {
    title: "The company I want to write a review for is not in your database.",
    description: `You can add the company, then write your review. From the search result page, there is an “Add Company” button on the left side of the page. If you can’t find the company you are looking for, simply click on that button to add a company. Please note that there is a checkbox for the owner to claim the company, do not check on that box if you are not a representative and simply want to write a review. Once the company information is added, you can write a review for it.`,
  },
  {
    title: "How do I edit my reviews?",
    description:
      "Go to My Account and click on Reviews tab.  There, you can select the review you would like to change by clicking edit and make the changes as required.  Click save after you are done.",
  },
  {
    title: "How do I report a review?",
    description: `Get to the review you want to report in the Company Profile page and click the vertical ellipses "⋮" and select "Report Review". You will be asked for a reason you are reporting the review.`,
  },
  {
    title: "How do I delete my reviews?",
    description:
      "We would like this site to be as authentic as possible and urge against deleting your reviews.  However, we do allow users who must delete a review 2 weeks from the date the review was entered to delete.",
  },
  {
    title: "How do I change the email address I used to log into my account?",
    description:
      "Go to My Account and edit your email in your account profile data section.  If you logged in using LinkedIn, the email you use from LinkedIn is stored.  We suggest that you don’t change that email if you signed up through LinkedIn.",
  },
  {
    title: "How do I change a password for my user account?",
    description: "Go to My Account and select Settings.  You will have the ability to change the password.",
  },
  {
    title: "I forgot my password.",
    description:
      "Go to the login screen and click on Forgot Password to reset your password.  Note, that if you log in using your LinkedIn profile, we do not store your password.  Simply continue to log in using your LinkedIn profile ID and password.",
  },
  {
    title: "How do I sign up?",
    description:
      "You can sign up using your LinkedIn profile, or with your email. Click on Sign Up at the top right corner of the page and select the signup option you want.",
  },
];

const service_Firm_questions = [
  {
    title: "How do I claim my company?",
    description:
      "Search for your company and go to the company profile page.  If it has not been claimed, there should be a claim button on the left side of the page.  Click on “Claim” and follow the process on the screen.",
  },
  {
    title: "How do I claim a company that has already been claimed?",
    description:
      "Company can only be claimed by its employee.  If someone else had already claimed your company, we have a “Re-Claim” process where you can request to re-claim the company profile.  We will send the original claimant a request to Transfer the ownership to you.  You will also be given the email address of the claimant so you can contact him/her directly to expedite the process.",
  },
  {
    title: "My company is not in the database.",
    description: `You can add the company by first searching for your company to make sure it doesn't exist in our database. From the search result page, there is an “Add Company” button on the left side of the page. If you can’t find the your company, simply click on that button to add a company. Please note that there is a checkbox for the owner to claim the company, check that box if you are a representative claiming the company. Follow the instructions from the site once you started this process.`,
  },
  {
    title: "Can I own more than one company profile?",
    description:
      "Yes, you can own multiple company profiles using your single account. However, for each company profile you would like to own, we need to associate your work email that is the same as the company domain (or website) for the company you are claiming. You can go to My Account/Company to view all of the companies that you own.",
  },
  {
    title: "How do I add branches?",
    description:
      "The best way to add your branches is to go to your main corporate company profile page.  If you are the profile owner, there should be an edit icon.  Go to the branch section and click on “Add Branch”.",
  },
  {
    title: "How do I link a branch to my main company profile if they are not linked?",
    description: "Please contact our support team.",
  },
  {
    title: "What do I get with your different Subscription levels?",
    description: `Please click <a href="#">here</a> to see our subscription details.`,
  },
  {
    title: "Why do I need to define proficiencies?",
    description:
      "Your proficiency is the key component we use for our search. If someone searches for a particular skillset, we will search for every company that lists that skillset as a proficiency. Please note that as you type in a proficiency, stored proficiencies will appear in auto-suggestion for you to select. If your skillset is not listed, you may type it in as our system will store your skillset as a new proficiency.",
  },
  {
    title: "How do I subscribe?",
    description:
      "Once you claim your company, you are given an option to subscribe with free subscription or pay subscription.  In order to complete the claim process, you must minimally subscribe to the free subscription.",
  },
  {
    title: "How do I change my business information?",
    description:
      "Go to your company profile page.  If you are the owner, there is an edit icon that you can select.  Your editable profile page will appear.",
  },
  {
    title: "How do I unsubscribe?",
    description:
      "We want to make sure that we maintain the most accurate information about your company. Therefore, instead of unsubscribe, we offer a free subscription with very limited features. If you are the owner of the company profile, go to My Account page and click on “Subscription”. You have the option to select the Free Subscription instead of the Pay Subscription. Note, that you must do this before your renewal date.",
  },
  {
    title: "How do I pay for my subscription?",
    description: "We accept credit cards, debit cards, purchasing cards, and ACH.",
  },
  {
    title: "How do I advertise on Hindsyght?",
    description: "Please contact our sales team at sales@hindsyght.com",
  },
  {
    title: "How do I customize my Ad placement",
    description:
      "There are a few features that we offer.  1) Geographical location – you can customize the areas you want your ads to reach; 2) User Title – you can customize the type of users you would like to reach; 3) Custom Ad Text – Customize the messaging on your ad.",
  },
  {
    title: "Why does my credit card transaction fail?",
    description:
      "Privacy is a priority at Hindsyght. Instead of storing your credit card, we use a PCI compliant payment processor to manage the payment transactions. If there is an issue with your payment transaction, please contact us at support@hindsyght.com",
  },
];

class Faq extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>FAQ</title>
          <meta name="title" content={`FAQ`} />
        </Helmet>
        <div className="container pt-5">
          <div className="page_title">
            <h1>FAQ</h1>
            <h3>General Questions</h3>
          </div>
          <div className="row mt-4 faq_section">
            {faq_questions.map((faq, index) => {
              return (
                <div className="col-md-6" key={index}>
                  <Question title={faq.title} description={faq.description} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="sub_page_title">
          <h2>Professional Service Firm Questions</h2>
        </div>
        <div className="container pt-3">
          <div className="row mt-4 faq_section">
            {service_Firm_questions.map((firm_questions, index) => {
              return (
                <div className="col-md-6" key={index}>
                  <Question title={firm_questions.title} description={firm_questions.description} />
                </div>
              );
            })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Faq;
