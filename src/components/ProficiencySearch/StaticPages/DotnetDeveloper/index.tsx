import React from "react";
import StepTwo from "../Components/StepTwo";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";

function DotnetDeveloper(props: any) {
  return (
    <React.Fragment>
      <div className="proficiency_statics proficiency_statics_bg pt-5 pb-5">
        <div className="container">
          <h2 className="mt-3 mb-3">What is a .NET Framework?</h2>
          <p>
            .NET Framework is a development platform for building apps for web, Windows, Windows Server, and Microsoft
            Azure. It consists of the common language runtime (CLR) and the .NET Framework class library, which includes
            a broad range of functionality and support for many industry standards.
          </p>
          <p>
            .NET Framework provides many services, including memory management, type and memory safety, security,
            networking, and application deployment. It provides easy-to-use data structures and APIs that abstract the
            lower-level Windows operating system. You can use different programming languages with .NET Framework,
            including C#, F#, and Visual Basic.
          </p>
          <p>
            Depending on your business requirements of a back-end or a front-end developer or both, you may look for the
            below skills in the candidates provided by the IT services.
          </p>
          <h3>Frameworks for Back-end developer</h3>
          <ul>
            <li>.NET MVC</li>
            <li>.NET Web API</li>
            <li>Signal R Frameworks for Front –end development</li>
            <li>Angular JS</li>
            <li>SaaS</li>
            <li>Bootstrap</li>
          </ul>

          <h3>You may also look for .NET Candidates with a good understanding of:</h3>
          <ul>
            <li>Object-Oriented Programming concepts</li>
            <li>.NET Programming concepts</li>
            <li>.NET framework</li>
            <li>Windows Controls</li>
            <li>Windows Workflow foundation</li>
          </ul>

          <h2>How to Hire a .NET Developer?</h2>
          <p>
            Now, after understanding the basics of .NET, below are some tips for finding the right .NET consulting
            company on Hindsyght
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
            project to life. Make sure to spell out the scope and the skill sets required to complete the job.
          </p>
          <StepTwo />
          <StepThree />
          <StepFour {...props} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default DotnetDeveloper;
