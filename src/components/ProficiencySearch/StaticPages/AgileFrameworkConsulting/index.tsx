import React from "react";
import StepThree from "../Components/StepThree";
import StepFour from "../Components/StepFour";
import "../proficiency.scss";

function AgileFrameworkConsulting(props: any) {
  return (
    <React.Fragment>
      <div className="proficiency_statics proficiency_statics_bg pt-5 pb-5">
        <div className="container">
          <h2 className="mt-3 mb-3">What is Scaled Agile Framework?</h2>
          <p>
            Scaled Agile or “Agile at scale” is a systematic framework to facilitate big Agile implementation. The
            intent is to provide just the right amount of structure and governance necessary to facilitate larger teams
            working on complex projects. Too little could result in a free-for-all, but too much can reduce the primary
            benefit of Agile: speed. Striking this balance is very important.
          </p>
          <h3>Scaled Agile Frameworks Options:</h3>
          <p>
            For environments requiring a bit more structure, the good news is that there are multiple scaled Agile
            frameworks already in place. They range from light to heavy, and they all have their relative pros and cons.
            For that reason, there is no clear winner for every situation or one-size-fits-all approach. It is also
            important to note that some assembly is required with each of them. These are toolkits that can and should
            be adapted to your existing environment. Picking the right one and starting slow is very important to
            minimize the friction and disruption associated with the implementation of the framework.
          </p>
          <p>With that in mind, let’s take a look at some of the most popular options available.</p>
          <p>
            <b>Nexus:</b> is a framework consisting of roles, events, artifacts, and rules. These bind and weave
            together the work of approximately 3-9 scrum teams working on a single product backlog to build an
            Integrated Increment that meets a goal.
          </p>
          <p>
            <b>Large Scale Scrum (LeSS):</b> is a framework that adheres very closely to scrum. There are two variations
            — LeSS and LeSS Huge. LeSS is for groups of 3-8 scrum teams with no more than eight people in each. LeSS
            Huge can scale up to a thousand people on one product. Either way, most of the scaling elements of LeSS are
            focused on directing the attention of all teams onto the whole product instead of “just my part.” In LeSS,
            all teams are in a shared sprint to deliver a common shippable product every iteration.
          </p>
          <p>
            <b>Scrum @ Scale (S@S):</b> is a framework that believes the time necessary to make decisions is the primary
            driver of project failure and budget overruns. As more teams are added to a project, the more this occurs.
            Consequently, the emphasis of S@S is reducing decision latency. To this end, it focuses on achieving a
            minimum viable bureaucracy (MVB) by introducing three new structures to Scrum. The goal is to achieve
            scalability by enabling multiple teams to operate as efficiently as a smaller group.
          </p>

          <p>
            <b>Disciplined Agile Delivery (DAD):</b> is a hybrid approach which extends scrum by incorporating
            best-of-breed elements from a number of different frameworks including: Agile Modeling (AM), Extreme
            Programming (XP), Unified Process (UP), Kanban, Lean Software Development, SAFe, and LeSS. Instead of being
            a prescriptive methodology, DAD takes more of a pragmatic, goal-driven approach. DAD adopts practices and
            strategies from existing sources and provides advice for when and how to apply them together. 
          </p>
          <p>
            <b>Scaled Agile Framework (SAFe):</b> SAFe is a well-known and widely utilized framework for scaling agile
            across the enterprise. There are over 450,000 certified SAFe professionals worldwide, and over 70 percent of
            US Fortune 100 companies have them.
          </p>
          <h3>Why Hire an Agile Consulting Company?</h3>
          <p>
            Now, after understanding the basics of Scaled Agile Framework, below are some tips for finding the right
            firm that specializes in Scaled Agile consulting services on Hindsyght
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

export default AgileFrameworkConsulting;
