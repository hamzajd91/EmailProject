import React, {useEffect, useState} from "react";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Formik} from "formik";
import {Form as BootstrapForm, Button} from "react-bootstrap";
import login_image from "../../images/login/login.png";
import {ApplicationState} from "../../store";
import {authLogin} from "../../store/ducks/login/actions";
import "./index.scss";
import TextField from "@material-ui/core/TextField";
import linkedin from "../../images/linkedin.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address.")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

function SignUp(props: any) {
  const {message, error} = props.login;
  const [showPassword, setShowPassword] = useState(false);

  function signInWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKED_IN_CLIENT_ID}&scope=r_liteprofile,r_emailaddress&state=none&redirect_uri=${process.env.REACT_APP_LINKED_IN_REDIRECT_URI}`;
  }

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
              <h1>Sign In</h1>
            </div>
          </div>

          <div className="col-md-7 mt-5 pt-3">
            <div className="linked_in_btn">
              <button type="button" onClick={() => signInWithLinkedin()}>
                <img src={linkedin} /> Sign in with Linkedin
              </button>
            </div>
            <div className="box_Card">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                enableReinitialize={true}
                validationSchema={LoginSchema}
                onSubmit={(values: any, {setErrors, setSubmitting}) => {
                  props.authLogin({
                    values,
                    meta: {setErrors, setSubmitting},
                  });
                }}
              >
                {({values, errors, touched, handleSubmit, handleChange, isSubmitting}) => (
                  <form onSubmit={handleSubmit} className="form_main">
                    <TextField
                      error={errors.email && touched.email ? true : false}
                      label="Email"
                      variant="outlined"
                      className="w-100 mb-4 mt-4"
                      name="email"
                      defaultValue={values.email}
                      helperText={errors.email && touched.email ? errors.email : null}
                      onChange={handleChange}
                    />

                    <FormControl className="w-100" variant="outlined">
                      <InputLabel
                        error={errors.password && touched.password ? true : false}
                        htmlFor="outlined-adornment-password"
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
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

                    {message && error ? (
                      <BootstrapForm.Text
                        className="text-danger"
                        dangerouslySetInnerHTML={{__html: message}}
                      ></BootstrapForm.Text>
                    ) : (
                      ""
                    )}

                    <div className="forgot_password_link">
                      <a href="/resetPassword">Forgot Password ?</a>
                    </div>

                    <p className="create_account_link">
                      Don't you have an account? <a href="/signup">click here</a> to create an account.
                    </p>
                    <div className="text-center">
                      <Button className="authButton" type="submit" disabled={isSubmitting}>
                        Sign In
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
