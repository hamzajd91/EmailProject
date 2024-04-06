import React, { useEffect } from 'react';
import {Dispatch} from "redux";
import {connect} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import {ErrorMessage, Field, Formik} from "formik";
import * as Yup from "yup";
import {Form} from "react-bootstrap";
import { signInUser } from '../../store/ducks/auth/actions';
import { AuthState } from '../../store/ducks/auth/types';
import { ApplicationState } from '../../store';
import { TOKEN, USER_DATA } from '../../utils/ConstantsFile';

const SignIn = (props: any) => {
  const history = useNavigate();
//   console.log('-------props------', props.location.search);
  // history.replace('/firms');

  // function signInWithLinkedin() {
  //   window.location.href =
  //     "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=78iwkx1rgdfoan&scope=r_liteprofile,r_emailaddress&state=none&redirect_uri=http://localhost:2020/auth/linkedin/callback";
  // }

  function signInWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_LINKED_IN_CLIENT_ID}&scope=r_liteprofile,r_emailaddress&state=none&redirect_uri=${process.env.REACT_APP_LINKED_IN_REDIRECT_URI}`;
  }

  // useEffect(() => {
  //   const response = {"id":288,"firstName":"Rahul","lastName":"M","email":"rahul@hindsyght.com","company":"MicraSol LLP","picture":"https://s3.amazonaws.com/s3qa.hindsyght.com/profilePictures/288.jpg","title":"Selling","industry":"Industry","headline":"Test","location":null,"verified":true,"metadata":{},"otherInfo":null,"createdAt":"2020-07-04T06:51:31.524Z","updatedAt":"2022-02-01T05:54:45.361Z","lock":false,"reviewId":null,"isAnonymousVerified":true,"deviceId":"1231321231","deviceToken":"deviceToken","deviceType":"deviceType","jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg4LCJmaXJzdE5hbWUiOiJSYWh1bCIsImxhc3ROYW1lIjoiTSIsImVtYWlsIjoicmFodWxAaGluZHN5Z2h0LmNvbSIsImlhdCI6MTY0NDM4MDE2OCwiYXVkIjoiY2FsbHVwby1hcHAiLCJpc3MiOiJjYWxsdXBvIn0.5Xe6u3AIEvewpwc6k0bEiorBp19tFv2-aKNfoODr2ec"}
  //  
  //   localStorage.setItem(USER_DATA, JSON.stringify(response)); 
  // }, []);

  return (
    <Formik // validation
      initialValues={{
        email: "",
        password: "",
        deviceId: "1231321231",
        deviceToken: "deviceToken",
        agreement: true,
        deviceType: "deviceType",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      })}
      onSubmit={values => {
        props.signInUserCall(values, history);
      }}
    >
      {({values, errors, status, touched, handleSubmit}) => (
        <div>
          <div className="container">
            <div className="row justify-content-center align-items-center py-4">
              <div className="col-md-7 mt-3">
                <div className="p-4 rounded-lg bg-primary text-white font-medium-3">
                  <FontAwesomeIcon icon={faUnlock} className="mr-2" />
                  Sign In
                </div>
              </div>
              <div className="col-md-7 mt-5">
                <div className="shadow bg-white rounded rounded-2 p-5 px-3 pb-3 position-relative">
                  <button
                    type="button"
                    className="py-2 px-4 btn btn-primary waves-effect waves-light d-flex align-items-center position-absolute link-btn"
                    onClick={signInWithLinkedin}
                  >
                    <FontAwesomeIcon icon={faUnlock} className="mr-2" />
                    Sign In with Linkedin
                  </button>

                  <Form onSubmit={handleSubmit}>
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

                    <Link to="/admin/reset-pwd" className="text-primary text-right d-block mt-2">
                      Forgot Password?
                    </Link>
                    <p className="mt-3">
                      Don't you have an account?
                      <Link to="/admin/signup" className="text-primary">
                        {" click here "}
                      </Link>
                      to create an account.
                    </p>

                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary waves-effect waves-light d-block mx-auto mt-4 py-2 px-4"
                      >
                        Sign In
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
  signInUserCall: (params: any, history : any) => dispatch(signInUser(params, history)),
});

const mapStateToProps = (state: ApplicationState) => {
  const data = state.auth.getLoginUser;




  return {
    getUserDetail: state.auth.getLoginUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
