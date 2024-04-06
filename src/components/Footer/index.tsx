import React from "react";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";

import logo from "../../images/logo-dark.svg";
import facebook from "../../images/facebook.svg";
import twitter from "../../images/twitter.svg";
import linkedin from "../../images/linkedin.svg";
import {HashLink} from "react-router-hash-link";
import appApi from "../../services/appApi";
import "./index.scss";

import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Footer() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://platform.linkedin.com/in.js";
    s.type = "text/javascript";
    s.async = true;
    s.innerText = "lang:en_US";
    document.body.appendChild(s);
  }, []);

  async function subscribeNewsLetter(data: any) {
    const {values, setErrors, resetForm, setSubmitting} = data;
    try {
      const {data} = await appApi.post("/users/subscribe/newsletter", values);
      setMessage(data.message);
      setOpen(true);
      resetForm();
    } catch (error) {
      setErrors({email: ""});
    } finally {
      setSubmitting();
    }
  }

  function scrollWithOffset(el: any, offset: any) {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth",
    });
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <footer className="mt-5 mb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo-footer" />
              </Link>
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: `<script type="IN/FollowCompany" data-id="18894408" data-counter="bottom"></script>`,
                }}
              />
              <div className="footer_links mt-4">
                <Link to="/about-us">About Us</Link>
                <Link to="/contact">Contact Us</Link>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer_links">
                <p>Resources</p>
                <Link to="/privacyPolicy">Privacy Policy</Link>
                <Link to="/terms">Terms of Use</Link>
                <Link to={`/resources/blog`}>Blog</Link>
              </div>
            </div>
            <div className="col-md-2">
              <div className="footer_links">
                <p>QUESTIONS</p>
                <Link to={`/faq`}>FAQ</Link>
                <Link to={`/subscription`}>Subscription</Link>
                <HashLink to="/#how-it-works" scroll={el => scrollWithOffset(el, -100)}>
                  How it Works
                </HashLink>
              </div>
            </div>
            <div className="col-md-4">
              <div className="social-networks">
                <p>Social</p>
                <div>
                  <a
                    href="https://www.facebook.com/Hindsyght-354232868544454/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <img src={facebook} alt="facebook icon" />
                    </div>
                  </a>
                  <a href="https://twitter.com/hindsyght" target="_blank" rel="noopener noreferrer" className="middle">
                    <div>
                      <img src={twitter} alt="twitter icon" />
                    </div>
                  </a>
                  <a href="https://www.linkedin.com/company/hindsyght/about/" target="_blank" rel="noopener noreferrer">
                    <div>
                      <img src={linkedin} alt="linked-in icon" />
                    </div>
                  </a>
                </div>
              </div>
              <p className="mt-4">Newsletter</p>
              <div>
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email("Enter valid email address.")
                      .required("Email is required."),
                  })}
                  onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                    subscribeNewsLetter({values, setErrors, setSubmitting, resetForm});
                  }}
                >
                  {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                    <form onSubmit={handleSubmit} className="w-100">
                      <TextField
                        error={errors.email && touched.email ? true : false}
                        label="Email"
                        variant="outlined"
                        className="w-100 mb-2"
                        name="email"
                        defaultValue={values.email}
                        helperText={errors.email && touched.email ? errors.email : null}
                        onChange={handleChange}
                      />
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-block mt-2">
                        Subscribe
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
