import React, {useEffect} from "react";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Form as BootstrapForm, Button} from "react-bootstrap";
import login_image from "../../images/login/login.png";
import {ApplicationState} from "../../store";
import appApi from "../../services/appApi";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import "./index.scss";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

function VerifyResend(props: any) {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const isAuthenticated = props.user.isAuthenticated;
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, []);

  const sendVerificationMail = async (e: any) => {
    const {values, setErrors, setSubmitting} = e;
    try {
      await appApi.get("/users/verify/resend", {params: values});
      setOpen(true);
    } catch (error) {
      setErrors({email: "Something went wrong."});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login_Section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="page_custom_title">
              <div className="img-wrapper">
                <img src={login_image} />
              </div>
              <h1>Resend Verification Email</h1>
            </div>
          </div>

          <div className="col-md-7 mt-5 pt-3">
            <div className="box_Card">
              <Formik
                initialValues={{
                  email: "",
                }}
                enableReinitialize={true}
                validationSchema={LoginSchema}
                onSubmit={(values: any, {setErrors, setSubmitting}) => {
                  sendVerificationMail({values, setErrors, setSubmitting});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Email :</BootstrapForm.Label>
                      <BootstrapForm.Control type="email" name="email" value={values.email} onChange={handleChange} />
                      {errors.email && touched.email ? (
                        <BootstrapForm.Text className="text-danger">{errors.email}</BootstrapForm.Text>
                      ) : null}
                    </BootstrapForm.Group>
                    <div className="text-center">
                      <Button className="authButton" type="submit" disabled={isSubmitting}>
                        Send
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Email sent.
        </Alert>
      </Snackbar>
    </section>
  );
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    profile: state.profile,
    login: state.login,
    user: state.user,
  };
};

export default connect(mapStateToProps)(VerifyResend);
