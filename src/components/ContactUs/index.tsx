import React, {useState} from "react";
import api from "../../services/api";
import "./index.scss";
import active_advice from "../../images/contact/active_advice.png";
import active_finance from "../../images/contact/active_finance.png";
import active_customer_support from "../../images/contact/active_customer_support.png";
import advice from "../../images/contact/advice.png";
import sales from "../../images/contact/sales.png";
import customer_support from "../../images/contact/customer_support.png";
import finance from "../../images/contact/finance.png";
import TextField from "@material-ui/core/TextField";
import {Helmet} from "react-helmet";


function ContactUs() {
  const [active, setActive] = useState(0);
  const [type, setType] = useState("support");
  const [title, setTitle] = useState("Customer Support");
  const [submitted, setSubmitted] = useState<any>({
    free: false,
    sales: false,
    support: false,
    finance: false,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState<any>({
    free: "",
    sales: "",
    support: "",
    finance: "",
  });

  function setContactMessage(e: any) {
    setMessage({
      ...message,
      [type]: e.target.value,
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // console.log(name, email, company, role, message);

    const data = {
      type,
      name,
      email,
      companyName: company,
      role,
      comments: message[type],
    };
    api.put("/contact", data);
    setSubmitted({
      ...submitted,
      [type]: true,
    });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Contact Us</title>
        <meta name="title" content={`Contact Us`} />
      </Helmet>
      <div className="contact_bg"></div>
      <div className="contact-us">
        <section className="contact_info_section">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div
                  className={`contact_card  ${active === 0 ? "active" : ""}`}
                  onClick={() => {
                    setTitle("Customer Support");
                    setActive(0);
                    setType("support");
                  }}
                >
                  <div className={`contact_img_wrapper ${active === 0 ? "active" : ""}`}>
                    <div className={`img-wrapper`}>
                      <img src={customer_support} />
                    </div>
                  </div>
                  <h5>Customer Support</h5>
                  <p>
                    Having issues with our site? Have suggestions for improvement? Contact the customer support team so
                    that we may improve!
                  </p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className={`contact_card ${active === 1 ? "active" : ""}`}
                  onClick={() => {
                    setTitle("Sales Inquiries");
                    setActive(1);
                    setType("sales");
                  }}
                >
                  <div className={`contact_img_wrapper ${active === 1 ? "active" : ""}`}>
                    <div className={`img-wrapper`}>
                      <img src={sales} />
                    </div>
                  </div>
                  <h5>Sales Inquiries</h5>
                  <p>Have a sales inquiry? Contact our sales inquiries team!</p>
                </div>
              </div>

              <div className="col-md-3">
                <div
                  className={`contact_card ${active === 2 ? "active" : ""}`}
                  onClick={() => {
                    setTitle("Finance Inquiries");
                    setActive(2);
                    setType("finance");
                  }}
                >
                  <div className={`contact_img_wrapper ${active === 2 ? "active" : ""}`}>
                    <div className={`img-wrapper`}>
                      <img src={finance} />
                    </div>
                  </div>
                  <h5>Finance Inquiries</h5>
                  <p>Have a finance inquiry? Contact our finance inquiry team!</p>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className={`contact_card ${active === 3 ? "active" : ""}`}
                  onClick={() => {
                    setTitle("Ask Us - Free Advice");
                    setActive(3);
                    setType("free");
                  }}
                >
                  <div className={`contact_img_wrapper ${active === 3 ? "active" : ""}`}>
                    <div className={`img-wrapper`}>
                      <img src={advice} />
                    </div>
                  </div>
                  <h5>Ask Us - Free Advice</h5>
                  <p>
                    Have a technical question? Ask us. If we don't have the answer, we will connect you to the expert
                    who can help.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="contact_form_section">
          <div className="container">
            <div className="contact_form_title">
              <Customer title={title} type={type} />
            </div>
            <div className="row">
              <div className="col-12">
                <form className="form" onSubmit={handleSubmit}>
                  <div className="contactus_form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Name"
                            variant="outlined"
                            className="w-100"
                            name="text"
                            required
                            // defaultValue={name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Email"
                            variant="outlined"
                            className="w-100"
                            name="email"
                            required
                            type="email"
                            // defaultValue={email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Company Name"
                            variant="outlined"
                            className="w-100"
                            name="company"
                            required
                            // defaultValue={company}
                            value={company}
                            onChange={e => setCompany(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <TextField
                            label="Role"
                            variant="outlined"
                            className="w-100"
                            name="role"
                            required
                            // defaultValue={role}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <TextField
                            label="Message"
                            variant="outlined"
                            className="w-100"
                            required
                            multiline
                            rows={4}
                            value={message[type]}
                            onChange={e => setContactMessage(e)}
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        {submitted[type] ? (
                          <button
                            disabled
                            type="submit"
                            style={{
                              backgroundColor: "#368b44",
                              cursor: "not-allowed",
                            }}
                          >
                            Submitted!
                          </button>
                        ) : (
                          <button type="submit">Submit</button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}

export default ContactUs;

// import { Container } from './styles';

const Customer = ({title, active, type}: any) => (
  <React.Fragment>
    <div className="img-wrapper">
      {type === "support" ? (
        <img src={active_customer_support} />
      ) : type === "sales" ? (
        <img src={sales} />
      ) : type === "finance" ? (
        <img src={active_finance} />
      ) : type === "free" ? (
        <img src={active_advice} />
      ) : null}
    </div>
    <h1>{title}</h1>
  </React.Fragment>
);
