import React from "react";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";

function CyberSecurity(props: any) {
  return (
    <React.Fragment>
      <div className="proficiency_statics proficiency_statics_bg pt-5 pb-5">
        <div className="container">
          <h2 className="mb-3">
            The Importance of Information Privacy and Protecting Personal Identifiable Information
          </h2>
          <p>
            Cybersecurity is the protection of computer systems and networks from the theft of or damage to
            their hardware, software, or electronic data, as well as from the disruption or misdirection of the services
            they provide.
          </p>
          <p>
            “In a development in an enforcement action that is the first of its kind, the SEC has levied a $35 million
            penalty against Altaba, Inc. as successor in interest to Yahoo, for Yahoo’s two-year delay in reporting the
            massive data breach the company experienced in December 2014.”
          </p>
          <p>
            2018 has already seen companies hit with sizable fines and settlements due to data breaches. Uber’s poor
            handling of its 2016 breach has cost it close to $150 million. Weakly protected and heavy-regulated health
            data has cost medical facilities big, resulting in the US Department of Health and Human Services collecting
            increasingly large fines.
          </p>
          <p>
            Cybersecurity is one of the components of the Data Privacy ecosystem and usually was recommended by a
            business management consulting services firm. Implementing Data Privacy is involved; it touches most aspects
            of your operation. To make sure your company is secure, it is advisable to look at your company's security
            risks from a holistic point of view. It's a combination of Leadership and Controlling, Cybersecurity,
            Personal Identifiable Information (PII) Management or Data Privacy, Legal & Risk Management, working with
            Consumer Trust and Consent, and Communications and Training within your internal teams. By assessing and
            validating your security risks, develop the strategy, and take actions accordingly will mitigate your risks
            and vulnerability.
          </p>
          <p>
            The below link illustrates the cybersecurity information technology list that helps to identify your
            business requirement and guide you through hiring a cybersecurity consulting firm process.
          </p>
          <p>
            You don't have to do it alone. Many companies in the marketplace offer cybersecurity managed services. It's
            a managed Detection and Response (MDR) services company. They'll monitor your network 24×7, and their expert
            security engineers detect and respond to threats. They can be your primary managed service firm or an
            extension of your internal team.
          </p>
          <h3>Hire a Cybersecurity Consulting Firm that can Provide Data Privacy</h3>
          <p>
            You were tasked to run a CYBERSECURITY project for your company and don’t know where to start. Don’t worry.
            After understanding the basics of CYBERSECURITY, below are some tips for finding the right CYBERSECURITY
            consulting company on Hindsyght.
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
            Before diving into the software brands, you need to understand your project objectives and scopes. Once
            knowing what you are going to build, take a good look at your Information System landscape. If it’s
            possible, the most advisable is to choose the brand that you already have in-house. Many CTOs prefer
            best-of-breed; however, the headache of the interface and the effort of troubleshooting when it comes to
            production environment broken down outweigh the functionalities that the best-of-breed has to offer.
            Moreover, the resources and skill set that require to support two different systems will be costly and hard
            to find. For example, if your core ERP is the SAP system, it’s best to alter your scopes to SAP
            CYBERSECURITY solutions.
          </p>
          <p>
            Finally, the cost of your project will depend on your scope of work, and the specific skills needed to bring
            your project to life. Make sure to spell out the scopes and the skill sets required to complete the job.{" "}
          </p>
          <h5 className="proficiency_step">Step 2: Compose a job description aligned to your business requirements</h5>
          <p>
            <b>Proficiencies:</b> You should have the IT strategy in mind that based on your company’s sizes, resources,
            and budget, whether completely outsource that cybersecurity managed services or augmenting your internal
            resources. With the clear strategy, what skill set would you need to address the above business requirements
            and fulfill your deliverables?
          </p>
          <p>
            <b>Estimated Project length:</b> At the minimum, your job post should indicate whether this is a short or a
            more intensive project.
          </p>
          <p>
            <b>Background :</b> What kind of company profile are you looking for? If you prefer an IT company that has
            experience with working with specific industries, software, or marketing channels, mention them here.
          </p>
          <p>
            <b>Budget :</b> Set a budget and note your preference for hourly rates vs. fixed-price contracts.
          </p>
          <StepThree />
          <StepFour {...props} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default CyberSecurity;
