import React from "react";

import avatar1 from "../../../images/mark.jpg";
import avatar2 from "../../../images/john.jpg";
import avatar3 from "../../../images/HauNgo.png";

import "./index.scss";

import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials: any = [
  {
    name: "John O’Brien",
    county: "Temecula, CA",
    designation: "SAP Manager, Paulson Manufacturing",
    description:
      "Hindsyght provided us with several referral firms that are contributing significantly to our implementation and adoption of an ERP system. The accounting referral is significantly more explicative than the previous system architect, and the supply chain management referral is helping us to better understand some of the more arcane aspects of SCM.",
    image: avatar2,
  },
  {
    name: "Mark Reichner",
    county: "Orange County, CA",
    designation: "President and CEO, Pivot Consulting",
    description:
      "As a small boutique firm, it is difficult to win the project when going up against larger competitors. Even if we are the firm that usually goes in and fixes issues left by those larger firms. I wish there is a way to showcase our talents that can entice the companies to select us instead of conservatively select the bigger players.",
    image: avatar1,
  },
  {
    name: "Hau Ngo",
    county: "Temecula, CA",
    designation: "Principal Consultant, Summerlin Analytics",
    description:
      "Do you know a firm that you would recommend for our next project that is outside of your area of expertise?” I’ve heard variations of this line from countless customers and agencies but never had an adequate response. That is, until I discovered Hindsyght. Now, I can direct these requests to a discovery platform that connects vetted service firms to those who can benefit from their expertise.",
    image: avatar3,
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  nextArrow: <KeyboardArrowRightIcon />,
  prevArrow: <KeyboardArrowLeftIcon />,
  initialSlide: 0,
};

function Testimonials() {
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="testimonials_section">
          <div>
            <Slider {...settings}>
              {testimonials.map((testimonial: any, index: any) => (
                <div key={index}>
                  <Testimonial
                    name={testimonial.name}
                    county={testimonial.county}
                    description={testimonial.description}
                    image={testimonial.image}
                    designation={testimonial.designation}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

function Testimonial({ name, county, description, designation, image }: any) {
  return (
    <div className="testimonial-item">
      <div className="second-text">
        <p className="text-center">
          <q>{description}</q>
        </p>
      </div>
      <div className="profile d-flex align-content-center justify-content-center">
        <img src={image} alt={name} />
        <div>
          <p className="name">{name}</p>
          <p>{designation}</p>
          <p>{county}</p>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
