import React, {useEffect, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Button} from "react-bootstrap";
import login_image from "../../images/login/login.png";
import {ApplicationState} from "../../store";
import {authRegister} from "../../store/ducks/register/actions";
import "./index.scss";
import {Link} from "react-router-dom";
import linkedin from "../../images/linkedin.png";

import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// Validation schema
const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required("Email is required."),
  lastName: Yup.string().required("Email is required."),
  email: Yup.string()
    .email("Enter valida email address.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "The password confirmation does not match.")
    .required("Confirm Password is required."),
  agreement: Yup.bool().oneOf([true], "Agreement required to create an account."),
});

type Props = any;
function SignUp(props: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    const isAuthenticated = props.user.isAuthenticated;
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, []);
  function signInWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKED_IN_CLIENT_ID}&scope=r_liteprofile,r_emailaddress&state=none&redirect_uri=${process.env.REACT_APP_LINKED_IN_REDIRECT_URI}`;
  }
  return (
    <section className="login_Section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="page_custom_title">
              <div className="img-wrapper">
                <img src={login_image} />
              </div>
              <h1>Sign Up</h1>
            </div>
          </div>

          <div className="col-md-7 mt-5 pt-3">
            <div className="linked_in_btn">
              <button type="button" onClick={() => signInWithLinkedin()}>
                <img src={linkedin} /> Sign up with Linkedin
              </button>
            </div>
            <div className="box_Card">
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  agreement: false,
                }}
                enableReinitialize={true}
                validationSchema={LoginSchema}
                onSubmit={(values: any, {setErrors, setSubmitting}) => {
                  props.authRegister({values, setErrors, setSubmitting});
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <TextField
                      error={errors.firstName && touched.firstName ? true : false}
                      label="First Name"
                      variant="outlined"
                      className="w-100 mt-4"
                      name="firstName"
                      defaultValue={values.firstName}
                      helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                      onChange={handleChange}
                    />

                    <TextField
                      error={errors.lastName && touched.lastName ? true : false}
                      label="Last Name"
                      variant="outlined"
                      className="w-100 mt-4"
                      name="lastName"
                      defaultValue={values.lastName}
                      helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                      onChange={handleChange}
                    />

                    <TextField
                      error={errors.email && touched.email ? true : false}
                      label="Email"
                      variant="outlined"
                      className="w-100 mt-4"
                      name="email"
                      defaultValue={values.email}
                      helperText={errors.email && touched.email ? errors.email : null}
                      onChange={handleChange}
                    />

                    <FormControl className="w-100 mt-4" variant="outlined">
                      <InputLabel error={errors.password && touched.password ? true : false}>Password</InputLabel>
                      <OutlinedInput
                        type={showPassword ? "text" : "password"}
                        value={values.password}
                        name="password"
                        label="Password"
                        className="w-100"
                        error={errors.password && touched.password ? true : false}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      {errors.password && touched.password ? (
                        <FormHelperText error={errors.password && touched.password ? true : false}>
                          {errors.password}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControl className="w-100 mt-4 mb-3" variant="outlined">
                      <InputLabel error={errors.confirmPassword && touched.confirmPassword ? true : false}>
                        Confirm Password
                      </InputLabel>
                      <OutlinedInput
                        type={showConfirmPassword ? "text" : "password"}
                        value={values.confirmPassword}
                        name="confirmPassword"
                        label="Confirm Password"
                        className="w-100"
                        error={errors.confirmPassword && touched.confirmPassword ? true : false}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                              {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      {errors.password && touched.password ? (
                        <FormHelperText error={errors.password && touched.password ? true : false}>
                          {errors.password}
                        </FormHelperText>
                      ) : null}
                    </FormControl>

                    <FormControlLabel
                      control={
                        <Checkbox checked={values.agreement} onChange={handleChange} name="agreement" color="primary" />
                      }
                      label={
                        <span>
                          I agree to the <Link to={"/terms"}>Terms of Use </Link>
                          and
                          <Link to={"/privacyPolicy"}> Privacy Policy</Link>
                        </span>
                      }
                    />

                    {props.register.success == true ? (
                      <p className="text-success">
                        Email verification sent. If email not received check your spam folder and{" "}
                        <Link to="/verify/resend">Click here</Link> to resend
                      </p>
                    ) : (
                      <div className="text-center">
                        <Button className="authButton" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    )}
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
    user: state.user,
    register: state.register,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  authRegister: (params: any) => dispatch(authRegister(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
