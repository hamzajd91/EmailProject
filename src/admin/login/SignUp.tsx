import React from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import { AuthState } from '../../store/ducks/auth/types';
import { signUpUser } from '../../store/ducks/auth/actions';
import { ApplicationState } from '../../store';

const SignUp = (props: any) => {
  const history = useNavigate();

  return (
    <Formik // validation
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        deviceId: "1231321231",
        deviceToken: "deviceToken",
        agreement: true,
        deviceType: "deviceType",
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={values => {
        props.signUpUserCall(values);
      }}
    >
      {({values, errors, status, touched, handleSubmit}) => (
        <div>
          <div className="container">
            <div className="row justify-content-center align-items-center py-4">
              <div className="col-md-7 mt-3">
                <div className="p-4 rounded-lg bg-primary text-white font-medium-3">
                  <FontAwesomeIcon icon={faUnlock} className="mr-2" />
                  Sign Up
                </div>
              </div>
              <div className="col-md-7 mt-5">
                <div className="shadow bg-white rounded rounded-2 p-5 px-3 pb-3 position-relative">
                  <button
                    type="button"
                    className="py-2 px-4 btn btn-primary waves-effect waves-light d-flex align-items-center position-absolute link-btn"
                  >
                    <FontAwesomeIcon icon={faUnlock} className="mr-2" />
                    Sign Up with Linkedin
                  </button>

                  <Form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className={`p-4 mt-3 form-control${errors.firstName && touched.firstName ? " is-invalid" : ""}`}
                      />
                      <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                      <Field
                        placeholder="Last Name"
                        name="lastName"
                        type="text"
                        className={`p-4 mt-3 form-control${errors.lastName && touched.lastName ? " is-invalid" : ""}`}
                      />
                      <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                      <Field
                        placeholder="Email"
                        name="email"
                        type="text"
                        className={`p-4 mt-3 form-control${errors.email && touched.email ? " is-invalid" : ""}`}
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                      <Field
                        placeholder="Password"
                        name="password"
                        type="password"
                        className={`p-4 mt-3 form-control${errors.password && touched.password ? " is-invalid" : ""}`}
                      />
                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                      <Field
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        className={`p-4 mt-3 form-control${
                          errors.confirmPassword && touched.confirmPassword ? " is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                    </div>

                    <div className="custom-control custom-checkbox mt-3">
                      <input type="checkbox" className="custom-control-input" name="customCheck" id="customCheck1" />
                      <label className="custom-control-label font-size-base mt-2" htmlFor="customCheck1">
                        I agree to the
                        <Link to="/admin/terms" className="text-primary">
                          {" Terms of Use "}
                        </Link>
                        and
                        <Link to="/admin/privacy-policy" className="text-primary">
                          {" Privacy Policy "}
                        </Link>
                      </label>
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary waves-effect waves-light d-block mx-auto mt-4 py-2 px-4"
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signUpUserCall: (params: any) => dispatch(signUpUser(params)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.auth.getUser;

 

  return {
    getUserDetail: state.auth.getUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
