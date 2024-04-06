import React from "react";
import { Link } from "react-router-dom";
import target from "../../../images/home/target.svg";
import community from "../../../images/home/community.svg";
import amplify from "../../../images/home/amplify.svg";
import ask_us from "../../../images/home/ask-us.svg";
import "./index.scss";

const info_blocks = [
  {
    name: "TRUSTED PARTNER COMMUNITY",
    description:
      "Join our network of businesses and service firms. Whether it’s sharing knowledge and experience with your peers, receiving guidance from industry experts, or just talking with our team, your community is always available.",
    image: community,
  },
  {
    name: "HIGHLIGHT YOUR SUCCESSES",
    description:
      "If you’re a service firm, we want to know what makes you great. Highlighting your skills and successes on your profile for everyone to see will increase your exposure, growth, and profits!",
    image: amplify,
  },
  {
    name: "ASK US",
    description:
      "Hindsyght is passionate about helping businesses make the right decisions when it comes to hiring the right provider. Give our team a call anytime for advice! we’ve lots of solutions and we are eager to determine the right one for you.",
    image: ask_us,
  },
  {
    name: "RESOURCES",
    description:
      "Improve your business’s next project by reading our blog, staying up to date with industry news, or engage with our community to reach out to other businesses for feedback.",
    image: community,
  },
];

function Why() {
  return (
    <React.Fragment>
      <section className="why_signup" id="why-sign-up">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 why_signup_section">
              <img src={target} />
              <h3>Why Sign Up</h3>
              <p className="text-light mb-3">
                Only in hindsight can we see how it should have been. Our mission is to keep you from feeling this way!
                We give you clear insight on the right firm for you, from real people who have been there. We’ll provide
                you the hindsight that you need, so you know you’re covered.
              </p>
              <Link to="/contact" className="contact_us_link">
                Contact Us - It's Free
              </Link>
            </div>
            <div className="col-md-6">
              {info_blocks.map((info: any, index: any) => (
                <Info key={index} name={info.name} description={info.description} image={info.image} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function Info({ name, description, image }: any) {
  return (
    <>
      <div className="info_box">
        <div className="circle">
          <img src={image} alt={name} />
        </div>
        <div className="text-group">
          <p className="title">{name}</p>
          <p className="text-normal">{description}</p>
        </div>
      </div>
    </>
  );
}

export default Why;
