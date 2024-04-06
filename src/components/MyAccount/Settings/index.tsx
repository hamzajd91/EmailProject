import React, {Component} from "react";
import "./index.scss";
import * as Yup from "yup";
import {Formik} from "formik";
import change_password from "../../../images/account/md/password.png";
import appApi from "../../../services/appApi";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Helmet} from "react-helmet";
const userResponces: any = require("../../../lang/i18n/en/common.json");

const validation_Schema = Yup.object().shape({
  oldPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  reenterPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "The password confirmation does not match.")
    .required("Confirm Password is required."),
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {}

interface State {
  open: boolean;
  showPassword: boolean;
  showNewPassword: boolean;
  showConfitmPassword: boolean;
}

class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      showPassword: false,
      showNewPassword: false,
      showConfitmPassword: false,
    };
  }

  changePassword = async (e: any) => {
    const {values, setErrors, setSubmitting, resetForm} = e;
    try {
      await appApi.put("/users/resetPassword", values);
      this.setState({
        open: true,
      });
      resetForm();
    } catch (error) {
      switch (error.response.status) {
        case 400:
          setErrors({
            newPassword: userResponces.signup.passwordRequirements,
          });
          break;
        case 401:
          setErrors({
            oldPassword: "Incorrect Password",
          });
          break;
        default:
          setErrors({
            reenterPassword: "Somethig went wrong.",
          });
          break;
      }
    } finally {
      setSubmitting(false);
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const {showPassword, showNewPassword, showConfitmPassword} = this.state;
    return (
      <>
        <Helmet>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <title>Settings</title>
          <meta name="title" content={`Settings`} />
        </Helmet>
        <div className="pt-5">
          <div className="password_header">
            <div>
              <img src={change_password} />
            </div>
            <div className="password_label">
              <h3 className="mb-0">Change Password</h3>
            </div>
          </div>
        </div>
        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert severity="success">Your password has been changed successfully.</Alert>
        </Snackbar>
        <div className="password_form">
        <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              reenterPassword: "",
            }}
            enableReinitialize={true}
            validationSchema={validation_Schema}
            onSubmit={(values: any, {setErrors, setSubmitting, resetForm}) => {
              this.changePassword({values, setErrors, setSubmitting, resetForm});
            }}
          >
            {({values, errors, touched, handleSubmit, setFieldValue, handleChange, isSubmitting}) => (
              <form onSubmit={handleSubmit}>
                <FormControl className="w-100" variant="outlined">
                  <InputLabel error={errors.oldPassword && touched.oldPassword ? true : false}>
                    Current Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    value={values.oldPassword}
                    name="oldPassword"
                    label="Current Password"
                    className="w-100"
                    error={errors.oldPassword && touched.oldPassword ? true : false}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            this.setState({
                              showPassword: !showPassword,
                            })
                          }
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  {errors.oldPassword && touched.oldPassword ? (
                    <FormHelperText error={errors.oldPassword && touched.oldPassword ? true : false}>
                      {errors.oldPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl className="w-100 mt-4" variant="outlined">
                  <InputLabel error={errors.newPassword && touched.newPassword ? true : false}>New Password</InputLabel>
                  <OutlinedInput
                    type={showNewPassword ? "text" : "password"}
                    value={values.newPassword}
                    name="newPassword"
                    label="New Password"
                    className="w-100"
                    error={errors.newPassword && touched.newPassword ? true : false}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            this.setState({
                              showNewPassword: !showNewPassword,
                            })
                          }
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  {errors.newPassword && touched.newPassword ? (
                    <FormHelperText error={errors.newPassword && touched.newPassword ? true : false}>
                      {errors.newPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl className="w-100 mt-4" variant="outlined">
                  <InputLabel error={errors.reenterPassword && touched.reenterPassword ? true : false}>
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    type={showConfitmPassword ? "text" : "password"}
                    value={values.reenterPassword}
                    name="reenterPassword"
                    label="Confirm Password"
                    className="w-100"
                    error={errors.reenterPassword && touched.reenterPassword ? true : false}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            this.setState({
                              showConfitmPassword: !showConfitmPassword,
                            })
                          }
                          edge="end"
                        >
                          {showConfitmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  {errors.reenterPassword && touched.reenterPassword ? (
                    <FormHelperText error={errors.reenterPassword && touched.reenterPassword ? true : false}>
                      {errors.reenterPassword}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    Change Password
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </>
    );
  }
}
export default Settings;
