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
    designation: "SAP Manager, Paulson Manufactiring",
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
  slidesToShow: 3,
  centerMode: true,
  centerPadding: "60px",
  slidesToScroll: 1,
  adaptiveHeight: true,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "20px",
      },
    },
  ],
};

function Testimonials() {
  return (
    <React.Fragment>
      <div className="container-fluid testimonials_section overflow-hidden">
        <div className="headings">
          <h3>Some Encouraging Words From Our Happy Customers </h3>
          <p>Here’s what our clients have been saying about our platform:</p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial: any, index: any) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              county={testimonial.county}
              description={testimonial.description}
              image={testimonial.image}
              designation={testimonial.designation}
            />
          ))}
        </Slider>
      </div>
    </React.Fragment>
  );
}

function Testimonial({ name, county, description, designation, image }: any) {
  return (
    <div className="testimonial-item">
      <img src={image} alt={name} />
      <svg className="mt-2 mb-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28">
        <defs>
          <clipPath>
            <rect width="28" height="28" />
          </clipPath>
        </defs>
        <g>
          <rect width="28" height="28" fill="#fff" />
          <text
            transform="translate(-6 76)"
            fill="#242323"
            fontSize="105"
            fontFamily="SegoeUI, Segoe UI"
            letterSpacing="0.073em"
          >
            <tspan x="0" y="0">
              &quot;
            </tspan>
          </text>
        </g>
      </svg>
      <p className="description">{description}</p>
      <p className="name">{name}</p>
      <p className="designation">{designation}</p>
      <p className="county">{county}</p>
    </div>
  );
}

export default Testimonials;
