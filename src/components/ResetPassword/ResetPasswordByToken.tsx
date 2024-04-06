import React, {useEffect} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Form as BootstrapForm, Button} from "react-bootstrap";
import login_image from "../../images/login/login.png";
import {ApplicationState} from "../../store";
import {authLogin} from "../../store/ducks/login/actions";
import appApi from "../../services/appApi";
import "./index.scss";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";

// Validation schema
const validation_Schema = Yup.object().shape({
  newPassword: Yup.string().required("New Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "The password confirmation does not match.")
    .required("Confirm Password is required."),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResetPasswordByToken(props: any) {
  const [open, setOpen] = React.useState(false);

  async function requestResetPassword(e: any) {
    const {setErrors, setSubmitting, values, resetForm} = e;

    try {
      const body = {
        token: props.match.params.token,
        password: values.newPassword,
      };

      await appApi.post(`users/resetPasswordFromToken`, body);

      resetForm();
      setOpen(true);
    } catch (err) {
      const errorMessage = err.response.data ? err.response.data.error.message : err.message;
      setErrors({confirmNewPassword: errorMessage});
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
    // const isAuthenticated = props.user.isAuthenticated;
    // if (isAuthenticated) {
    //   props.history.push("/");
    // }
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
              Password successfully changed. Please login now. If you still having problems, please contact us
            </Alert>
          </Snackbar>
          <div className="col-md-7 mt-5 pt-3">
            <div className="box_Card">
              <Formik
                initialValues={{
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                enableReinitialize={true}
                validationSchema={validation_Schema}
                onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
                  requestResetPassword({values, setErrors, setSubmitting, resetForm});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <BootstrapForm.Group>
                      <BootstrapForm.Label>New Password :</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="password"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                      />
                      {errors.newPassword && touched.newPassword ? (
                        <BootstrapForm.Text className="text-danger">{errors.newPassword}</BootstrapForm.Text>
                      ) : null}
                    </BootstrapForm.Group>

                    <BootstrapForm.Group>
                      <BootstrapForm.Label>Confirm New Password :</BootstrapForm.Label>
                      <BootstrapForm.Control
                        type="password"
                        name="confirmNewPassword"
                        value={values.confirmNewPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmNewPassword && touched.confirmNewPassword ? (
                        <BootstrapForm.Text className="text-danger">{errors.confirmNewPassword}</BootstrapForm.Text>
                      ) : null}
                    </BootstrapForm.Group>

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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordByToken);
