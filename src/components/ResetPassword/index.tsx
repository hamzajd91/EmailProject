import React, {useEffect} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Button} from "react-bootstrap";
import login_image from "../../images/login/login.png";
import {ApplicationState} from "../../store";
import {authLogin} from "../../store/ducks/login/actions";
import appApi from "../../services/appApi";
import "./index.scss";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

// Validation schema
const validation_Schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email adderess.")
    .required("Email is required."),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ResetPassword(props: any) {
  const [open, setOpen] = React.useState(false);

  async function requestResetPassword(e: any) {
    const {setErrors, setSubmitting, values, resetForm} = e;
    try {
      await appApi.post("/users/resetToken", values);
      resetForm();
      setOpen(true);
    } catch (error) {
      switch (error.response.status) {
        case 404:
          setErrors({
            email: "Email not Found.",
          });
          break;

        case 403:
          setErrors({
            email: "This is LinkedIn Account. You can not reset password.",
          });
          break;

        default:
          setErrors({
            email: "There was a problem with the reset password request.",
          });
          break;
      }
    } finally {
      setSubmitting(false);
    }
  }

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

  return (
    <section className="login_Section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="page_custom_title">
              <div className="img-wrapper">
                <img src={login_image} />
              </div>
              <h1>Reset Password</h1>
            </div>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              An email has been sent to the address specified. If you still having problems, please contact us.
            </Alert>
          </Snackbar>
          <div className="col-md-7 mt-5 pt-3">
            <div className="box_Card">
              <Formik
                initialValues={{
                  email: "",
                }}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                  requestResetPassword({values, setErrors, setSubmitting, resetForm});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <TextField
                      error={errors.email && touched.email ? true : false}
                      label="Email"
                      variant="outlined"
                      className="w-100"
                      name="email"
                      defaultValue={values.email}
                      helperText={errors.email && touched.email ? errors.email : null}
                      onChange={handleChange}
                    />

                    <div className="text-center">
                      <Button className="authButton" type="submit" disabled={isSubmitting}>
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authLogin: (params: any) => dispatch(authLogin(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
